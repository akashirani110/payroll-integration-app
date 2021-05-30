import { Alias, PAlias } from './../models/alias.model';
//import pool from '../configs/database';
import { dbConnection } from './../configs/database';

export default {
  create: (alias: Alias, callback) => {
    let connection;
    dbConnection.getdbConnection().then(async function(c){
      connection = c;
      try{
          const result = await connection.query (
            `insert into employee_user (employee_hash_alias_id, xero_employee_id, org_id) 
                  values(?,?,?)`,
            [
              alias.employee_hash_alias_id,
              alias.xero_employee_id,
              alias.org_id,
            ],
            
          );
          console.log("alias added successfully")
          connection.end();
          return callback(null,result);
      }
      catch(err){
        callback(err);
      }
    });
},
  getEmployeeByPineappleId: (id, callback) => {
    let connection;
    dbConnection.getdbConnection().then(function(c){
      connection = c;
      connection.query(
        `select * from pineapple_alias where pineapple_user_id = ? ORDER BY id DESC`,
        [id],
        (err, results) => {
          if (err) {
            callback(err)
          }
          const alias = results[0] && new Alias(results[0])
          connection.end();
          callback(null, alias)
        }
      );
    });
  },

  getEmployeeByHashAliasId: async (hashAliasId, callback) => {
    let connection;
    dbConnection.getdbConnection().then(async function(c){
    connection = c;
    //console.log("Selecting user");
    try{
      const [rows]  = await connection.execute(`select * from employee_user where employee_hash_alias_id = ?`,
      [hashAliasId]);
      connection.end();
      return callback(null,new Alias(rows[0])); 
      }
      catch(err){
        callback(err);
      }
    });
  },
  // getEmployeeByHashAliasId: (id) => {
  //   return new Promise(function (resolve, reject) {
  //     let connection;
  //     dbConnection.getdbConnection().then(function(c){
  //       connection = c;
  //       connection.query(
  //         `select * from pineapple_alias where hash_pineapple_user_id = ? ORDER BY id DESC`,
  //           [id],
  //           function (err, results, fields) {
  //               if (err) {
  //                   reject(new Error("Error rows is undefined"));
  //               }
  //               const alias = results[0] && new Alias(results[0])
  //               resolve(alias);
  //           }
  //       )
  //   });
  // })
  // },

  updateByEmpolyeeId: async (hashAliasId, empolyeeId, callback) => {
    let connection;
    dbConnection.getdbConnection().then(async function(c){
    connection = c;
    //console.log("Selecting user");
    try{
      const [rows]  = await connection.execute(`UPDATE employee_user set employee_hash_alias_id = ? where employee_id = ?`,
      [hashAliasId, empolyeeId]);
      connection.end();
      return callback(null,rows); 
      }
      catch(err){
        callback(err);
      }
    });
  },

  // updateByTableId: (hashAliasId, empolyeeId) => {
  //   return new Promise(function (resolve, reject) {
  //     let connection;
  //     dbConnection.getdbConnection().then(async function(c){
  //       connection = c;
  //       connection.query(
  //         `update employee_user set employee_hash_alias_id = ? where empolyee_id = ? ORDER BY empolyee_id DESC`,
  //           [hashAliasId, empolyeeId],
  //           function (err, results, fields) {
  //               if (err) {
  //                   reject(new Error("Error rows is undefined"));
  //               }
  //               const alias = results[0] && new Alias(results[0])
  //               resolve(alias);
  //           }
  //       )
  //     });
  // })
  // }
}