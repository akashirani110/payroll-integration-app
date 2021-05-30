#
# Following the "Principle of least privilege" the user that the application uses to log into the
# DB should only have the permissions needed to meet the requirements of an application.
#
# Here we only allow basic CRUD operations to the app user.
#
# See https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html
# See https://en.wikipedia.org/wiki/Principle_of_least_privilege
#

CREATE SCHEMA IF NOT EXISTS pineapple_payroll;

GRANT CREATE TEMPORARY TABLES ON pineapple_payroll.* TO 'appuser';
GRANT DELETE ON pineapple_payroll.* TO 'appuser';
GRANT EXECUTE ON pineapple_payroll.* TO 'appuser';
GRANT INSERT ON pineapple_payroll.* TO 'appuser';
GRANT LOCK TABLES ON pineapple_payroll.* TO 'appuser';
GRANT SELECT ON pineapple_payroll.* TO 'appuser';
GRANT SHOW VIEW ON pineapple_payroll.* TO 'appuser';
GRANT UPDATE ON pineapple_payroll.* TO 'appuser';

FLUSH PRIVILEGES;
