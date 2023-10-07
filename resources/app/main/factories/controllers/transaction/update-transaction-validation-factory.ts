import { TransactionModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import {
	NumberGreaterThanValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/validation/validators'

type FieldTypes = keyof TransactionModel

export const makeUpdateTransactionValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = [
		'date',
		'operation_type',
		'description',
		'amount',
		'payment_method'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(new NumberGreaterThanValidation('id', 0))
	return new ValidationComposite(validations)
}
