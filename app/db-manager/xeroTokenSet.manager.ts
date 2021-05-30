import { XeroTokenSet } from '../models/xeroTokenSet.model';
//import pool from '../configs/database';
import { dbConnection } from './../configs/database';
import { TokenSet } from 'openid-client';

export default {
  
  create: (token: TokenSet, callback) => {
  let connection;
  dbConnection.getdbConnection().then(async function(c){
  connection = c;
  try{  
  const result = await connection.query(
      `insert into xero_tokenset(employer_user_id, id_token, access_token, token_type, refresh_token, scope, session_state, expires_at) 
                values(?,?,?,?,?,?,?,?)`,
      [
        token.employer_user_id,
        token.id_token,
        token.access_token,
        token.token_type,
        token.refresh_token,
        token.scope,
        token.session_state,
        token.expires_at,
      ]
      );
      //console.log("Token inserted successfully");
      connection.end();
      return callback(null,result);
    } 
    catch(err){
      callback(err);
    }
  });
  },
  getTokenSetByUserId: async (id, callback) => {
    let connection;
    dbConnection.getdbConnection().then(async function(c){
    connection = c;
    //console.log("Selecting user");
    try{
      const [rows]  = await connection.execute("select * from xero_tokenset where employer_user_id = ? ORDER BY updated_at DESC LIMIT 1",[id]);
      connection.end();
      return callback(null,rows); 
      }
      catch(err){
        callback(err);
      }
    });
  },
  update: async (token: TokenSet, callback) => {
    let connection;
    dbConnection.getdbConnection().then(async function(c){
    connection = c;
    //console.log("Selecting user");
    try{
      const [rows]  = await connection.execute(`UPDATE xero_tokenset SET id_token = ?, access_token = ?, token_type = ?, refresh_token = ?, scope = ?, expires_at = ? WHERE employer_user_id = ? ORDER BY employer_user_id DESC
      LIMIT 1`,[
        token.id_token,
        token.access_token,
        token.token_type,
        token.refresh_token,
        token.scope,
        token.expires_at,
        token.employer_user_id
      ]);
      connection.end();
      return callback(null,rows); 
      }
      catch(err){
        callback(err);
      }
    });
  }
}