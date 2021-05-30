CREATE TABLE IF NOT EXISTS pineapple_payroll.employer_user_org(
    org_id INT(20) UNSIGNED NOT NULL,
    employer_user_id INT(20) UNSIGNED NOT NULL,
    PRIMARY KEY(org_id, employer_user_id),
    FOREIGN KEY(org_id) REFERENCES pineapple_payroll.organisation(org_id),
    FOREIGN KEY(employer_user_id) REFERENCES pineapple_payroll.employer_user(employer_user_id)
);