import { InsuredModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import {
	DateGreaterThanValidation,
	EmailValidation,
	NumberGreaterThanValidation,
	NumberValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/validation/validators'

type FieldTypes = keyof InsuredModel

export const makeUpdateInsuredValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = [
		'proposalNumber',
		'policyNumber',
		'proposalType',
		'mediator',
		'name',
		'cardName',
		'cardNumber',
		'dateOfBirth',
		'documentType',
		'documentNumber',
		'documentIssueDate',
		'gender',
		'dependents',
		'maritalStatus',
		'neighborhood',
		'address',
		'plan',
		'policy',
		'enrollmentDate',
		'renewalDate',
		'review'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new NumberGreaterThanValidation('id', 0),
		new EmailValidation('email'),
		new NumberValidation('dependents'),
		new DateGreaterThanValidation('contractEndDate', 'hireDate')
	)
	return new ValidationComposite(validations)
}
