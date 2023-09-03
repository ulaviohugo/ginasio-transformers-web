import { Supplier } from '@/app/domain/models'
import { Validation } from '@/app/infra/http/protocols'
import {
	EmailValidation,
	NumberGreaterThanValidation,
	NumberValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/app/validation/validators'

type FieldTypes = keyof Supplier

export const makeAddSupplierValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = [
		'name',
		'representative',
		'phone',
		'email',
		'countryId',
		'businessAddress'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new EmailValidation('email'),
		new NumberGreaterThanValidation('countryId', 0)
	)
	return new ValidationComposite(validations)
}
