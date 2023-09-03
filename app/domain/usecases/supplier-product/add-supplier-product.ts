import { SupplierProductModel } from '../../models'

export interface AddSupplierProduct {
	add(param: SupplierProductModel): Promise<AddSupplierProductResult>
}

export type AddSupplierProductResult = SupplierProductModel | 'emailInUse'
