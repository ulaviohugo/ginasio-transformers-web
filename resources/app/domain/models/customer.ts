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
	customer_type: 'Padrão' | 'VIP'
	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number
}

export type CustomerMeasurementItemProps = {
	description: string
	measurement: number
}
export type CustomerMeasurementProps = {
	lowerLimbs: CustomerMeasurementItemProps[]
	upperLimbs: CustomerMeasurementItemProps[]
	customer_id?: number
	production_budget_id?: number
}
