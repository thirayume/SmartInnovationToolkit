-- Create database
-- CREATE DATABASE IF NOT EXISTS kasira_sit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kasira_sit;

-- Users table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    title VARCHAR(20),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    admin_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP NULL,
    admin_verified_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email)
);

-- Roles table
CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);

-- User Roles table
CREATE TABLE user_roles (
    user_role_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    assigned_at TIMESTAMP NULL DEFAULT NULL,
    assigned_by_user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (assigned_by_user_id) REFERENCES users(user_id)
);

-- Verification Requests table
CREATE TABLE verification_requests (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    requested_at TIMESTAMP NULL DEFAULT NULL,
    verified_by_user_id INT,
    verified_at TIMESTAMP NULL,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (verified_by_user_id) REFERENCES users(user_id)
);

-- Password Resets table
CREATE TABLE password_resets (
    reset_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NULL DEFAULT NULL,
    used_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Verification Settings table
CREATE TABLE verification_settings (
    setting_id INT PRIMARY KEY AUTO_INCREMENT,
    email_verification_enabled BOOLEAN DEFAULT TRUE,
    admin_approval_enabled BOOLEAN DEFAULT TRUE,
    default_role VARCHAR(50) NOT NULL DEFAULT 'teacher',
    updated_at TIMESTAMP NULL DEFAULT NULL,
    updated_by_user_id INT,
    FOREIGN KEY (updated_by_user_id) REFERENCES users(user_id)
);

-- Settings table
CREATE TABLE settings (
    setting_id INT PRIMARY KEY AUTO_INCREMENT,
    key_name VARCHAR(100) NOT NULL UNIQUE,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    updated_by_user_id INT,
    FOREIGN KEY (updated_by_user_id) REFERENCES users(user_id)
);

-- Setting Audits table
CREATE TABLE setting_audits (
    audit_id INT PRIMARY KEY AUTO_INCREMENT,
    setting_id INT NOT NULL,
    old_value TEXT,
    new_value TEXT,
    changed_by_user_id INT NOT NULL,
    changed_at TIMESTAMP DEFAULT NULL,
    action ENUM('UPDATE', 'CREATE', 'DELETE') NOT NULL,
    FOREIGN KEY (setting_id) REFERENCES settings(setting_id),
    FOREIGN KEY (changed_by_user_id) REFERENCES users(user_id)
);

-- Insert default roles
INSERT INTO roles (name, description, is_default, is_active) VALUES
('super_admin', 'Super Administrator with full access', FALSE, TRUE),
('admin', 'Administrator', FALSE, TRUE),
('staff', 'Staff member', FALSE, TRUE),
('teacher', 'Teacher', TRUE, TRUE),
('student', 'Student', FALSE, TRUE);

-- Insert default verification settings
INSERT INTO verification_settings 
(email_verification_enabled, admin_approval_enabled, default_role) 
VALUES 
(TRUE, TRUE, 'teacher');

-- Insert default settings
INSERT INTO settings (key_name, value, description) VALUES
('site_name', 'Smart Innovation Toolkit', 'Name of the platform'),
('support_email', 'support@example.com', 'Support email address'),
('max_login_attempts', '5', 'Maximum login attempts before temporary lockout'),
('lockout_duration', '15', 'Lockout duration in minutes');

-- Create indexes for better performance
CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role_id);
CREATE INDEX idx_verification_requests_user ON verification_requests(user_id);
CREATE INDEX idx_password_resets_user ON password_resets(user_id);