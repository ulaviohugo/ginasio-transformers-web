export type AccessoryModel = {
	id: number
	name: string

	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number
}

export type ProductionAccessoryModel = {
	id: number
	production_id: number
	accessory_id: number
	quantity: number
	price: number
	name: string
}
