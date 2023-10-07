import { SupplierModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import {
	EmailValidation,
	NumberGreaterThanValidation,
	NumberValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/validation/validators'

type FieldTypes = keyof SupplierModel

export const makeUpdateSupplierValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = [
		'name',
		'representative',
		'email',
		'country_id',
		'address'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new NumberGreaterThanValidation('id', 0),
		new EmailValidation('email'),
		new NumberGreaterThanValidation('country_id', 0),
		new NumberValidation('phone')
	)
	return new ValidationComposite(validations)
}
