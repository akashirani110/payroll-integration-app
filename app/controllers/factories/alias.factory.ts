import { Alias } from './../../models/alias.model';
export default {
  createNewAlias: function (employeeHashAliasId, xeroEmployeeId, orgID) {
    return new Alias({
      employee_hash_alias_id: employeeHashAliasId,
      xero_employee_id: xeroEmployeeId,
      org_id: orgID,
    })
  }
}