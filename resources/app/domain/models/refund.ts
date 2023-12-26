import { MunicipalityProps, ProvinceProps } from '@/utils'
import { CustomerModel } from './customer'
import { EmployeeModel } from './employee'
import { ProductModel } from './product'
import { CategoryModel } from './category'

export type RefundModel = {
	id: number
	customer_id: number
	file_path: string
	purchase_date: Date
	category_id: number
	product_id: number
	phone: string
	email: string
	province_id: number
	municipality_id: number
	address: string
	iban: string
	amount: number
	description: string

	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number

	product?: ProductModel
	category?: CategoryModel
	customer?: CustomerModel
	user?: EmployeeModel
	province?: ProvinceProps
	municipality?: MunicipalityProps
}
