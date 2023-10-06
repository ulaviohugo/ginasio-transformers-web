import { SupplierModel } from '@/domain/models'

export interface LoadSuppliers {
	load(): Promise<LoadSuppliersResult>
}

export type LoadSuppliersResult = SupplierModel[]
