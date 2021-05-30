import { Request, Response, NextFunction } from "express";
import xero from '../configs/xeroClient'

import { TokenSet } from 'openid-client';
import aliasManager from '../db-manager/alias.manager';
import { Alias, PAlias } from './../models/alias.model';
import xeroManager from "../db-manager/xeroTokenSet.manager";
import employeeFunction from './functions/employee.function';
import aliasFactory from './factories/alias.factory';
import { Account } from 'xero-node';
import { validationResult } from 'express-validator'
import { BankAccount } from "xero-node/dist/gen/model/payroll-au/models";
import employeeFeatureManager from './../db-manager/organisation_feature.manager'

let md5 = require('md5');

export const getEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body: employees } = await xero.payrollAUApi.getEmployees(req.session.activeTenant.tenantId)
    return res.json(employees);
  } catch (e) {
    console.log(e)
  }
};

/*
  The CHALLENGE is Pineapple user doesn't have the employer authorisation.  
  How does the pineapple employee user get employer authorisation to set bank account
  ** EXTENSION REQUIRED ** to design how employee gets tenantId, employerUserId, employer's tokenSet

  During this development, employer just login to the app to let employee integrate
*/
export const createEmployeeIdNetwork = async (req, res, next) => {
  const {
    employeeFirstName,
    employeeLastName,
    employeeEmail
  } = req.body

  const {
    tenantId,
    orgId
  } = req.data
  try {
    /* 
      get TokenSet by employerUserId for retrieving employer 
      authorisation (TokenSet) to access the organisational data
    */
    const ifModifiedSince = new Date("2009-11-12T00:00:00");
    const xeroEmployee: any =
      await employeeFunction.getXeroEmployeeByNameAndEmail(tenantId, employeeFirstName, employeeLastName, employeeEmail, ifModifiedSince.toString())
        .catch((e) => {
          console.log(e)
          return res.json(e).status(500)
        })
    // if not found
    if (!xeroEmployee) {
      console.log('can\'t find this employee')
      return res.sendStatus(400)
    }

    const alias = aliasFactory.createNewAlias(123, xeroEmployee.employeeID, orgId)

    // Create alias in database
    await aliasManager.create(alias, (err, result) => {
      if (err) return res.json({ err }).status(400)
      const employeeId = result[0].insertId
      const hashAliasId = md5(employeeId)

      aliasManager.updateByEmpolyeeId(hashAliasId, employeeId, (err, result) => {
        if (err) return res.json({ err }).status(400)

      })
      return res.json({ hashAliasId:hashAliasId, success: true })
    });
  } catch (e) {
    console.log(e)
    return res.json(e).status(500)
  }
}

/*
  Similar CHALLENGE to createEmployeeIdNetwork
*/
export const updatePrimaryBankAccount = async (req, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    statementText,
    accountName,
    bSB,
    accountNumber
  } = req.body

  const {
    tenant_id,
    xero_employee_id
  } = req.data
  console.log(tenant_id + "............." + xero_employee_id)
  try {
    // TODO: should use Promise and transform to await to avoid callback hell

    // Get existing employee from xero to fulfil update condition (need firstname, lastname)
    const xeroEmployee: any = await employeeFunction.getXeroEmployeeByXeroExployeeId(tenant_id, xero_employee_id)
    var Accounts = xeroEmployee.bankAccounts

    var objIndex = Accounts.findIndex(obj => obj.bSB === bSB && obj.accountNumber === accountNumber && obj.remainder === false)
    if (objIndex != -1) {
      return res.status(400).send("Account already exist")
    }
    var e = Accounts.findIndex(obj => obj.remainder === true)
    if (e === -1) {
      return res.status(400).send("Primary account doesnt exist. Contact Xero for more help")
    }
    Accounts.splice(e, 1)
    const newPrimaryAccounts = [{
      statementText,
      accountName,
      bSB,
      accountNumber,
      remainder: true
    }]
    var Accounts: any = newPrimaryAccounts.concat(Accounts)
    const newEmployees = [{
      firstName: xeroEmployee.firstName,
      lastName: xeroEmployee.lastName,
      dateOfBirth: xeroEmployee.dateOfBirth,
      bankAccounts: Accounts
    }]
    var feature_id = 1


    await employeeFeatureManager.getOrgTenantId(tenant_id, async (err, result) => {
      if (result[0].org_id) {
        console.log(result[0].org_id)
        var org_id = result[0].org_id
        await employeeFeatureManager.getOrganisationAndFeature(org_id, feature_id, async (err, result) => {
          console.log(org_id)
          if (result[0].status === 1) {

            console.log(result[0].status)
            var count = result[0].count_usage + 1
            await xero.payrollAUApi.updateEmployee(tenant_id, xero_employee_id, newEmployees)

            employeeFeatureManager.updateUsage(org_id, feature_id, count, (err, result) => {
              if (err) return res.json({ err })
              return res.json({ success: true })

            })

          }
          else {
            return res.send("You are not authorized")
          }
        })


      }
      else {
        console.log("SA")
      }
    })



    // const empolee = await xero.payrollAUApi.getEmployee(tenant_id, xero_employee_id)




  } catch (e) {
    console.log(e)
    res.status(403).send(e)
  }
};


export const updatePayCalendar = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    calendarName
  } = req.body

  const {
    tenant_id,
    xero_employee_id
  } = req.data

  try {

    // Get existing employee from xero to fulfil update condition (need firstname, lastname)
    const xeroEmployee: any = await employeeFunction.getXeroEmployeeByXeroExployeeId(tenant_id, xero_employee_id)
    const getAllCalendar: any = await xero.payrollAUApi.getPayrollCalendars(tenant_id)
    const calendarExist = getAllCalendar.body.payrollCalendars.find(function (post, index) {
      if (post.name === calendarName)
        return true
    })
    if (calendarExist === undefined) {
      return res.status(404).send("Payroll type doesn't exist. Please try again with valid calendar type")

    }
    const newCalendarID = calendarExist.payrollCalendarID
    const newEmployees = [{
      firstName: xeroEmployee.firstName,
      lastName: xeroEmployee.lastName,
      dateOfBirth: xeroEmployee.dateOfBirth,
      payrollCalendarID: newCalendarID
    }]

    await xero.payrollAUApi.updateEmployee(tenant_id, xero_employee_id, newEmployees)
    return res.json({ success: true })


  } catch (e) {
    console.log(e)
    res.status(403).send(e)
  }
}


//Adding New Account for a employee
export const addSavingsAccount = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    statementText,
    accountName,
    bSB,
    accountNumber,
    remainder,
    amount
  } = req.body

  const {
    tenant_id,
    xero_employee_id
  } = req.data


  try {
    // Get existing employee from xero to fulfil update condition (need firstname, lastname)
    var xeroEmployee: any = await employeeFunction.getXeroEmployeeByXeroExployeeId(tenant_id, xero_employee_id)
    var Accounts = xeroEmployee.bankAccounts
    var Count = (xeroEmployee.bankAccounts).length
    const objIndex = Accounts.findIndex(obj => obj.bSB === bSB && obj.accountNumber === accountNumber)
    if (objIndex != -1) {
      return res.status(400).send("Account already exist")
    }
    if (Count < 1) {
      return res.status(400).send("No Have no primary bank Account. Please set the primary bank account and try again later")
    }
    if (Count > 3) {
      return res.status(400).send("You cant have more than 4 accounts")
    }
    const savingsAccount = {
      statementText,
      accountName,
      bSB,
      accountNumber,
      remainder,
      amount
    }
    var Accounts = Accounts.concat(savingsAccount)
    const Employees = [{
      firstName: xeroEmployee.firstName,
      lastName: xeroEmployee.lastName,
      dateOfBirth: xeroEmployee.dateOfBirth,
      bankAccounts: Accounts

    }]
    var feature_id = 3



    await employeeFeatureManager.getOrgTenantId(tenant_id, async (err, result) => {
      if (result[0].org_id) {
        console.log(result[0].org_id)
        var org_id = result[0].org_id
        await employeeFeatureManager.getOrganisationAndFeature(org_id, feature_id, async (err, result) => {
          console.log(org_id)
          if (result[0].status === 1) {

            console.log(result[0].status)
            var count = result[0].count_usage + 1
            await xero.payrollAUApi.updateEmployee(tenant_id, xero_employee_id, Employees)

            employeeFeatureManager.updateUsage(org_id, feature_id, count, (err, result) => {
              if (err) {
                return res.json({ err })
              }
              else {


                return res.json({ success: true })
              }
            })

          }
          else {
            return res.send("You are not authorized")
          }
        })


      }
      else {
        console.log("SA")
      }
    })





  } catch (e) {
    console.log(e)
    res.status(403).send(e)
  }
}


export const updateSavingsAmount = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    bSB,
    accountNumber,
    amount
  } = req.body

  const {
    tenant_id,
    xero_employee_id
  } = req.data

  try {
    // Get existing employee from xero to fulfil update condition (need firstname, lastname)
    var xeroEmployee: any = await employeeFunction.getXeroEmployeeByXeroExployeeId(tenant_id, xero_employee_id)
    var Accounts = xeroEmployee.bankAccounts
    const countBankAccounts = (xeroEmployee.bankAccounts).length
    if (countBankAccounts < 2) {
      return res.status(400).send("You have just one account. You cant have savings account")
    }
    //Need to check if we are updating primary account or account with balance
    const objIndex = Accounts.findIndex(obj => obj.bSB === bSB && obj.accountNumber === accountNumber)
    if (objIndex === -1) {
      return res.status(400).send("Account not found")
    }
    const updatedObj = { ...Accounts[objIndex], amount: amount }

    const updatedAcc = [
      ...Accounts.slice(0, objIndex),
      updatedObj,
      ...Accounts.slice(objIndex + 1)
    ]

    const Employee = [{
      firstName: xeroEmployee.firstName,
      lastName: xeroEmployee.lastName,
      dateOfBirth: xeroEmployee.dateOfBirth,
      bankAccounts: updatedAcc
    }]
    var feature_id = 4



    await employeeFeatureManager.getOrgTenantId(tenant_id, async (err, result) => {
      if (result[0].org_id) {
        console.log(result[0].org_id)
        var org_id = result[0].org_id
        await employeeFeatureManager.getOrganisationAndFeature(org_id, feature_id, async (err, result) => {
          console.log(org_id)
          if (result[0].status === 1) {

            console.log(result[0].status)
            var count = result[0].count_usage + 1
            await xero.payrollAUApi.updateEmployee(tenant_id, xero_employee_id, Employee)

            employeeFeatureManager.updateUsage(org_id, feature_id, count, (err, result) => {
              if (err) return res.json({ err })
              else {
                return res.json({ success: true })
              }
            })

          }
          else {
            return res.send("You are not authorized")
          }
        })


      }
      else {
        console.log("SA")
      }
    })



  } catch (e) {
    console.log(e)
    res.status(403).send(e)
  }
}


export const newupdatePayCalendar = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    calendarName
  } = req.body

  const {
    tenant_id,
    xero_employee_id
  } = req.data

  try {
    const ifModifiedSince: any = new Date("1980-11-12T00:00:00");
    const getPayRuns = await xero.payrollAUApi.getPayRuns(tenant_id, ifModifiedSince)
    const st: any = "DRAFT"
    const Drafts = getPayRuns.body.payRuns.filter(obj => obj.payRunStatus === st)
    const xeroEmployee: any = await employeeFunction.getXeroEmployeeByXeroExployeeId(tenant_id, xero_employee_id)
    const calendarID = xeroEmployee.payrollCalendarID
    const noConf = Drafts.find(obj => obj.payrollCalendarID === calendarID)
    if (noConf === undefined) {
      const getAllCalendar: any = await xero.payrollAUApi.getPayrollCalendars(tenant_id)
      const calendarExist = getAllCalendar.body.payrollCalendars.find(function (post, index) {
        if (post.name === calendarName)
          return true
      })
      if (calendarExist === undefined) {
        return res.status(404).send("Payroll type doesn't exist. Please try again with valid calendar type")

      }
      const newCalendarID = calendarExist.payrollCalendarID
      const newEmployees = [{
        firstName: xeroEmployee.firstName,
        lastName: xeroEmployee.lastName,
        dateOfBirth: xeroEmployee.dateOfBirth,
        payrollCalendarID: newCalendarID
      }]

      var feature_id = 2


      await employeeFeatureManager.getOrgTenantId(tenant_id, async (err, result) => {
        if (result[0].org_id) {
          console.log(result[0].org_id)
          var org_id = result[0].org_id
          await employeeFeatureManager.getOrganisationAndFeature(org_id, feature_id, async (err, result) => {
            console.log(org_id)
            if (result[0].status === 1) {

              console.log(result[0].status)
              var count = result[0].count_usage + 1
              await xero.payrollAUApi.updateEmployee(tenant_id, xero_employee_id, newEmployees)

              employeeFeatureManager.updateUsage(org_id, feature_id, count, (err, result) => {
                if (err) {
                  throw err
                }
                else {
                  return res.json({ success: true })
                }

              })

            }
            else {
              return res.send("You cannot access this")
            }
          })


        }
        else {
          console.log("SA")
        }
      })



    }
    else {
      return res.send('A existing pay run exist')
    }
  } catch (e) {
    console.log(e)
    res.status(403).send(e)
  }
}