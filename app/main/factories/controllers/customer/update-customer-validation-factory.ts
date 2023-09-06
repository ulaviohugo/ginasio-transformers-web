import { CustomerModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import {
	NumberGreaterThanValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/validation/validators'

type FieldTypes = keyof CustomerModel

export const makeUpdateCustomerValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['name', 'gender', 'countryId', 'residentialAddress']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(new NumberGreaterThanValidation('id', 0))
	return new ValidationComposite(validations)
}
