import { PurchaseModel } from '.'

export interface NotificationModel {
	id: number
	notifiable: Notifiable
	notifiableId: number
	text: string
	createdAt: Date
	updatedAt?: Date
	updatedById?: number

	stock?: PurchaseModel
}

export enum Notifiable {
	stock = 'stock'
}
