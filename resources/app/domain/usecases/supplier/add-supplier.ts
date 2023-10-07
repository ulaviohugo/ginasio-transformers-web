import { SupplierModel } from '@/domain/models'

export interface AddSupplier {
	add(param: SupplierModel): Promise<AddSuppliersResult>
}

export type AddSuppliersResult = SupplierModel
