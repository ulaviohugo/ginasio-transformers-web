import { AuthenticationParams } from '@/app/domain/usecases'
import { Validation } from '@/app/infra/http/protocols'
import {
	EmailValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/app/validation/validators'

type FieldTypes = keyof AuthenticationParams

export const makeAuthenticationValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['email', 'password']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(new EmailValidation('email'))
	return new ValidationComposite(validations)
}
