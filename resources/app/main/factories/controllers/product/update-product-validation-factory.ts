import { ProductModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import {
	NumberGreaterThanValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/validation/validators'

type FieldTypes = keyof ProductModel

export const makeUpdateProductValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['name', 'price', 'categoryId']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new NumberGreaterThanValidation('id', 0),
		new NumberGreaterThanValidation('price', 0),
		new NumberGreaterThanValidation('categoryId', 0)
	)
	return new ValidationComposite(validations)
}
