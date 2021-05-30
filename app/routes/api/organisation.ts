/*
* Author: Akash Hirani
* Last Modified By: Akash Hirani
* Last Modified At: 08/10/2020
*/
import express from 'express';
const router = express.Router();

import * as xeroController from '../../controllers/xero.controller';
import * as organisationController from '../../controllers/organisation.controller';
import auth from '../../configs/auth';

router.get('/', xeroController.getOrganisation);
router.options('/addfeatures',organisationController.optionsFeatures);
router.post('/addfeatures', organisationController.addFeatures, organisationController.getOrganisationId, organisationController.insertOrganisationFeature);
router.get('/org-data', xeroController.getOrganisationData);
export default router;