import { QueryParams } from '@/data/protocols'
import { SupplierModel } from '@/domain/models'

export interface LoadSuppliers {
	load(params?: LoadSuppliersParams): Promise<LoadSuppliersResult>
}

export type LoadSuppliersParams = QueryParams<SupplierFilterFields>
export type LoadSuppliersResult = SupplierModel[]

export type SupplierFilterFields = {
	id?: number
	category_id?: number
	product_id?: string
	municipality_id?: number
}
