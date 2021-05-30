import { XeroTokenSet } from './../models/xeroTokenSet.model';
import { NextFunction, Response } from 'express';
import xeroTokenSetManager from '../db-manager/xeroTokenSet.manager';
import aliasManager from '../db-manager/alias.manager';
import organisationManager from '../db-manager/organisation.manager';
import employerUserOrgManager from '../db-manager/employerUser_org.manager';

import xero from '../configs/xeroClient'

const xeroSession = {
  getTokenSetByOrganizationNameFromBody: async (req, res: Response, next: NextFunction) => {
    const { org_name } = req.body
    
    // await userManager.getUserByName(employerFirstName, employerLastName, () => { }).then((value) => { user = value })
    try {
      await organisationManager.getOrganisationByName(org_name, async (err, organisationData) => {
        let tenantId
        let orgId
        if (organisationData.length > 0) {
          tenantId = organisationData[0].tenant_id

          orgId = organisationData[0].org_id
          await employerUserOrgManager.getEmployerUserByOrganisationId(orgId, async (err, employerUserData) => {
            if (employerUserData[0]) {
              const employerUserId = employerUserData[0].employer_user_id

              await xeroTokenSetManager.getTokenSetByUserId(employerUserData[0].employer_user_id, async (err, tokenSet: XeroTokenSet) => {
                if (err) throw new Error(err)
                tokenSet = tokenSet[0]
                const tokenExpiresAt = tokenSet.expires_at
                const currentTimestamp = Math.floor(Date.now() / 1000)
                if (currentTimestamp > tokenExpiresAt) {

                  let newTokenSet = await xero.refreshWithRefreshToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET, tokenSet.refresh_token)
                  tokenSet.id_token = newTokenSet.id_token
                  tokenSet.access_token = newTokenSet.access_token
                  tokenSet.refresh_token = newTokenSet.refresh_token
                  tokenSet.scope = newTokenSet.scope
                  tokenSet.token_type = newTokenSet.token_type
                  tokenSet.expires_at = currentTimestamp + newTokenSet.expires_in

                  xeroTokenSetManager.update(tokenSet, (err, result) => {
                    if (err) return res.json({ err })
                    req.data = { employerUserId, tenantId, orgId }
                    next()
                  })
                }
                else {
                  await xero.setTokenSet(tokenSet)
                  req.data = { employerUserId, tenantId, orgId }
                  next()
                }
              }
              )
            }
            else {
              console.log("cannot not find such employer")
            }
          });
        }
        else {
          console.log(err);
          return res.json(`Cannot find ${org_name} organisation`).status(500)
        }
      })
    }
    catch (err) {
      console.log(err)
      res.send('Sorry, something went wrong');
    }
  },

  getTokenSetByHashAliasIdFromBody: async (req, res: Response, next: NextFunction) => {
    const { hashAliasId } = req.body
    try {
      let xero_employee_id;
      let tenant_id;

      await aliasManager.getEmployeeByHashAliasId(hashAliasId, async (err, emoloyeeUserData) => {

        xero_employee_id = emoloyeeUserData.xero_employee_id
        await organisationManager.getOrganisationById(emoloyeeUserData.org_id, async (err, organisationData) => {
          tenant_id = organisationData[0].tenant_id
        })
        await employerUserOrgManager.getEmployerUserByOrganisationId(emoloyeeUserData.org_id, async (err, employerUserData) => {
          if (employerUserData[0]) {
            const employerUserId = employerUserData[0].employer_user_id
            xeroTokenSetManager.getTokenSetByUserId(employerUserId,
              async (err, tokenSet: XeroTokenSet) => {
                tokenSet = tokenSet[0]
                if (err) throw new Error(err)
                const tokenExpiresAt = tokenSet.expires_at
                const currentTimestamp = Math.floor(Date.now() / 1000)
                if (currentTimestamp > tokenExpiresAt) {

                  let newTokenSet = await xero.refreshWithRefreshToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET, tokenSet.refresh_token)
                  tokenSet.id_token = newTokenSet.id_token
                  tokenSet.access_token = newTokenSet.access_token
                  tokenSet.refresh_token = newTokenSet.refresh_token
                  tokenSet.scope = newTokenSet.scope
                  tokenSet.token_type = newTokenSet.token_type
                  tokenSet.expires_at = currentTimestamp + newTokenSet.expires_in

                  xeroTokenSetManager.update(tokenSet, (err, result) => {
                    if (err) return res.json({ err })
                    req.data = { tenant_id, xero_employee_id }
                    next()
                  })
                }
                else {
                  await xero.setTokenSet(tokenSet)
                  req.data = { tenant_id, xero_employee_id }
                  next()
                }
              }
            )

          }
          else {
            console.log("Cannot find such employer")
          }


        })
      })

    }
    catch (err) {
      console.log(err)
      res.send('Sorry, something went wrong');
    }
  }
};

export default xeroSession