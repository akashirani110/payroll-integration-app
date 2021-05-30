CREATE TABLE IF NOT EXISTS pineapple_payroll.employee_user(
    employee_id INT (20) UNSIGNED NOT NULL AUTO_INCREMENT,
    employee_hash_alias_id VARCHAR (255) NOT NULL,
    xero_employee_id VARCHAR (255) COLLATE utf8mb4_unicode_ci NOT NULL,
    org_id INT (20) UNSIGNED NOT NULL,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (org_id) REFERENCES pineapple_payroll.organisation (org_id) 
);