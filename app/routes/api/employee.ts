import express from 'express';
const router = express.Router();
import { check } from 'express-validator';

import * as employeeController from '../../controllers/employee.controller'
import auth from '../../configs/auth';
import xeroSession from '../../configs/xeroSession'
import employeeFeatureManager from './../../db-manager/organisation_feature.manager'

router.get('/', auth.required, employeeController.getEmployees);
router.post('/idNetwork', xeroSession.getTokenSetByOrganizationNameFromBody, employeeController.createEmployeeIdNetwork);
router.patch('/bankAccountPrimary', xeroSession.getTokenSetByHashAliasIdFromBody,
    [
        check('accountNumber', 'Please add a valid Account Number').isLength({ min: 6, max: 6 }).isNumeric().notEmpty(),
        check('bSB', 'Please add a valid BSB Number').isLength({ min: 6, max: 6 }).isNumeric().notEmpty(),
        check('hashAliasId', 'Please enter your valid aliasId Id').notEmpty(),
        check('accountName', 'Please Enter a valid name for your bank account ').notEmpty(),
        check('statementText', 'Please add a statement text for this account').notEmpty()
    ],
    employeeController.updatePrimaryBankAccount);
router.patch('/updateCal', xeroSession.getTokenSetByHashAliasIdFromBody, [
    check('calendarName', 'Please enter a valid calendar Name ').notEmpty()
], employeeController.updatePayCalendar)

router.patch('/addSavingsAccount', xeroSession.getTokenSetByHashAliasIdFromBody,
    [
        check('accountNumber', 'Please add a valid Account Number').isLength({ min: 6, max: 6 }).isNumeric().notEmpty(),
        check('bSB', 'Please add a valid BSB Number').isLength({ min: 6, max: 6 }).isNumeric().notEmpty(),
        check('hashAliasId', 'Please enter your valid hash aliasId Id').notEmpty(),
        check('accountName', 'Please Enter a valid name for your bank account ').notEmpty(),
        check('statementText', 'Please add a statement text for this account').notEmpty(),
        check('amount', 'Please add a valid amount').isNumeric().notEmpty()
    ],
    employeeController.addSavingsAccount)
router.patch('/updateSavingsAmount', xeroSession.getTokenSetByHashAliasIdFromBody,
    [
        check('hashAliasId', 'Please enter your valid hash aliasId Id').notEmpty(),
        check('bSB', 'Please add a valid BSB Number').isLength({ min: 6, max: 6 }).isNumeric().notEmpty(),
        check('accountNumber', 'Please add a valid Account Number').isLength({ min: 6, max: 6 }).isNumeric().notEmpty(),
        check('amount', 'Please add a valid amount').isNumeric().notEmpty()



    ], employeeController.updateSavingsAmount)
router.patch('/newPayCal', xeroSession.getTokenSetByHashAliasIdFromBody,
    [
        check('calendarName', 'Please enter a valid calendar Name ').notEmpty()

    ], employeeController.newupdatePayCalendar)

router.patch('/disableStatus', async (req, res) => {
    const {
        org_id,
        feature_id
    } = req.body
    console.log(org_id + "..........." + feature_id)
    await employeeFeatureManager.disableFeature(org_id, feature_id, async (err, result) => {
        if (err) return res.json({ err })
        else {
            return res.json({ success: true })
        }
    })

})
router.patch('/enableStatus', async (req, res) => {
    const {
        org_id,
        feature_id
    } = req.body
    console.log(org_id + "..........." + feature_id)
    await employeeFeatureManager.enableFeature(org_id, feature_id, async (err, result) => {
        if (err) return res.json({ err })
        else {
            return res.json({ success: true })
        }
    })

})
router.patch('/getdata', async (req, res) => {
    const {
        org_id
    } = req.body
    await employeeFeatureManager.getData(org_id, async (err, result) => {

        if (err) return res.json({ err })
        else {
            return res.json(result)
        }
    })
})

export default router;