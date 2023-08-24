import { SupplierProduct } from '../../models'

export interface AddSupplierProduct {
	add(param: SupplierProduct): Promise<AddSupplierProductResult>
}

export type AddSupplierProductResult = SupplierProduct | 'emailInUse'
