import { ProductModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import {
	NumberGreaterThanValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/validation/validators'

type FieldTypes = keyof ProductModel

export const makeAddProductValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['name', 'price', 'category_id']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new NumberGreaterThanValidation('price', 0),
		new NumberGreaterThanValidation('category_id', 0)
	)
	return new ValidationComposite(validations)
}
