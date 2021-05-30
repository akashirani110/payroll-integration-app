CREATE TABLE IF NOT EXISTS pineapple_payroll.xero_tokenset (
  employer_user_id INT(20) UNSIGNED NOT NULL,
  id_token TEXT COLLATE utf8mb4_unicode_ci NOT NULL,
  access_token TEXT COLLATE utf8mb4_unicode_ci NOT NULL,
  token_type  VARCHAR(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  refresh_token VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  scope TEXT COLLATE utf8mb4_unicode_ci NOT NULL,
  session_state VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  expires_at INT(20) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (employer_user_id),
  FOREIGN KEY (employer_user_id) REFERENCES pineapple_payroll.employer_user(employer_user_id)
)