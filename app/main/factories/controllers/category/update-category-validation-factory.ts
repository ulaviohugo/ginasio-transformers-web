import { Category } from '@/app/domain/models'
import { Validation } from '@/app/infra/http/protocols'
import {
	NumberGreaterThanValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/app/validation/validators'

type FieldTypes = keyof Category

export const makeUpdateCategoryValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['name']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(new NumberGreaterThanValidation('id', 0))
	return new ValidationComposite(validations)
}
