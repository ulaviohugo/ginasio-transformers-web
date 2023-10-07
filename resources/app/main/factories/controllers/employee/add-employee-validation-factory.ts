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
		'date_of_birth',
		'marital_status',
		'document_type',
		'document_number',
		'nif',
		'dependents',
		'education_degree',
		'phone',
		'email',
		'country_id',
		'address',
		'position',
		'base_salary',
		'hire_date',
		'contract_end_date'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new EmailValidation('email'),
		new NumberValidation('dependents'),
		new DateGreaterThanValidation('contract_end_date', 'hire_date')
	)
	return new ValidationComposite(validations)
}
