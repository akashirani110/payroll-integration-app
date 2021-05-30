CREATE TABLE IF NOT EXISTS pineapple_payroll.org_feature(
    org_id INT(20) UNSIGNED NOT NULL,
    feature_id INT(20) UNSIGNED NOT NULL,
    count_usage INT(30) UNSIGNED DEFAULT 0,
    status BOOLEAN DEFAULT TRUE,
    PRIMARY KEY(org_id, feature_id),
    FOREIGN KEY(org_id) REFERENCES pineapple_payroll.organisation(org_id),
    FOREIGN KEY(feature_id) REFERENCES pineapple_payroll.feature(feature_id)
);
