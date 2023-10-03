import { CashRegisterModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

type FieldTypes = keyof CashRegisterModel

export const makeAddCashRegisterValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['initialBalance', 'balance']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
