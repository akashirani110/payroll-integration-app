export interface PAlias {
  employee_id?: string;
  employee_hash_alias_id?: string;
  xero_employee_id: string;
  org_id: string;
  createAt?: Date;
  updatedAt?: Date;
}

export class Alias implements PAlias {
  employee_id?: string;
  employee_hash_alias_id?: string;
  xero_employee_id: string;
  org_id: string;
  createAt?: Date;
  updatedAt?: Date;
    constructor(_fields: PAlias) {
        if (_fields) Object.assign(this, _fields);
    }
}