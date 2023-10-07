import { EmployeePresenceModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import {
	NumberGreaterThanValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/validation/validators'

type FieldTypes = keyof EmployeePresenceModel

export const makeAddEmployeePresenceValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['employee_id', 'presence_status', 'date']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(new NumberGreaterThanValidation('employee_id', 0))
	return new ValidationComposite(validations)
}
