export type FabricModel = {
	id: number
	name: string

	created_at: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number
}

export type ProductionFabricModel = {
	id: number
	production_id: number
	fabric_id: number
	color: number
	meters: number
	cost: number

	fabric: FabricModel
}
