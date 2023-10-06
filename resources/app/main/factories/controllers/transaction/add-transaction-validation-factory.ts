import { TransactionModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

type FieldTypes = keyof TransactionModel

export const makeAddTransactionValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = [
		'date',
		'operationType',
		'description',
		'amount',
		'paymentMethod'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
