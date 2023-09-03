import { CustomerModel } from '@/app/domain/models'
import { Validation } from '@/app/infra/http/protocols'
import {
	EmailValidation,
	NumberGreaterThanValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/app/validation/validators'

type FieldTypes = keyof CustomerModel

export const makeUpdateCustomerValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = [
		'name',
		'gender',
		'dateOfBirth',
		'phone',
		'email',
		'countryId',
		'residentialAddress'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(new NumberGreaterThanValidation('id', 0), new EmailValidation('email'))
	return new ValidationComposite(validations)
}
