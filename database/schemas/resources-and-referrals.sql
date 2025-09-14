-- Resource Library and Referral Tracker Database Schema
-- For Great Beginnings Day Care Center
-- These features are behind feature flags and not publicly visible

-- ============================================
-- RESOURCE LIBRARY TABLES
-- ============================================

-- Resource categories
CREATE TABLE IF NOT EXISTS resource_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50), -- Lucide icon name
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Educational resources for parents
CREATE TABLE IF NOT EXISTS resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES resource_categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    content TEXT, -- Rich text content
    resource_type VARCHAR(50) CHECK (resource_type IN ('article', 'guide', 'checklist', 'video', 'download', 'link')),
    file_url TEXT, -- For downloadable resources
    external_url TEXT, -- For external links
    thumbnail_url TEXT,
    tags TEXT[], -- Array of tags for searching
    author VARCHAR(100),
    reading_time INTEGER, -- Estimated reading time in minutes
    view_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}', -- Additional flexible data
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- Track resource interactions
CREATE TABLE IF NOT EXISTS resource_interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
    user_email VARCHAR(255),
    interaction_type VARCHAR(50) CHECK (interaction_type IN ('view', 'download', 'share', 'bookmark')),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resource bookmarks for logged-in users
CREATE TABLE IF NOT EXISTS resource_bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
    user_id UUID, -- Will reference auth.users when authentication is implemented
    user_email VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(resource_id, user_email)
);

-- ============================================
-- REFERRAL TRACKER TABLES
-- ============================================

-- Referral sources
CREATE TABLE IF NOT EXISTS referral_sources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('parent', 'staff', 'community', 'online', 'event', 'other')),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Main referrals table
CREATE TABLE IF NOT EXISTS referrals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    referral_code VARCHAR(20) UNIQUE NOT NULL,

    -- Referrer information
    referrer_name VARCHAR(100) NOT NULL,
    referrer_email VARCHAR(255),
    referrer_phone VARCHAR(20),
    referrer_type VARCHAR(50) CHECK (referrer_type IN ('current_parent', 'past_parent', 'staff', 'community_member', 'other')),
    source_id UUID REFERENCES referral_sources(id),

    -- Referred family information
    referred_family_name VARCHAR(100),
    referred_parent_name VARCHAR(100),
    referred_email VARCHAR(255),
    referred_phone VARCHAR(20),
    referred_children_count INTEGER,
    referred_children_ages TEXT[], -- Array of age ranges

    -- Status tracking
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'touring', 'enrolled', 'declined', 'expired')),
    contact_date DATE,
    tour_date DATE,
    enrollment_date DATE,
    decline_reason TEXT,

    -- Incentive tracking
    incentive_eligible BOOLEAN DEFAULT false,
    incentive_type VARCHAR(50), -- e.g., 'discount', 'credit', 'gift'
    incentive_amount DECIMAL(10, 2),
    incentive_issued BOOLEAN DEFAULT false,
    incentive_issued_date DATE,

    -- Additional information
    notes TEXT,
    tags TEXT[],
    metadata JSONB DEFAULT '{}',

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '90 days')
);

-- Referral status history
CREATE TABLE IF NOT EXISTS referral_status_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    referral_id UUID REFERENCES referrals(id) ON DELETE CASCADE,
    old_status VARCHAR(50),
    new_status VARCHAR(50),
    changed_by VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referral communications log
CREATE TABLE IF NOT EXISTS referral_communications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    referral_id UUID REFERENCES referrals(id) ON DELETE CASCADE,
    communication_type VARCHAR(50) CHECK (communication_type IN ('email', 'phone', 'text', 'in_person', 'other')),
    direction VARCHAR(10) CHECK (direction IN ('inbound', 'outbound')),
    subject VARCHAR(255),
    content TEXT,
    staff_member VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referral metrics and analytics
CREATE TABLE IF NOT EXISTS referral_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    total_referrals INTEGER DEFAULT 0,
    successful_enrollments INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5, 2),
    average_days_to_enrollment DECIMAL(5, 1),
    top_referral_source VARCHAR(100),
    total_incentives_issued DECIMAL(10, 2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(period_start, period_end)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Resource indexes
CREATE INDEX idx_resources_category ON resources(category_id);
CREATE INDEX idx_resources_type ON resources(resource_type);
CREATE INDEX idx_resources_active ON resources(is_active);
CREATE INDEX idx_resources_featured ON resources(is_featured);
CREATE INDEX idx_resources_published ON resources(published_at);
CREATE INDEX idx_resources_tags ON resources USING GIN(tags);
CREATE INDEX idx_resource_interactions_resource ON resource_interactions(resource_id);
CREATE INDEX idx_resource_interactions_created ON resource_interactions(created_at);

-- Referral indexes
CREATE INDEX idx_referrals_code ON referrals(referral_code);
CREATE INDEX idx_referrals_status ON referrals(status);
CREATE INDEX idx_referrals_referrer_email ON referrals(referrer_email);
CREATE INDEX idx_referrals_referred_email ON referrals(referred_email);
CREATE INDEX idx_referrals_created ON referrals(created_at);
CREATE INDEX idx_referrals_expires ON referrals(expires_at);
CREATE INDEX idx_referral_history_referral ON referral_status_history(referral_id);
CREATE INDEX idx_referral_communications_referral ON referral_communications(referral_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_metrics ENABLE ROW LEVEL SECURITY;

-- Public read access to active resources
CREATE POLICY "Public can view active resources" ON resources
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active resource categories" ON resource_categories
    FOR SELECT USING (is_active = true);

-- Referral policies (restricted to authenticated admin users)
CREATE POLICY "Only admins can manage referrals" ON referrals
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can view referral history" ON referral_status_history
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can manage referral communications" ON referral_communications
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- TRIGGERS
-- ============================================

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_referrals_updated_at BEFORE UPDATE ON referrals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Track referral status changes
CREATE OR REPLACE FUNCTION track_referral_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO referral_status_history (referral_id, old_status, new_status)
        VALUES (NEW.id, OLD.status, NEW.status);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER track_referral_status AFTER UPDATE ON referrals
    FOR EACH ROW EXECUTE FUNCTION track_referral_status_change();

-- ============================================
-- SAMPLE DATA (for testing)
-- ============================================

-- Sample resource categories
INSERT INTO resource_categories (name, slug, description, icon, display_order) VALUES
    ('Parenting Tips', 'parenting-tips', 'Helpful advice for parents and caregivers', 'Heart', 1),
    ('Child Development', 'child-development', 'Understanding your child''s growth milestones', 'TrendingUp', 2),
    ('Activities & Crafts', 'activities-crafts', 'Fun activities to do with your children', 'Palette', 3),
    ('Health & Safety', 'health-safety', 'Keeping your children healthy and safe', 'Shield', 4),
    ('School Readiness', 'school-readiness', 'Preparing your child for school', 'GraduationCap', 5)
ON CONFLICT (slug) DO NOTHING;

-- Sample referral sources
INSERT INTO referral_sources (name, type, description) VALUES
    ('Current Parent Referral', 'parent', 'Referral from a current GBDC parent'),
    ('Community Event', 'event', 'Met at a community event or fair'),
    ('Google Search', 'online', 'Found us through Google'),
    ('Facebook', 'online', 'Found us on Facebook'),
    ('Word of Mouth', 'community', 'Heard about us from friends or neighbors')
ON CONFLICT DO NOTHING;