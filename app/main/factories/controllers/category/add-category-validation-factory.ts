import { Category } from '@/app/domain/models'
import { Validation } from '@/app/infra/http/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/app/validation/validators'

type FieldTypes = keyof Category

export const makeAddCategoryValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['name']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
