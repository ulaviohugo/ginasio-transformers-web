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

export const makeUpdateSupplierValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = [
		'name',
		'representative',
		'phone',
		'email',
		'countryId',
		'businessAddress',
		'categoryId',
		'productId',
		'unitPrice'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new NumberGreaterThanValidation('id', 0),
		new EmailValidation('email'),
		new NumberGreaterThanValidation('countryId', 0),
		new NumberGreaterThanValidation('categoryId', 0),
		new NumberGreaterThanValidation('productId', 0),
		new NumberGreaterThanValidation('unitPrice', 0),
		new NumberValidation('phone')
	)
	return new ValidationComposite(validations)
}
