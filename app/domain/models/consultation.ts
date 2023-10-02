import { InsuredModel } from '.'

export type ConsultationModel = {
	id: number
	copaymentAmount: number
	paymentMethod: string
	insuredId: number
	createdAt: Date
	createdById: number
	updatedAt: Date
	updatedById: number

	insured?: InsuredModel
}
