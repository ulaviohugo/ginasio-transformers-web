export interface NotificationModel {
	id: number
	notifiable: Notifiable
	notifiableId: number
	text: string
	createdAt: Date
	updatedAt?: Date
	updatedById?: number
}

export type Notifiable = 'stock'
