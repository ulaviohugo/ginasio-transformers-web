import { EmployeeModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import {
	DateGreaterThanValidation,
	EmailValidation,
	NumberValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/validation/validators'

type FieldTypes = keyof EmployeeModel

export const makeAddEmployeeValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = [
		'name',
		'gender',
		'dateOfBirth',
		'maritalStatus',
		'documentType',
		'documentNumber',
		'nif',
		'dependents',
		'educationDegree',
		'phone',
		'email',
		'countryId',
		'residentialAddress',
		'position',
		'baseSalary',
		'hireDate',
		'contractEndDate'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new EmailValidation('email'),
		new NumberValidation('dependents'),
		new DateGreaterThanValidation('contractEndDate', 'hireDate')
	)
	return new ValidationComposite(validations)
}
