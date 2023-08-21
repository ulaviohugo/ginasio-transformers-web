import { Sale } from '@/app/domain/models'
import { Validation } from '@/app/infra/http/protocols'
import {
	NumberGreaterThanValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/app/validation/validators'

type FieldTypes = keyof Sale

export const makeAddSaleValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = [
		'purchaseId',
		'quantity',
		'totalValue',
		'unitPrice',
		'paymentMethod'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new NumberGreaterThanValidation('purchaseId', 0),
		new NumberGreaterThanValidation('quantity', 0),
		new NumberGreaterThanValidation('totalValue', 0),
		new NumberGreaterThanValidation('unitPrice', 0)
	)
	return new ValidationComposite(validations)
}