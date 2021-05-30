import employeeFactory from "../factories/employee.factory"
import xero from "../../configs/xeroClient"
import { Employee } from "xero-node/dist/gen/model/payroll-au/models"

export default {
  getXeroEmployeeByNameAndEmail: (
    tenantId,
    firstName,
    lastName,
    employeeEmail,
    ifModifiedSince,
  ) => new Promise(async (resolve, reject) => {
    const where = employeeFactory.createXeroWhereQuery(firstName, lastName, employeeEmail)
    const response = await xero.payrollAUApi.getEmployees(tenantId, ifModifiedSince.toString(), where)

    const xeroEmployee: Employee = response.body?.employees[0]

    if (!xeroEmployee) {
      // If no employee was found, throw error
      reject(`Employee ${employeeEmail} was not found in Xero employee`)
    }

    resolve(xeroEmployee);
  }),
  getXeroEmployeeByXeroExployeeId: (
    tenantId,
    xeroEmployeeId
  ) => new Promise(async (resolve, reject) => {

    const response: any = await xero.payrollAUApi.getEmployee(tenantId, xeroEmployeeId)

    const xeroEmployee: Employee = response.body.employees[0]
    if (!xeroEmployee) {
      // If no employee was found, throw error
      reject(`Employee ${xeroEmployeeId} was not found in Xero employee`)
    }

    resolve(xeroEmployee);
  }),
}