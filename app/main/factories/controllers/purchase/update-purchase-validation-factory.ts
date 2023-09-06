import { PurchaseModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import {
	EmailValidation,
	NumberGreaterThanValidation,
	NumberValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/validation/validators'

type FieldTypes = keyof PurchaseModel

export const makeUpdatePurchaseValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = [
		'supplierId',
		'categoryId',
		'productId',
		'color',
		'size',
		'unitPrice',
		'quantity',
		'totalValue',
		'sellingPriceUnit',
		'paymentMethod',
		'purchaseDate'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new NumberGreaterThanValidation('id', 0),
		new NumberGreaterThanValidation('supplierId', 0),
		new NumberGreaterThanValidation('categoryId', 0),
		new NumberGreaterThanValidation('productId', 0),
		new NumberGreaterThanValidation('unitPrice', 0),
		new NumberGreaterThanValidation('quantity', 0),
		new NumberGreaterThanValidation('totalValue', 0),
		new NumberGreaterThanValidation('sellingPriceUnit', 0)
	)
	return new ValidationComposite(validations)
}
