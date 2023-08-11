import { Employee } from '@/app/domain/models'
import { Validation } from '@/app/infra/http/protocols'
import {
	DateGreaterThanValidation,
	EmailValidation,
	NumberGreaterThanValidation,
	NumberValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/app/validation/validators'

type FieldTypes = keyof Employee

export const makeUpdateEmployeeValidation = () => {
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
		'phone1',
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
		new NumberGreaterThanValidation('id', 0),
		new EmailValidation('email'),
		new NumberValidation('dependents'),
		new DateGreaterThanValidation('contractEndDate', 'hireDate')
	)
	return new ValidationComposite(validations)
}
