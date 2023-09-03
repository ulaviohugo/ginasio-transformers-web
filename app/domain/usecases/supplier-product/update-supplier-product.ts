import { SupplierProductModel } from '../../models'

export interface UpdateSupplierProduct {
	update(param: SupplierProductModel): Promise<UpdateSupplierProductResult>
}

export type UpdateSupplierProductResult = SupplierProductModel | 'emailInUse'
