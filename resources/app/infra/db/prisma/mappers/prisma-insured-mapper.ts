import { Insured as InsuredRaw } from '@prisma/client'

import { InsuredModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'

export class PrismaInsuredMapper {
	static toPrisma(insured: InsuredModel): InsuredRaw {
		if (!insured) return null as any
		return {
			id: insured.id,
			name: insured.name,
			policyholder_id: NumberUtils.convertToNumber(insured.policyholder_id, true),
			gender: insured.gender,
			marital_status: insured.marital_status,
			card_name: insured.card_name,
			card_number: insured.card_number,
			date_of_birth: DateUtils.convertToDate(insured.date_of_birth),
			document_type: insured.document_type,
			document_number: insured.document_number,
			documentIssueDate: DateUtils.convertToDate(insured.documentIssueDate),
			nif: insured.nif,
			dependents: insured.dependents,
			occupation: insured.occupation,
			province_id: insured.province_id,
			municipality_id: insured.municipality_id,
			address: insured.address,
			neighborhood: insured.neighborhood,
			email: insured.email,
			phone: insured.phone,
			phone2: insured.phone2,
			comercial: insured.comercial,
			enrollment_date: DateUtils.convertToDate(insured.enrollment_date),
			renewal_date: DateUtils.convertToDate(insured.renewal_date),
			plan: insured.plan,
			proposal_type: insured.proposal_type,
			proposal_number: insured.proposal_number,
			proposal_currency: insured.proposal_currency,
			policy: insured.policy,
			mediator: insured.mediator,
			policy_number: insured.policy_number,
			payment_frequency: insured.payment_frequency,
			student: insured.student,
			relationship: insured.relationship,
			review: insured.review,
			insureds: insured.insureds,
			created_at: insured.created_at,
			user_id: insured.user_id,
			updated_at: DateUtils.convertToDate(insured.updated_at),
			user_id_update: insured.user_id_update
		} as any
	}
}
