export interface Employee {
  id: number
  name: string
  gender: string
  dateOfBirth: Date
  hireDate: Date
  maritalStatus: string
  educationDegree: string
  phone1: string
  phone2?: string
  email: string
  residentialAddress: string
  documentType: string
  documentNumber: string
  nif: string
  dependents: number
  socialSecurity?: string
  position: string
  baseSalary?: number
  contractEndDate?: Date
  workTime?: string
  iban?: string
  accountNumber?: string
  createdAt: Date
  createdBy?: number
  updatedAt?: Date
  updatedBy?: number
}
