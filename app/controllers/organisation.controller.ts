/*
* Author: Akash Hirani
* Last Modified By: Akash Hirani
* Last Modified At: 29/10/2020
*/

import { Request, Response, NextFunction } from "express";
import { Organisation } from './../models/organisation.model';
import * as xeroController from '../controllers/xero.controller'
import organisationManager from './../db-manager/organisation.manager';
import organisationFeatureManager from './../db-manager/organisation_feature.manager';

/*
	Handles the options method(preflight) request which is made by the server
*/
export const optionsFeatures = (req:Request,res:Response) => {
  res.status(200).send('Ok');
}

/*
	Adds the features selected by an employer from the frontend
*/
export const addFeatures = async (req:Request, res:Response, next:NextFunction) => {
    const feature = req.body.feature.split(",");
    //console.log(feature);
		var featureIds = [];
		// loops over the feature array and stores the features with value TRUE in the request body
    for (var i = 0; i < feature.length; i++) {
        if(feature[i]=='true'){
            featureIds.push(i+1);
        }
    }
		req.body.featureIds = featureIds;
		//next() will call the getOrganisationId function
    next();
}


export const getOrganisationId = async(req:Request,res:Response,next:NextFunction) => {
    try{
			//console.log(req.body.currentOrganisation);
			//gets the organisation by it's name
      await organisationManager.getOrganisationByName(xeroController.organisation.org_name,(err,result) => {
				//if the organisation is found in the database, it's id will be stored in the request body
				if(result[0]){
					req.body.organisation_id = result[0].org_id;
					//next() will call the insertOrganisationFeature function after grabbing the organisation
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
			res.status(500).send("Something went wrong");
    }
  }

	/*
		Adds the non existing selected features to the database table
	*/
	export const insertOrganisationFeature = async(req : Request, res : Response, callback) => {
    try{
			//storing the selected features into a variable from the request body
			var featureIdsToAdd = req.body.featureIds;
			//looping over the selected features array and also checking if the feature selected already exists or not
			for (var i = 0; i < featureIdsToAdd.length; i++) {
					var ans = checkFeatureInsert(req.body.organisation_id,featureIdsToAdd[i]);
					//console.log(ans);
					if(!ans){
						res.status(500).send("Something went wrong");
					}
				}
			if(ans){
				res.status(200).send("Features Added");
			}
			else{
				res.status(500).send("Something went wrong");
			}
				
    }
    catch(err){
			console.log(err);
			res.status(500).send("Something went wrong");
    }
	}
	
	/*
		Checks whether the selected feature is already added to the org_feature table and
		 only adds the new selected features
	*/
	export const checkFeatureInsert = async(organisation_id,feature_to_add) => {
		try{
			//getOrganisationAndFeature will return result if the feature is already linked to the organisation
			await organisationFeatureManager.getOrganisationAndFeature(organisation_id,feature_to_add,async(err, result) => {
				console.log(result[0]);
				if(!result[0]){
					//if the organisation does not have the selected feature, then the new feature will be added to the org_feature table
					 await organisationFeatureManager.create(organisation_id,feature_to_add, (err, result) => {
						if(err){
							console.log(err);
							console.log("Something went wrong");
							return(false);
						}
						else{
							return(true);
						}
					});
				}
				else{
					//enableFeature will update the feature's status to TRUE(active) if the organisation have opted to use but later disabled
					await organisationFeatureManager.enableFeature(organisation_id, feature_to_add,async(err,result) => {
						if(err){
							console.log(err);
							console.log("Something went wrong");
							return(false);
						}
						else{
							return(true);
						}
					});
				}
			}); 
		}
		catch(err){
			console.log(err);
			return(false);
		}
	}