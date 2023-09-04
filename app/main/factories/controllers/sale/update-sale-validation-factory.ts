import { SaleModel } from '@/app/domain/models'
import { Validation } from '@/app/infra/http/protocols'
import {
	NumberGreaterThanValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/app/validation/validators'

type FieldTypes = keyof SaleModel

export const makeUpdateSaleValidation = () => {
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
		new NumberGreaterThanValidation('id', 0),
		new NumberGreaterThanValidation('purchaseId', 0),
		new NumberGreaterThanValidation('quantity', 0),
		new NumberGreaterThanValidation('totalValue', 0),
		new NumberGreaterThanValidation('unitPrice', 0)
	)
	return new ValidationComposite(validations)
}
