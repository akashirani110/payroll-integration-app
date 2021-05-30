import { dbConnection } from './../configs/database';

export default{
	create: (employerUserId, organisationId, callback) => {
		let connection;
    dbConnection.getdbConnection().then(async function(c){
			connection = c;
			try{
				const result = await connection.query (
					`insert into employer_user_org(employer_user_id, org_id) values(?,?)`,[ employerUserId, organisationId ] );
					connection.end();	
					return callback(null,result);
			}
			catch(err){
				callback(err);
			}
		});
	},
	getEmployerUserAndOrganisation: async (employerUserId,organisationId, callback) => {
		let connection;
		dbConnection.getdbConnection().then(async function(c){
			connection = c;
			//console.log("Selecting user");
			try{
				const [rows]  = await connection.execute("SELECT * FROM `employer_user_org` where employer_user_id = ? && org_id = ?",[employerUserId, organisationId]);
				connection.end();
				return callback(null,rows); 
				}
				catch(err){
					callback(err);
				}
		});
	},
	getEmployerUserByOrganisationId: async (organisationId, callback) => {
		let connection;
		dbConnection.getdbConnection().then(async function(c){
		connection = c;
		//console.log("Selecting user");
		try{
			const [rows]  = await connection.execute("SELECT * FROM `employer_user_org` where org_id = ?",[organisationId]);
			connection.end();
			return callback(null,rows); 
			}
			catch(err){
				callback(err);
			}
		});
	}

}