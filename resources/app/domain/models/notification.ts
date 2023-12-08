import { StockModel } from '.'

export interface NotificationModel {
	id: number
	notifiable: Notifiable
	notifiableId: number
	text: string
	created_at: Date
	updated_at?: Date
	user_id_update?: number

	stock?: StockModel
}

export enum Notifiable {
	stock = 'stock'
}
