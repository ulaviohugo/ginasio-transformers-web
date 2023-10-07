import { SupplierProductModel } from '.'
export interface SupplierModel {
	id: number
	name: string
	representative: string
	email: string
	phone: string
	photo?: string
	country_id: number
	province_id?: number
	municipality_id?: number
	address: string
	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number

	supplier_products?: SupplierProductModel[]
}
