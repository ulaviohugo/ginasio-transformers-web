import { SupplierProduct } from '../../models'

export interface UpdateSupplierProduct {
	update(param: SupplierProduct): Promise<UpdateSupplierProductResult>
}

export type UpdateSupplierProductResult = SupplierProduct | 'emailInUse'
