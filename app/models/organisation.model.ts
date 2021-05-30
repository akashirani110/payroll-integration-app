export interface IOrg{
    org_id?: string;
    org_name: string;
    tenant_id: string;
}

export class Organisation implements IOrg{
    org_id?: string;
    org_name: string;
    tenant_id: string;
    constructor(_fields: IOrg) {
        if (_fields) Object.assign(this, _fields);
    }
}