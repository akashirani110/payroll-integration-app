import { XeroSession } from './../models/xeroSession.model';
import { Request, Response, NextFunction } from "express";
import xero from '../configs/xeroClient'
import jwtDecode from 'jwt-decode';
import { Organisation, IOrg } from './../models/organisation.model';
import { XeroTokenSet } from '../models/xeroTokenSet.model';
import xeroManager from '../db-manager/xeroTokenSet.manager';

import { TokenSet } from 'openid-client';
import { XeroAccessToken, XeroIdToken, XeroClient, Contacts, Phone, PaymentTermType, Employees } from 'xero-node';

var orgName;
var orgAbn;
export var organisation : Organisation;
/**
 * Organisation
 * @route GET /api/organisation
 */
export const getOrganisation = async (req, res: Response) => {
	try {
		//const xeroSession: XeroSession = req.xeroSession
		//const tokenSet: TokenSet = await xero.readTokenSet();

		const response: any = await xero.accountingApi.getOrganisations(req.session.activeTenant.tenantId);
		orgName = response.body.organisations[0].name;
		orgAbn = response.body.organisations[0].taxNumber;
		const tempOrganisation = new Organisation({
			org_name: orgName,
			tenant_id: req.session.activeTenant.tenantId

		});
		organisation = tempOrganisation;
		organisation.org_name = orgName;
		organisation.tenant_id = req.session.activeTenant.tenantId;
		res.redirect('http://localhost:3000/company-details');
	} catch (err) {
		console.log(err);
		res.send('Sorry, something went wrong');
	}
}; 
/**
 * Organisation
 * @route GET /api/organisation/org-data
 */
export const getOrganisationData = async (req, res: Response) => {
	
		try {
			res.send([{Organisation: orgName, Abn : orgAbn}]);
		} catch (err) {
			res.send('Sorry, something went wrong');
		}
};


