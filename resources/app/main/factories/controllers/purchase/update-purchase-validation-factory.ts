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
		'supplier_id',
		'category_id',
		'product_id',
		'color',
		'size',
		'unit_price',
		'quantity',
		'total_value',
		'selling_price_unit',
		'payment_method',
		'purchase_date'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(
		new NumberGreaterThanValidation('id', 0),
		new NumberGreaterThanValidation('supplier_id', 0),
		new NumberGreaterThanValidation('category_id', 0),
		new NumberGreaterThanValidation('product_id', 0),
		new NumberGreaterThanValidation('unit_price', 0),
		new NumberGreaterThanValidation('quantity', 0),
		new NumberGreaterThanValidation('total_value', 0),
		new NumberGreaterThanValidation('selling_price_unit', 0)
	)
	return new ValidationComposite(validations)
}
