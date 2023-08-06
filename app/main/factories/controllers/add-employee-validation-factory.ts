import { Employee } from '@/app/domain/models'
import { Validation } from '@/app/infra/http/protocols'
import {
	EmailValidation,
	NumberValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/app/validation/validators'

type FieldTypes = keyof Employee

export const makeAddEmployeeValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = [
		'name',
		'gender',
		'dateOfBirth',
		'hireDate',
		'maritalStatus',
		'educationDegree',
		'phone1',
		'phone2',
		'email',
		'residentialAddress',
		'documentType',
		'documentNumber',
		'nif',
		'dependents',
		'socialSecurity',
		'position',
		'baseSalary',
		'iban',
		'accountNumber'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(new EmailValidation('email'), new NumberValidation('dependents'))
	return new ValidationComposite(validations)
}
