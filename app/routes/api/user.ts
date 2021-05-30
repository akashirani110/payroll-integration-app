/*
* Author: Maed
* Last Modified By: Akash Hirani
* Last Modified At: 07/10/2020
*/
import express from 'express';
const router = express.Router();

import * as userController from '../../controllers/user.controller'
import auth from '../../configs/auth';

router.post('/', userController.postSignup, userController.checkUserExist,userController.checkOrganisationExist,userController.createEmployerUser,userController.insertNewOrganisation, userController.insertEmployerOrganisation);
router.options('/',userController.optionsSignup);
router.post('/login', userController.postLogin);
router.get('/xero/connect', userController.connectXero);
router.get('/xero/callback', userController.getCallbackFromXero);

export default router;