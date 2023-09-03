import { ProductModel } from '@/app/domain/models'
import { Validation } from '@/app/infra/http/protocols'
import {
	NumberGreaterThanValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/app/validation/validators'

type FieldTypes = keyof ProductModel

export const makeAddProductValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['name', 'price', 'categoryId']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new NumberGreaterThanValidation('price', 0),
		new NumberGreaterThanValidation('categoryId', 0)
	)
	return new ValidationComposite(validations)
}
