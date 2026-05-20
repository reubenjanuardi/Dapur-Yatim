-- Supabase Setup Script for LKSA Dapur Yatim
-- Copy and run this script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)

-- 1. Create Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    last_login_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. Create Donations Table
CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255) NOT NULL,
    donor_phone VARCHAR(50) NULL,
    amount INTEGER NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- 'bank_transfer', 'qris', etc.
    message TEXT NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL, -- 'pending', 'confirmed', 'rejected'
    confirmed_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create Indexes for Donations
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_donor_email ON donations(donor_email);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at);

-- 3. Create Activities Table
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    category VARCHAR(100) NULL, -- 'pendidikan', 'kesehatan', 'sosial', etc.
    activity_date DATE NULL,
    image_url VARCHAR(255) NULL,
    is_published BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create Indexes for Activities
CREATE INDEX IF NOT EXISTS idx_activities_category ON activities(category);
CREATE INDEX IF NOT EXISTS idx_activities_is_published ON activities(is_published);
CREATE INDEX IF NOT EXISTS idx_activities_activity_date ON activities(activity_date);

-- 4. Create Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create Indexes for Contacts
CREATE INDEX IF NOT EXISTS idx_contacts_is_read ON contacts(is_read);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);

-- 5. Create Financial Reports Table
CREATE TABLE IF NOT EXISTS financial_reports (
    id SERIAL PRIMARY KEY,
    report_year INTEGER NOT NULL,
    report_month INTEGER NOT NULL, -- 1-12
    total_income BIGINT DEFAULT 0 NOT NULL,
    total_expense BIGINT DEFAULT 0 NOT NULL,
    description TEXT NULL,
    is_published BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE (report_year, report_month)
);

-- Create Indexes for Financial Reports
CREATE INDEX IF NOT EXISTS idx_financial_reports_is_published ON financial_reports(is_published);

-- 6. Insert Default Admin User
-- Email: admin@dapuryatim.org
-- Password: admin123 (hashed using bcrypt strength 12: $2a$12$fTzIeE1kO2oHpyP7x9fPquN0GvC8bS5N2T9H9L2m9d/5z9z7n7CFe)
INSERT INTO admins (name, email, password_hash, role, is_active)
VALUES (
    'Admin Dapur Yatim', 
    'admin@dapuryatim.org', 
    '$2a$12$fTzIeE1kO2oHpyP7x9fPquN0GvC8bS5N2T9H9L2m9d/5z9z7n7CFe', 
    'admin', 
    TRUE
)
ON CONFLICT (email) DO NOTHING;
