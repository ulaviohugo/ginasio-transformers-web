import { SupplierModel } from '../../models'

export interface LoadSuppliers {
	load(): Promise<LoadSuppliersResult>
}

export type LoadSuppliersResult = SupplierModel[]
