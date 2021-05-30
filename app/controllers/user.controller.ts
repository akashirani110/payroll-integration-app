/*
* Author: Akash Hirani
* Last Modified By: Akash Hirani
* Last Modified At: 29/10/2020
*/

import { EmployerUser } from './../models/user.model';
import { Request, Response, NextFunction } from "express";
import xero from '../configs/xeroClient'
import jwtDecode from 'jwt-decode';
import passport from 'passport';
import * as xeroController from '../controllers/xero.controller'
import xeroManager from "../db-manager/xeroTokenSet.manager";

import { TokenSet } from 'openid-client';
import { XeroAccessToken, XeroIdToken, } from 'xero-node';
import userManager from '../db-manager/user.manager';
import organisationManager from '../db-manager/organisation.manager';
import xeroTokenSetManager from '../db-manager/xeroTokenSet.manager';
import employerUserOrgManager from '../db-manager/employerUser_org.manager';
import { request } from 'http';
import { body, Result } from 'express-validator';
import { nextTick } from 'process';
import { XeroTokenSet } from '../models/xeroTokenSet.model';

/**
 * Create User
 * @route POST /api/user
 */

var signupTokenSet : TokenSet;
export const optionsSignup = (req:Request,res:Response) => {
  res.status(200).send('Ok');
}
//var employerUserId = 0;
//var organisationId = 0;
export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
		const tokenSet: TokenSet = await xero.readTokenSet();
		const employerUser = new EmployerUser({
      firstName: req.body.FirstName,
      lastName: req.body.LastName,
			position: req.body.Position,
			email: req.body.Email,
			password: req.body.Password,
			createdAt: new Date(),
			updatedAt: new Date(),
			tokenSet: tokenSet

    });

    employerUser.setPassword(req.body.Password);
    //console.log(employerUser);
    //console.log("adding current organisation");
    req.body.currentOrganisation = xeroController.organisation;
    req.body.newEmployerUser =  employerUser ;
    //console.log(req.body.newEmployerUser.email);
    next();
  }
  catch (err) {
		return res.status(500).send(err);
  }
}
/*
* If the user trying to sign up already exists or not needs to be checked and it is done by
* the function below. If the user exists, it will grab the employer_user_id and call the next function. 
* else it will store the employer_user_id but before that, it will call the next function to check if 
* the organisation exists or not
*/
export const checkUserExist = async(req:Request,res:Response,next:NextFunction) => {
  try{
    await userManager.getUserByEmail(req.body.Email,(err,result) => {
      if(result[0]){
        //console.log("here");
        //console.log(result);
        //stores the employer_user_id if found in the request body
        req.body.employer_user_id = result[0].employer_user_id;
        //console.log("user id changed");
        next()
      }
      else{
        req.body.employer_user_id = 0;
        //console.log("Employer id found 0");
        next()
      }
    });
  }
  catch(err){
    console.log(err);
  }
}
/*
* Checks if the organisation the user is trying to link with exists or not. If it does, it will
* grab the organisation id else it will set the organisation id to 0 and will call the next
* function
*/
export const checkOrganisationExist = async(req:Request,res:Response,next:NextFunction) => {
  try{
    //console.log(req.body.currentOrganisation);
    await organisationManager.getOrganisationByName(req.body.currentOrganisation.org_name,(err,result) => {
      if(result[0]){
        req.body.organisation_id = result[0].org_id;
        //console.log("org id changed");
        //console.log(req.body.organisation_id);
        next()
      }
      else{
        req.body.organisation_id = 0;
        next()
      }
    });
  }
  catch(err){
    console.log(err);
  }
}
/*
* Creates the employer user if the employer_user_id is 0 and stores the token set 
* of the particular user in the xero_tokenset table
*/

  export const createEmployerUser = async(req: Request, res: Response, next: NextFunction) => {
    //console.log("creating employer");
    //console.log(req.body.employer_user_id);
    if(req.body.employer_user_id == 0){
      try{
          await userManager.create(req.body.newEmployerUser, async(err, result) => {
            if(err){
                console.log(err);
              }
              else{
                 await userManager.getUserByEmail(req.body.newEmployerUser.email,(err, output) => {
                  //console.log(req.body.newEmployerUser.email);
                  //console.log(output);
                  if(output){
                    req.body.employer_user_id = output[0].employer_user_id;
                    req.body.newEmployerUser.tokenSet.employer_user_id = output[0].employer_user_id;
                    
                    try{
                      insertToken(req.body.newEmployerUser.tokenSet,(err,result) => {
                        if(err){
                          console.log(err);
                        }
                        else{
                          next()
                        }
                      });
                  }
                  catch(err){
                    console.log(err);
                  }
                  }
                  else{
                    console.log(err);
                  }
                });

              }
          });
      
        }
        catch(err){
          console.log(err);
        }
      }
      else{
        next()
      }
  }
  /*
  * If the organisation the user trying to link is new, the insertOrganisation function
  * is exectuted and stores the new organisation. The employer_user can be linked with multiple
  * organisations
  */
  export const insertNewOrganisation = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.organisation_id == 0){
      try{
        await organisationManager.create(req.body.currentOrganisation, async(err, result) => {
          if(result){
            try{
              await organisationManager.getOrganisationByName(req.body.currentOrganisation.org_name, async(err, output) => {
                if(output){
                  req.body.organisation_id = output[0].org_id;
                  //console.log(req.body.organisation_id);
                  //console.log(output[0]);
                  //console.log("2")
                  //console.log("New organisation added successfully");
                  next();
                }
                else{
                  console.log(err);
                  console.log("Cannot find such organisation")
                }
              })
            }
            catch(err){
              console.log(err);
            }
          }
            
        })
      }
      catch(err){
        console.log(err);
      }
    }
    else{
      next();
    }
  }

const insertToken = async(token  : TokenSet, callback) => {
  await xeroTokenSetManager.create(token, (err, result) => {
    if(err){
      console.log(err)
    }
    else{
      callback(null,result);
    }
  });
}

/*
* After the employer_user and organisation along with the tokenset are stored in the 
* database in their respective tables, the employer_user and the organisation ids need to be 
* linked together and is stored in the employer_user_org table in the database.
*/
export const insertEmployerOrganisation = async(req : Request, res : Response, callback) => {
  try{
  await employerUserOrgManager.getEmployerUserAndOrganisation(req.body.employer_user_id
    , req.body.organisation_id,async(err, result) => {
    //console.log("3");
    //console.log(result);
      if(result[0]){
        //console.log("User is already linked to the organisation");
        return res.status(200).json({message : "User is already linked to the organisation"});
      }
      else{
         await employerUserOrgManager.create(req.body.employer_user_id, req.body.organisation_id, (err, result) => {
          if(err){
            console.log(err);
            console.log("Something went wrong");
            return res.status(500).json({message : "Something went wrong"});
          }
          else{
            res.status(200).json({ user: req.body.FirstName, message : "User registered successfully" });
          }
        })
      }
    });
  }
  catch(err){
    console.log(err);
  }
}


/**
 * Login User
 * @route POST /api/user/login
 */
export const postLogin = async (req, res: Response, next: NextFunction) => {
  return passport.authenticate('local', (err, passportUser: EmployerUser, errInfo) => {
    if (err) {
      return next(err);
    }
    console.log(passportUser);
    if (passportUser) {
      const jwtToken = passportUser.generateJWT()
      res.cookie('token.uid', 'Token ' + jwtToken)
      return res.json({ success: true, 'token.uid': jwtToken });
    } else {
      return res.json(errInfo)
    }
  })(req, res, next);
}
/**
 * Connect Xero
 * @route GET /api/user/xero/connect
 */
export const connectXero = async (req: Request, res: Response) => {
  try {
    const consentUrl: string = await xero.buildConsentUrl();
    res.redirect(consentUrl);
  } catch (err) {
    console.log(err)
    res.send('Sorry, something went wrong');
  }
};

/**
 * Connect Xero
 * @route GET /callback (not working: "/api/user/xero/callback")
 */
export const getCallbackFromXero = async (req: Request, res: Response) => {
  try {
    const tokenSet: TokenSet = await xero.apiCallback(req.url);
    signupTokenSet = tokenSet;
    //console.log(signupTokenSet);
    await xero.updateTenants();

    const decodedIdToken: XeroIdToken = jwtDecode(tokenSet.id_token);
    const decodedAccessToken: XeroAccessToken = jwtDecode(tokenSet.access_token);

    req.session.decodedIdToken = decodedIdToken;
    req.session.decodedAccessToken = decodedAccessToken;
    req.session.tokenSet = tokenSet;
    req.session.allTenants = xero.tenants;
    req.session.activeTenant = xero.tenants[0];
    res.redirect('/api/organisation');

  } catch (err) {
    res.send(err);
  }
}

export const getAccessTokenByEmployerEmail = async (req, res: Response, email: string, callback?) => {
  try {
    var user = null
    userManager.getUserByEmail(email,
      (err, result) => {
        if (err) return res.json({ err });
        callback(result)
      })
  } catch (err) {
    res.send('Sorry, something went wrong');
  }
}