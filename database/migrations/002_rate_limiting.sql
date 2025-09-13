-- Rate Limiting for Contact Form Submissions
-- Using PostgreSQL 17 features for efficient rate limiting
-- Prevents spam and abuse while allowing legitimate inquiries

-- Create rate limiting table
CREATE TABLE IF NOT EXISTS contact_rate_limits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL, -- IP address or email
    attempt_count INTEGER DEFAULT 1,
    first_attempt_at TIMESTAMPTZ DEFAULT NOW(),
    last_attempt_at TIMESTAMPTZ DEFAULT NOW(),
    blocked_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_rate_limits_identifier ON contact_rate_limits(identifier);
CREATE INDEX idx_rate_limits_blocked_until ON contact_rate_limits(blocked_until);
CREATE INDEX idx_rate_limits_last_attempt ON contact_rate_limits(last_attempt_at);

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    child_name VARCHAR(255),
    child_age VARCHAR(50),
    preferred_contact_method VARCHAR(50) DEFAULT 'email',
    urgency VARCHAR(50) DEFAULT 'normal',
    ip_address INET,
    user_agent TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, read, replied, archived
    admin_notes TEXT,
    replied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for contact submissions
CREATE INDEX idx_contact_email ON contact_submissions(email);
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);

-- Function to check rate limit using PostgreSQL 17 features
CREATE OR REPLACE FUNCTION check_contact_rate_limit(
    p_identifier VARCHAR(255),
    p_max_attempts INTEGER DEFAULT 5,
    p_window_minutes INTEGER DEFAULT 60,
    p_block_minutes INTEGER DEFAULT 120
)
RETURNS TABLE (
    is_allowed BOOLEAN,
    remaining_attempts INTEGER,
    reset_at TIMESTAMPTZ,
    message TEXT
) 
LANGUAGE plpgsql
AS $$
DECLARE
    v_record RECORD;
    v_window_start TIMESTAMPTZ;
    v_now TIMESTAMPTZ := NOW();
BEGIN
    v_window_start := v_now - INTERVAL '1 minute' * p_window_minutes;
    
    -- Get or create rate limit record
    SELECT * INTO v_record
    FROM contact_rate_limits
    WHERE identifier = p_identifier
    FOR UPDATE;
    
    -- If no record exists, create one
    IF NOT FOUND THEN
        INSERT INTO contact_rate_limits (identifier)
        VALUES (p_identifier)
        RETURNING * INTO v_record;
        
        RETURN QUERY
        SELECT 
            TRUE AS is_allowed,
            p_max_attempts - 1 AS remaining_attempts,
            v_now + INTERVAL '1 minute' * p_window_minutes AS reset_at,
            'First submission recorded'::TEXT AS message;
        RETURN;
    END IF;
    
    -- Check if currently blocked
    IF v_record.blocked_until IS NOT NULL AND v_record.blocked_until > v_now THEN
        RETURN QUERY
        SELECT 
            FALSE AS is_allowed,
            0 AS remaining_attempts,
            v_record.blocked_until AS reset_at,
            FORMAT('Too many attempts. Please try again after %s', 
                   TO_CHAR(v_record.blocked_until, 'HH12:MI AM'))::TEXT AS message;
        RETURN;
    END IF;
    
    -- Reset counter if outside window
    IF v_record.first_attempt_at < v_window_start THEN
        UPDATE contact_rate_limits
        SET attempt_count = 1,
            first_attempt_at = v_now,
            last_attempt_at = v_now,
            blocked_until = NULL,
            updated_at = v_now
        WHERE id = v_record.id;
        
        RETURN QUERY
        SELECT 
            TRUE AS is_allowed,
            p_max_attempts - 1 AS remaining_attempts,
            v_now + INTERVAL '1 minute' * p_window_minutes AS reset_at,
            'Rate limit reset'::TEXT AS message;
        RETURN;
    END IF;
    
    -- Check if limit exceeded
    IF v_record.attempt_count >= p_max_attempts THEN
        -- Block the user
        UPDATE contact_rate_limits
        SET blocked_until = v_now + INTERVAL '1 minute' * p_block_minutes,
            last_attempt_at = v_now,
            updated_at = v_now
        WHERE id = v_record.id;
        
        RETURN QUERY
        SELECT 
            FALSE AS is_allowed,
            0 AS remaining_attempts,
            v_now + INTERVAL '1 minute' * p_block_minutes AS reset_at,
            FORMAT('Rate limit exceeded. Blocked for %s minutes', p_block_minutes)::TEXT AS message;
        RETURN;
    END IF;
    
    -- Increment counter and allow
    UPDATE contact_rate_limits
    SET attempt_count = attempt_count + 1,
        last_attempt_at = v_now,
        updated_at = v_now
    WHERE id = v_record.id;
    
    RETURN QUERY
    SELECT 
        TRUE AS is_allowed,
        p_max_attempts - (v_record.attempt_count + 1) AS remaining_attempts,
        v_record.first_attempt_at + INTERVAL '1 minute' * p_window_minutes AS reset_at,
        FORMAT('Submission allowed. %s attempts remaining', 
               p_max_attempts - (v_record.attempt_count + 1))::TEXT AS message;
END;
$$;

-- Function to save contact submission
CREATE OR REPLACE FUNCTION save_contact_submission(
    p_name VARCHAR(255),
    p_email VARCHAR(255),
    p_phone VARCHAR(50),
    p_subject VARCHAR(255),
    p_message TEXT,
    p_child_name VARCHAR(255) DEFAULT NULL,
    p_child_age VARCHAR(50) DEFAULT NULL,
    p_preferred_contact VARCHAR(50) DEFAULT 'email',
    p_urgency VARCHAR(50) DEFAULT 'normal',
    p_ip_address INET DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
)
RETURNS TABLE (
    success BOOLEAN,
    submission_id UUID,
    message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_submission_id UUID;
    v_rate_check RECORD;
BEGIN
    -- Check rate limit by email
    SELECT * INTO v_rate_check
    FROM check_contact_rate_limit(p_email, 5, 60, 120);
    
    IF NOT v_rate_check.is_allowed THEN
        RETURN QUERY
        SELECT 
            FALSE AS success,
            NULL::UUID AS submission_id,
            v_rate_check.message AS message;
        RETURN;
    END IF;
    
    -- Also check rate limit by IP if provided
    IF p_ip_address IS NOT NULL THEN
        SELECT * INTO v_rate_check
        FROM check_contact_rate_limit(p_ip_address::VARCHAR, 10, 60, 120);
        
        IF NOT v_rate_check.is_allowed THEN
            RETURN QUERY
            SELECT 
                FALSE AS success,
                NULL::UUID AS submission_id,
                'Too many submissions from this location. Please try again later.'::TEXT AS message;
            RETURN;
        END IF;
    END IF;
    
    -- Insert the submission
    INSERT INTO contact_submissions (
        name, email, phone, subject, message,
        child_name, child_age, preferred_contact_method,
        urgency, ip_address, user_agent
    ) VALUES (
        p_name, p_email, p_phone, p_subject, p_message,
        p_child_name, p_child_age, p_preferred_contact,
        p_urgency, p_ip_address, p_user_agent
    ) RETURNING id INTO v_submission_id;
    
    RETURN QUERY
    SELECT 
        TRUE AS success,
        v_submission_id AS submission_id,
        'Your message has been sent successfully! We will respond within 24-48 hours.'::TEXT AS message;
END;
$$;

-- Function to clean up old rate limit records (run periodically)
CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    v_deleted_count INTEGER;
BEGIN
    DELETE FROM contact_rate_limits
    WHERE last_attempt_at < NOW() - INTERVAL '7 days'
    AND (blocked_until IS NULL OR blocked_until < NOW());
    
    GET DIAGNOSTICS v_deleted_count = ROW_COUNT;
    RETURN v_deleted_count;
END;
$$;

-- Create a trigger to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rate_limits_updated_at
    BEFORE UPDATE ON contact_rate_limits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (adjust based on your user setup)
GRANT SELECT, INSERT, UPDATE ON contact_submissions TO authenticated;
GRANT SELECT, INSERT, UPDATE ON contact_rate_limits TO authenticated;
GRANT EXECUTE ON FUNCTION check_contact_rate_limit TO authenticated;
GRANT EXECUTE ON FUNCTION save_contact_submission TO authenticated;

-- Add comments for documentation
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from parents';
COMMENT ON TABLE contact_rate_limits IS 'Tracks rate limiting for contact form submissions';
COMMENT ON FUNCTION check_contact_rate_limit IS 'Checks if a contact form submission is allowed based on rate limits';
COMMENT ON FUNCTION save_contact_submission IS 'Saves a contact form submission with rate limiting';
COMMENT ON FUNCTION cleanup_old_rate_limits IS 'Removes old rate limit records to keep table size manageable';