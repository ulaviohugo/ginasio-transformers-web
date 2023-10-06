import { CategoryModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

type FieldTypes = keyof CategoryModel

export const makeAddCategoryValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['name']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
