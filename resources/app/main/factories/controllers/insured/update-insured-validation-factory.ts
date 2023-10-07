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
		'proposal_number',
		'policy_number',
		'proposal_type',
		'mediator',
		'name',
		'card_name',
		'card_number',
		'date_of_birth',
		'document_type',
		'document_number',
		'documentIssueDate',
		'nif',
		'gender',
		'dependents',
		'marital_status',
		'neighborhood',
		'address',
		'plan',
		'policy',
		'enrollment_date',
		'renewal_date',
		'review'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new NumberGreaterThanValidation('id', 0),
		new EmailValidation('email'),
		new NumberValidation('dependents'),
		new DateGreaterThanValidation('contract_end_date', 'hire_date')
	)
	return new ValidationComposite(validations)
}
