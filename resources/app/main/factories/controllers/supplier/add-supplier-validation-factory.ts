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

export const makeAddSupplierValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = [
		'name',
		'representative',
		'phone',
		'email',
		'country_id',
		'address'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new EmailValidation('email'),
		new NumberGreaterThanValidation('country_id', 0)
	)
	return new ValidationComposite(validations)
}
