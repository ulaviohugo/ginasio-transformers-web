import { EmployeePresenceModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import {
	DateGreaterThanValidation,
	EmailValidation,
	NumberGreaterThanValidation,
	NumberValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/validation/validators'

type FieldTypes = keyof EmployeePresenceModel

export const makeUpdateEmployeePresenceValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['employeeId', 'presenceStatus', 'date']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new NumberGreaterThanValidation('id', 0),
		new NumberGreaterThanValidation('employeeId', 0)
	)
	return new ValidationComposite(validations)
}
