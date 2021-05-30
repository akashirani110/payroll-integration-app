import { CalendarType } from "xero-node/dist/gen/model/payroll-au/models"

export default {
  createXeroWhereQuery: (firstName, lastName, employeeEmail) => {
    return `FirstName=="${firstName}"&&LastName=="${lastName}"&&Email=="${employeeEmail}"`
  },

  createXeroEmployeeWithBankAccounts: (xeroEmployee, bankAccounts) => ({
    firstName: xeroEmployee.firstName,
    lastName: xeroEmployee.lastName,
    dateOfBirth: xeroEmployee.dateOfBirth,
    bankAccounts
  }),

  createBankAccount: (
    statementText,
    accountName,
    bSB,
    accountNumber,
    remainder
  ) => ({
    statementText,
    accountName,
    bSB,
    accountNumber,
    remainder
  }),

  createCalander: (
    name,
    CalendarType,
    startDate,
    paymentDate
  ) => ({
    name,
    CalendarType,
    startDate,
    paymentDate


  })



}