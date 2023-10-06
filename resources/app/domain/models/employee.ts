import { EmployeePresenceModel } from '.'

export interface EmployeeModel {
	id: number
	photo?: string
	name: string
	gender: string
	dateOfBirth: Date
	maritalStatus: string
	documentType: string
	documentNumber: string
	nif?: string
	socialSecurity?: string
	dependents: number
	educationDegree: string
	phone: string
	phone2?: string
	email: string
	userName?: string
	password?: string
	passwordConfirmation?: string
	canLogin: boolean
	role: 'Admin' | 'Normal'
	countryId: number
	provinceId?: number
	municipalityId?: number
	residentialAddress: string
	position: string
	baseSalary: number
	hireDate: Date
	contractEndDate?: Date
	bankName?: string
	iban?: string
	accountNumber?: string
	createdAt: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number

	employeePresences: EmployeePresenceModel[]
}
