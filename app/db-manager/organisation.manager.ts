/*
* Author: Akash Hirani
* Last Modified By: Akash Hirani
* Last Modified At: 16/10/2020
*/
import { Organisation, IOrg } from './../models/organisation.model';
import { dbConnection } from './../configs/database';

export default {
	//inserts the new organisation in the database
	create: (organisation: Organisation, callback) => {
		let connection;
		dbConnection.getdbConnection().then(async function (c) {
			connection = c;
			try {
				const result = await connection.query(
					`insert into organisation(org_name, tenant_id) values(?,?)`,
					[
						organisation.org_name,
						organisation.tenant_id
					]

				);
				console.log("Organisation added successfully");
				connection.end();
				return callback(null, result);
			}
			catch (err) {
				callback(err);
			}
		});
	},

	//select query for fetching an organisation by name
	getOrganisationByName: (org_name, callback) => {
		let connection;
		dbConnection.getdbConnection().then(async function (c) {
			connection = c;
			try {
				const [rows] = await connection.query(
					`select * from organisation where org_name = ?`, [org_name]);
				connection.end();
				return callback(null, rows);
			}
			catch (err) {
				callback(err);
			}

		});
	},

	//select query for fetching an organisation by name
	//update.record.ts- getOrgId
	getOrganisationById: (org_id, callback) => {
		let connection;
		dbConnection.getdbConnection().then(async function (c) {
			connection = c;
			try {
				const [rows] = await connection.execute(
					`Select * from organisation where org_id = ?`, [org_id]);
				connection.end();
				return callback(null, rows);
			}
			catch (err) {
				callback(err);
			}

		});
	}
}