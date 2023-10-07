import { ProductSaleModel, SaleModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

type FieldTypes = keyof ProductSaleModel

export const makeAddProductSaleValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = [
		'product_id',
		'quantity',
		'total_value',
		'unit_price',
		'amount_paid'
	]
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
