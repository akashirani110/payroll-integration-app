CREATE TABLE IF NOT EXISTS pineapple_payroll.feature
(
    feature_id INT (20) UNSIGNED NOT NULL AUTO_INCREMENT,
    feature_name VARCHAR (50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    feature_desc VARCHAR (100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (feature_id) 
);

INSERT INTO pineapple_payroll.feature (feature_id, feature_name, feature_desc) VALUES ('1', 'Update primary bank account', 'This feature lets you update your bank account details');
INSERT INTO pineapple_payroll.feature (feature_id, feature_name, feature_desc) VALUES ('2', 'Update payrun calendar', 'This feature lets you update your pay cycle');
INSERT INTO pineapple_payroll.feature (feature_id, feature_name, feature_desc) VALUES ('3', 'Add savings account', 'This feature lets you add a savings account in Xero');
INSERT INTO pineapple_payroll.feature (feature_id, feature_name, feature_desc) VALUES ('4', 'Update savings account', 'This feature lets you update your savings account');

