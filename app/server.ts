require('dotenv').config();
import express from 'express';
import { Request, Response } from 'express';
import jwtDecode from 'jwt-decode';
import { TokenSet } from 'openid-client';
import bodyParser from 'body-parser';
import { XeroAccessToken, XeroIdToken, XeroClient, Contacts, Phone, PaymentTermType, Employees } from 'xero-node';
import { Employee as AUPayrollEmployee, HomeAddress, State, EmployeeStatus, EarningsType } from 'xero-node/dist/gen/model/payroll-au/models';
import morgan from 'morgan'; // log requests to the console
import passport from "passport";
import "./configs/passport";
import "./configs/database";
import 'isomorphic-fetch'

import xero from './configs/xeroClient'; // init xero client
import allRoutes from './routes'

import { dbConnection } from "./configs/database";
import * as indexController from "./controllers/index.controller";
import * as userController from './controllers/user.controller';
import { config } from 'dotenv/types';

const session = require('express-session');
const fs = require("fs");
const path = require("path");
const mysql = require('mysql2/promise');

export const init = () => {
  const app: express.Application = express();

  app.use(express.json());

  app.use(express.static(__dirname + '/build'));
  app.use(morgan('dev'))	// log every request to the console

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', indexController.index);
  app.get('/callback', userController.getCallbackFromXero);
  app.get('/connect', userController.connectXero);
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    //res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

  app.use(allRoutes);
 
  
  /* --------------------- end of server codes -------------------- */

  /* --- Demo API --- */

  app.get('/contact', async (req: Request, res: Response) => {
    try {
      const tokenSet = await xero.readTokenSet();
      const contacts: Contacts = {
        contacts: [{
          name: "The gen jijjj",
          firstName: "Joe",
          lastName: "Exotic",
          emailAddress: "rheuuu@gmail.com",
          phones: [{
            phoneType: Phone.PhoneTypeEnum.MOBILE,
            phoneNumber: "555-555",
            phoneAreaCode: "555"
          }],
          paymentTerms: {
            bills: {
              day: 15,
              type: PaymentTermType.OFCURRENTMONTH
            },
            sales: {
              day: 10,
              type: PaymentTermType.DAYSAFTERBILLMONTH
            }
          }
        }],
      };
      const response: any = await xero.accountingApi.createContacts(req.session.activeTenant.tenantId, contacts);
      res.json(response.body);
    }
    catch (err) {
      res.send('Sorry, something went wrong')
    }
  });

  app.get("/createEmployee", async (req: Request, res: Response) => {
    try {
      // since we already have an Employee model in the Accounting API scope, we've imported and renamed like so:
      // import { Employee as AUPayrollEmployee } from 'xero-node/dist/gen/model/payroll-au/models';
      const homeAddress: HomeAddress = {
        addressLine1: "899 londtre street",
        city: "Melbourne",
        region: State.VIC,
        postalCode: "3000",
        country: "AUSTRALIA"
      }
      const employee: AUPayrollEmployee = {
        firstName: 'Marven',
        lastName: 'Kim',
        dateOfBirth: xero.formatMsDate("1995-02-22"),
        homeAddress: homeAddress
      }

      const createEmployee = await xero.payrollAUApi.createEmployee(req.session.activeTenant.tenantId, [employee])
      res.send()
    } catch (e) {
      console.log(e)
    }
  });

  return app;
}

export default { init }