import { Product } from '@/app/domain/models'
import { Validation } from '@/app/infra/http/protocols'
import {
	NumberGreaterThanValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/app/validation/validators'

type FieldTypes = keyof Product

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
