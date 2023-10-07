import { CustomerModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

type FieldTypes = keyof CustomerModel

export const makeAddCustomerValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['name', 'gender', 'country_id', 'address']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
