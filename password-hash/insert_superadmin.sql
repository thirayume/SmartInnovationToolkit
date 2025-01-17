USE kasira_sit;

-- Insert super admin user
INSERT INTO users (
    email,
    password,
    title,
    first_name,
    last_name,
    phone,
    email_verified,
    admin_verified,
    email_verified_at,
    admin_verified_at,
    created_at,
    updated_at,
    is_active
) VALUES (
    'admin@sit.com',
    '$2b$10$B7ZFHyWsXerYhQFD33Bvg.sdm8qsRWMOsiqfe3fC.wBH9PmvfYaD2',
    'Mr.',
    'Super',
    'Admin',
    '0812345678',
    TRUE,
    TRUE,
    NOW(),
    NOW(),
    NOW(),
    NOW(),
    TRUE
);

-- Get the inserted user's ID
SET @admin_id = LAST_INSERT_ID();

-- Insert super_admin role assignment
INSERT INTO user_roles (
    user_id,
    role_id,
    assigned_at
)
SELECT 
    @admin_id,
    role_id,
    NOW()
FROM roles 
WHERE name = 'super_admin';