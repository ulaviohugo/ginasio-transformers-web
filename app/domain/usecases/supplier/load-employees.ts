import { Supplier } from '../../models'

export interface LoadSuppliers {
	load(): Promise<LoadSuppliersResult>
}

export type LoadSuppliersResult = Supplier[]
