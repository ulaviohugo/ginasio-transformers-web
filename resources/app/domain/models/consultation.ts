import { InsuredModel } from '.'

export type ConsultationModel = {
	id: number
	copayment_amount: number
	payment_method: string
	insuredId: number
	created_at: Date
	user_id: number
	updated_at: Date
	user_id_update: number

	insured?: InsuredModel
}
