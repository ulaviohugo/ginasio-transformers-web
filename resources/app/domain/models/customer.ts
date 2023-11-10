export interface CustomerModel {
	id: number
	photo?: string
	name: string
	date_of_birth?: Date
	phone?: string
	email?: string
	country_id: number
	province_id?: number
	municipality_id?: number
	address: string
	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number
}
