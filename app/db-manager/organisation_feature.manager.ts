/*
* Author: Akash Hirani
* Last Modified By: Akash Hirani
* Last Modified At: 16/10/2020
*/
import { dbConnection } from './../configs/database';

export default {
	/*
		Creates the organisation and feature id when an organisation selects new features
	*/
	create: (organisationId, featureId, callback) => {
		let connection;
		dbConnection.getdbConnection().then(async function (c) {
			connection = c;
			try {
				const result = await connection.query(
					`insert into org_feature(org_id, feature_id) values(?,?)`, [organisationId, featureId]);
				connection.end();
				return callback(null, result);
			}
			catch (err) {
				callback(err);
			}
		});
	},
	/*
		Selects organisation and feature id
	*/
	//Update.record.ts --- getRecords
	getOrganisationAndFeature: async (org_id, feature_id, callback) => {
		let connection;
		dbConnection.getdbConnection().then(async function (c) {
			connection = c;
			try {
				const [rows] = await connection.execute("SELECT * from org_feature where org_id=? AND feature_id=?", [org_id, feature_id])
				connection.end();
				return callback(null, rows)


			}
			catch (err) {
				callback(err)
			}
		})
	},

	/*
		Updates the status of the feature to TRUE for an organisation
	*/
	enableFeature: async (organisationId, featureId, callback) => {
		let connection;
		dbConnection.getdbConnection().then(async function (c) {
			connection = c;
			try {
				const result = await connection.execute("UPDATE `org_feature` set status = TRUE  where org_id = ? && feature_id = ?", [organisationId, featureId]);
				connection.end();
				return callback(null, result);
			}
			catch (err) {
				callback(err);
			}
		});
	},
	/*
		Updates the status of the feature to FALSE for an organisation
	*/
	disableFeature: async (organisationId, featureId, callback) => {
		let connection;
		dbConnection.getdbConnection().then(async function (c) {
			connection = c;
			try {
				const result = await connection.execute("UPDATE `org_feature` set status = FALSE  where org_id = ? && feature_id = ?", [organisationId, featureId]);
				connection.end();
				return callback(null, result);
			}
			catch (err) {
				callback(err);
			}
		});
	},
	updateUsage: (org_id, feature_id, count, callback) => {
		let connection;
		dbConnection.getdbConnection().then(async function (c) {
			connection = c
			try {
				const result = await connection.execute(
					`UPDATE org_feature SET count_usage=? where org_id=? && feature_id=?`,
					[count, org_id, feature_id]
				)
				connection.end();
				return callback(null, result)
			}
			catch (err) {
				callback(err)
			}
		})
	},
	
	//this function shouldn't be in this file and rather be in organisation manager 
	getOrgTenantId: (tenant_id, callback) => {
		let connection;
		dbConnection.getdbConnection().then(async function (c) {
			connection = c
			try {
				const [result] = await connection.execute(
					`Select * from organisation where tenant_id=?`, [tenant_id]
				)
				connection.end();
				return callback(null, result)
			}
			catch (err) {
				callback(err)

			}
		})
	},
	getData: (org_id, callback) => {
		let connection;
		dbConnection.getdbConnection().then(async function (c) {
			connection = c
			try {
				const [result] = await connection.execute(
					`Select * from org_feature where org_id=?`, [org_id]
				)
				connection.end();
				return callback(null, result)
			}
			catch (err) {
				callback(err)
			}

		})
	}
}