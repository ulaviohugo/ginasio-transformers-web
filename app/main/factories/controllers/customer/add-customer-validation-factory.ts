import { CustomerModel } from '@/app/domain/models'
import { Validation } from '@/app/infra/http/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/app/validation/validators'

type FieldTypes = keyof CustomerModel

export const makeAddCustomerValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['name', 'gender', 'countryId', 'residentialAddress']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
