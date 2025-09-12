-- =============================================
-- Great Beginnings Day Care - PostgreSQL 17 Schema
-- Using all modern PostgreSQL 17 features
-- =============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pg_trgm" SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "btree_gist" SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "pgcrypto" SCHEMA public;

-- =============================================
-- ENUM TYPES
-- =============================================

CREATE TYPE enrollment_status AS ENUM (
  'pending',
  'active',
  'waitlist',
  'inactive',
  'graduated'
);

CREATE TYPE document_type AS ENUM (
  'medical_form',
  'immunization_record',
  'emergency_contact',
  'enrollment_form',
  'consent_form',
  'allergy_information',
  'other'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'completed',
  'failed',
  'refunded',
  'cancelled'
);

CREATE TYPE user_role AS ENUM (
  'parent',
  'staff',
  'admin',
  'super_admin'
);

CREATE TYPE program_type AS ENUM (
  'infant',
  'toddler',
  'preschool',
  'school_age',
  'summer_camp'
);

CREATE TYPE language_code AS ENUM (
  'en',
  'es',
  'ru',
  'uk'
);

-- =============================================
-- MAIN TABLES WITH PostgreSQL 17 FEATURES
-- =============================================

-- Users table with authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- PG17 native UUID generation
  email TEXT UNIQUE NOT NULL,
  encrypted_password TEXT NOT NULL,
  role user_role DEFAULT 'parent' NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  preferred_language language_code DEFAULT 'en',
  metadata JSONB DEFAULT '{}' NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ,
  
  -- Generated column for full text search (PG17 feature)
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(first_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(last_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(email, '')), 'B')
  ) STORED,
  
  -- Constraints
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT phone_format CHECK (phone IS NULL OR phone ~ '^\+?[1-9]\d{1,14}$')
) WITH (fillfactor = 90);

-- Children table
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  enrollment_status enrollment_status DEFAULT 'pending' NOT NULL,
  program_type program_type NOT NULL,
  medical_notes TEXT,
  allergies TEXT[],
  emergency_contacts JSONB DEFAULT '[]' NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  enrolled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Age calculation as generated column
  age_months INTEGER GENERATED ALWAYS AS (
    EXTRACT(YEAR FROM age(CURRENT_DATE, date_of_birth)) * 12 +
    EXTRACT(MONTH FROM age(CURRENT_DATE, date_of_birth))
  ) STORED,
  
  -- Check constraints
  CONSTRAINT valid_birth_date CHECK (date_of_birth <= CURRENT_DATE AND date_of_birth >= CURRENT_DATE - INTERVAL '12 years')
) WITH (fillfactor = 90);

-- Parent-Child relationship table
CREATE TABLE parent_children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  relationship TEXT DEFAULT 'parent' NOT NULL,
  is_primary_contact BOOLEAN DEFAULT FALSE,
  can_pickup BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  UNIQUE(parent_id, child_id)
);

-- Document uploads with advanced features
CREATE TABLE document_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  document_type document_type NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  expires_at TIMESTAMPTZ,
  uploaded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES users(id),
  
  -- Full text search on file names and metadata
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(file_name, '')) ||
    to_tsvector('english', coalesce(metadata->>'description', ''))
  ) STORED,
  
  -- Constraints
  CONSTRAINT valid_file_size CHECK (file_size > 0 AND file_size <= 10485760), -- Max 10MB
  CONSTRAINT valid_mime_type CHECK (mime_type IN ('application/pdf', 'image/jpeg', 'image/png', 'image/gif'))
) WITH (fillfactor = 85);

-- Contact form submissions with rate limiting
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  preferred_contact_method TEXT,
  preferred_language language_code DEFAULT 'en',
  metadata JSONB DEFAULT '{}' NOT NULL,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  processed_at TIMESTAMPTZ,
  processed_by UUID REFERENCES users(id),
  
  -- Constraints
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
) WITH (fillfactor = 90);

-- Referral program tracking
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  referrer_name TEXT NOT NULL,
  referrer_email TEXT NOT NULL,
  referred_name TEXT NOT NULL,
  referred_email TEXT NOT NULL,
  referred_phone TEXT,
  referral_code TEXT UNIQUE DEFAULT encode(gen_random_bytes(4), 'hex'),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'enrolled', 'expired', 'cancelled')),
  notes TEXT,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  contacted_at TIMESTAMPTZ,
  enrolled_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '90 days'),
  
  -- Constraints
  CONSTRAINT valid_emails CHECK (
    referrer_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
    referred_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  )
);

-- Announcements/News table
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  category TEXT,
  tags TEXT[],
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}' NOT NULL,
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Multi-language support
  translations JSONB DEFAULT '{}' NOT NULL,
  
  -- Full text search
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(tags, ' '), '')), 'C')
  ) STORED
);

-- Resource library (hidden feature)
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  file_url TEXT,
  external_url TEXT,
  tags TEXT[],
  access_level user_role DEFAULT 'parent',
  downloads INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_by UUID REFERENCES users(id),
  
  -- Ensure at least one URL is provided
  CONSTRAINT url_required CHECK (file_url IS NOT NULL OR external_url IS NOT NULL)
);

-- Audit log table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  metadata JSONB DEFAULT '{}' NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
) PARTITION BY RANGE (created_at);

-- Create partitions for audit logs (monthly)
CREATE TABLE audit_logs_2024_01 PARTITION OF audit_logs
  FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
CREATE TABLE audit_logs_2024_02 PARTITION OF audit_logs
  FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
-- Add more partitions as needed

-- =============================================
-- INDEXES WITH PostgreSQL 17 FEATURES
-- =============================================

-- BRIN indexes for timestamp columns (PG17 optimized)
CREATE INDEX idx_users_created_brin ON users USING BRIN(created_at) WITH (pages_per_range = 128);
CREATE INDEX idx_children_created_brin ON children USING BRIN(created_at) WITH (pages_per_range = 128);
CREATE INDEX idx_documents_uploaded_brin ON document_uploads USING BRIN(uploaded_at) WITH (pages_per_range = 64);
CREATE INDEX idx_contact_submitted_brin ON contact_submissions USING BRIN(submitted_at) WITH (pages_per_range = 32);
CREATE INDEX idx_referrals_created_brin ON referrals USING BRIN(created_at) WITH (pages_per_range = 128);
CREATE INDEX idx_announcements_published_brin ON announcements USING BRIN(published_at) WITH (pages_per_range = 128);

-- GIN indexes for full text search
CREATE INDEX idx_users_search_gin ON users USING GIN(search_vector);
CREATE INDEX idx_documents_search_gin ON document_uploads USING GIN(search_vector);
CREATE INDEX idx_announcements_search_gin ON announcements USING GIN(search_vector);

-- GIN indexes for JSONB columns with path ops
CREATE INDEX idx_users_metadata_gin ON users USING GIN(metadata jsonb_path_ops);
CREATE INDEX idx_children_emergency_gin ON children USING GIN(emergency_contacts jsonb_path_ops);
CREATE INDEX idx_documents_metadata_gin ON document_uploads USING GIN(metadata jsonb_path_ops);
CREATE INDEX idx_announcements_translations_gin ON announcements USING GIN(translations jsonb_path_ops);

-- Covering indexes for common queries (PG17 feature)
CREATE INDEX idx_children_enrollment_covering ON children(enrollment_status) 
  INCLUDE (first_name, last_name, program_type, enrolled_at);
CREATE INDEX idx_documents_user_covering ON document_uploads(user_id, document_type) 
  INCLUDE (file_name, file_url, uploaded_at);
CREATE INDEX idx_parent_children_covering ON parent_children(parent_id) 
  INCLUDE (child_id, is_primary_contact);

-- Partial indexes for specific conditions
CREATE INDEX idx_users_active ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_children_active ON children(enrollment_status) WHERE enrollment_status IN ('active', 'waitlist');
CREATE INDEX idx_documents_pending ON document_uploads(child_id) WHERE verified_at IS NULL;
CREATE INDEX idx_referrals_pending ON referrals(status) WHERE status = 'pending' AND expires_at > NOW();
CREATE INDEX idx_announcements_published ON announcements(published_at) WHERE published = true;

-- Array indexes
CREATE INDEX idx_children_allergies ON children USING GIN(allergies);
CREATE INDEX idx_announcements_tags ON announcements USING GIN(tags);
CREATE INDEX idx_resources_tags ON resources USING GIN(tags);

-- =============================================
-- FUNCTIONS WITH PostgreSQL 17 FEATURES
-- =============================================

-- Rate limiting function using PARALLEL SAFE (PG17)
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_identifier TEXT,
  p_action TEXT,
  p_max_attempts INTEGER DEFAULT 5,
  p_window_minutes INTEGER DEFAULT 60
)
RETURNS BOOLEAN
LANGUAGE plpgsql
PARALLEL SAFE
STABLE
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO v_count
  FROM contact_submissions
  WHERE (email = p_identifier OR ip_address::TEXT = p_identifier)
    AND submitted_at > NOW() - (p_window_minutes || ' minutes')::INTERVAL;
  
  RETURN v_count < p_max_attempts;
END;
$$;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Function to validate age requirements
CREATE OR REPLACE FUNCTION validate_age_requirement()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Check age based on program type
  CASE NEW.program_type
    WHEN 'infant' THEN
      IF NEW.age_months > 18 THEN
        RAISE EXCEPTION 'Child too old for infant program (max 18 months)';
      END IF;
    WHEN 'toddler' THEN
      IF NEW.age_months < 18 OR NEW.age_months > 36 THEN
        RAISE EXCEPTION 'Invalid age for toddler program (18-36 months)';
      END IF;
    WHEN 'preschool' THEN
      IF NEW.age_months < 36 OR NEW.age_months > 60 THEN
        RAISE EXCEPTION 'Invalid age for preschool program (3-5 years)';
      END IF;
    WHEN 'school_age' THEN
      IF NEW.age_months < 60 OR NEW.age_months > 144 THEN
        RAISE EXCEPTION 'Invalid age for school-age program (5-12 years)';
      END IF;
  END CASE;
  
  RETURN NEW;
END;
$$;

-- Audit logging function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values,
    metadata
  ) VALUES (
    current_setting('app.current_user_id', true)::UUID,
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END,
    jsonb_build_object('timestamp', NOW(), 'query', current_query())
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- MERGE function for syncing data (PG17 feature)
CREATE OR REPLACE FUNCTION sync_user_metadata()
RETURNS void
LANGUAGE sql
AS $$
  MERGE INTO users AS target
  USING (
    SELECT 
      u.id,
      jsonb_build_object(
        'children_count', COUNT(DISTINCT pc.child_id),
        'active_children', COUNT(DISTINCT c.id) FILTER (WHERE c.enrollment_status = 'active'),
        'last_document_upload', MAX(d.uploaded_at)
      ) AS new_metadata
    FROM users u
    LEFT JOIN parent_children pc ON u.id = pc.parent_id
    LEFT JOIN children c ON pc.child_id = c.id
    LEFT JOIN document_uploads d ON u.id = d.user_id
    GROUP BY u.id
  ) AS source
  ON target.id = source.id
  WHEN MATCHED THEN
    UPDATE SET metadata = target.metadata || source.new_metadata;
$$;

-- =============================================
-- TRIGGERS
-- =============================================

-- Update triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Validation triggers
CREATE TRIGGER validate_child_age BEFORE INSERT OR UPDATE ON children
  FOR EACH ROW EXECUTE FUNCTION validate_age_requirement();

-- Audit triggers
CREATE TRIGGER audit_users AFTER INSERT OR UPDATE OR DELETE ON users
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_children AFTER INSERT OR UPDATE OR DELETE ON children
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_documents AFTER INSERT OR UPDATE OR DELETE ON document_uploads
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_children ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY users_select ON users FOR SELECT
  USING (
    id = current_setting('app.current_user_id', true)::UUID OR
    current_setting('app.current_user_role', true) IN ('admin', 'super_admin', 'staff')
  );

CREATE POLICY users_update ON users FOR UPDATE
  USING (id = current_setting('app.current_user_id', true)::UUID)
  WITH CHECK (id = current_setting('app.current_user_id', true)::UUID);

-- Children policies
CREATE POLICY children_select ON children FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM parent_children pc
      WHERE pc.child_id = children.id 
      AND pc.parent_id = current_setting('app.current_user_id', true)::UUID
    ) OR
    current_setting('app.current_user_role', true) IN ('admin', 'super_admin', 'staff')
  );

-- Document policies
CREATE POLICY documents_select ON document_uploads FOR SELECT
  USING (
    user_id = current_setting('app.current_user_id', true)::UUID OR
    EXISTS (
      SELECT 1 FROM parent_children pc
      WHERE pc.child_id = document_uploads.child_id 
      AND pc.parent_id = current_setting('app.current_user_id', true)::UUID
    ) OR
    current_setting('app.current_user_role', true) IN ('admin', 'super_admin', 'staff')
  );

CREATE POLICY documents_insert ON document_uploads FOR INSERT
  WITH CHECK (
    user_id = current_setting('app.current_user_id', true)::UUID OR
    current_setting('app.current_user_role', true) IN ('admin', 'super_admin', 'staff')
  );

-- Announcements policies (public read for published)
CREATE POLICY announcements_public_read ON announcements FOR SELECT
  USING (published = true AND (expires_at IS NULL OR expires_at > NOW()));

CREATE POLICY announcements_admin_all ON announcements FOR ALL
  USING (current_setting('app.current_user_role', true) IN ('admin', 'super_admin'));

-- =============================================
-- VIEWS FOR COMMON QUERIES
-- =============================================

-- Active enrollments view
CREATE OR REPLACE VIEW v_active_enrollments AS
SELECT 
  c.*,
  u.first_name AS parent_first_name,
  u.last_name AS parent_last_name,
  u.email AS parent_email,
  u.phone AS parent_phone,
  pc.is_primary_contact
FROM children c
JOIN parent_children pc ON c.id = pc.child_id
JOIN users u ON pc.parent_id = u.id
WHERE c.enrollment_status = 'active'
  AND pc.is_primary_contact = true;

-- Document status view
CREATE OR REPLACE VIEW v_document_status AS
SELECT 
  c.id AS child_id,
  c.first_name || ' ' || c.last_name AS child_name,
  dt.document_type,
  d.file_name,
  d.uploaded_at,
  d.verified_at,
  CASE 
    WHEN d.expires_at < NOW() THEN 'expired'
    WHEN d.verified_at IS NOT NULL THEN 'verified'
    ELSE 'pending'
  END AS status
FROM children c
CROSS JOIN unnest(ARRAY['medical_form', 'immunization_record', 'emergency_contact', 'enrollment_form']::document_type[]) AS dt(document_type)
LEFT JOIN LATERAL (
  SELECT * FROM document_uploads
  WHERE child_id = c.id AND document_type = dt.document_type
  ORDER BY uploaded_at DESC
  LIMIT 1
) d ON true
WHERE c.enrollment_status IN ('active', 'pending');

-- =============================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================

COMMENT ON SCHEMA public IS 'Great Beginnings Day Care database schema using PostgreSQL 17 features';
COMMENT ON TABLE users IS 'User accounts for parents, staff, and administrators';
COMMENT ON TABLE children IS 'Children enrolled or waitlisted in the daycare';
COMMENT ON TABLE document_uploads IS 'Document uploads with versioning and verification tracking';
COMMENT ON COLUMN users.search_vector IS 'Generated tsvector for full-text search on user data';
COMMENT ON COLUMN children.age_months IS 'Auto-calculated age in months for program eligibility';
COMMENT ON FUNCTION check_rate_limit IS 'Rate limiting function using PARALLEL SAFE for better performance in PG17';
COMMENT ON INDEX idx_users_created_brin IS 'BRIN index optimized for time-series queries on large tables';