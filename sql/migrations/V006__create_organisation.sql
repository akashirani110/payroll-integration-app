CREATE TABLE IF NOT EXISTS pineapple_payroll.organisation (
    org_id INT (20) UNSIGNED NOT NULL AUTO_INCREMENT,
    org_name VARCHAR (50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    tenant_id VARCHAR (100) COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (org_id) 
);
