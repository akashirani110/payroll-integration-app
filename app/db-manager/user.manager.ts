/*
* Author: Akash Hirani
* Last Modified By: Akash Hirani
* Last Modified At: 29/10/2020
*/

import { EmployerUser, IUser } from './../models/user.model';
import { dbConnection } from './../configs/database';
import { postLogin } from '../controllers/user.controller';


export default {
    create: (employerUser: IUser, callback) => {
      let connection;
      dbConnection.getdbConnection().then(async function(c){
        connection = c;
       try {
        const result = await connection.query (
          `insert into employer_user(first_name, last_name, position, email, salt,hashed_password, created_at, updated_at) 
            values(?,?,?,?,?,?,?,?)`,
          [
            employerUser.firstName,
            employerUser.lastName,
            employerUser.position,
            employerUser.email,
            employerUser.salt,
            employerUser.hashedPassword,
            employerUser.createdAt,
            employerUser.updatedAt
          ]
        );
        //console.log("User inserted successfully");
        connection.end();
        return callback(null,result);
      }
      catch(err){
        callback(err);
      }
      });
 
  },
  getUserByID: (employer_user_id, callback) => {
    let connection;
    dbConnection.getdbConnection().then(function(c){
    connection = c;
    connection.query(
      `select * from employer_user where employer_id = ?`,
      [employer_user_id],
      (err, results) => {
        if (err) {
          callback(err)
        }
        const employerUser = results[0] && new EmployerUser(results[0]);
        connection.end();
        callback(null, employerUser)
      }
    );
    });
  },

  getUserByEmail: async (email, callback) => {
    let connection;
    dbConnection.getdbConnection().then(async function(c){
    connection = c;
    //console.log("Selecting user");
    try{
      const [rows]  = await connection.execute("SELECT * FROM employer_user where email = ?",[email]);
      connection.end();
      return callback(null,rows); 
      }
      catch(err){
        callback(err);
      }
    });
  },
  // getEmployeeNames: (email, callback) =>{
  //   return new Promise(function(resolve, reject){
  //     pool.query(
  //         "select * from users where email = ?", 
  //         [email],
  //         function(err, results, fields){                                                
  //           if (err) {
  //             reject(new Error("Error rows is undefined"));
  //           }
  //           const user = results[0] && new User(results[0])
  //           resolve(user);
  //         }
  //     )}
  // )},

  /*
    We might not want getUserByName because we are not asking the EMPLOYEE USER to enter his/her 
    EMPLOYER's NAME instead we will just ask them to enter the organisation name and later find 
    out which employer is linked to that organisation
  */

  getUserByName: (firstName, lastName, callback) =>{
    return new Promise(function(resolve, reject){
    let connection;
    dbConnection.getdbConnection().then(function(c){
    connection = c;
      connection.query(
          "select * from employer_user where first_name = ? and last_name = ?", 
          [firstName, lastName],
          function(err, results, fields){                                                
            if (err) {
              reject(new Error("Error rows is undefined"));
            }
            const user: EmployerUser = results[0] && new EmployerUser(results[0])
            connection.end();
            resolve(user);
          }
      );
    });
  });
  }
}