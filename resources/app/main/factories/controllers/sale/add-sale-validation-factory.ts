import { SaleModel } from '@/domain/models'
import { Validation } from '@/infra/http/protocols'
import {
	NumberGreaterThanValidation,
	RequiredFieldValidation,
	ValidationComposite
} from '@/validation/validators'

type FieldTypes = keyof SaleModel

export const makeAddSaleValidation = () => {
	const validations: Validation[] = []
	const fields: FieldTypes[] = ['productSales', 'payment_method']
	for (const field of fields) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
