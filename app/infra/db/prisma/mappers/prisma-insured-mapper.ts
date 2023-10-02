import { Insured as InsuredRaw } from '@prisma/client'

import { InsuredModel } from '@/domain/models'
import { DateUtils, NumberUtils } from '@/utils'

export class PrismaInsuredMapper {
	static toPrisma(insured: InsuredModel): InsuredRaw {
		if (!insured) return null as any
		return {
			id: insured.id,
			name: insured.name,
			policyholderId: NumberUtils.convertToNumber(insured.policyholderId, true),
			gender: insured.gender,
			maritalStatus: insured.maritalStatus,
			cardName: insured.cardName,
			cardNumber: insured.cardNumber,
			dateOfBirth: DateUtils.convertToDate(insured.dateOfBirth),
			documentType: insured.documentType,
			documentNumber: insured.documentNumber,
			documentIssueDate: DateUtils.convertToDate(insured.documentIssueDate),
			nif: insured.nif,
			dependents: insured.dependents,
			occupation: insured.occupation,
			provinceId: insured.provinceId,
			municipalityId: insured.municipalityId,
			address: insured.address,
			neighborhood: insured.neighborhood,
			email: insured.email,
			phone: insured.phone,
			phone2: insured.phone2,
			comercial: insured.comercial,
			enrollmentDate: DateUtils.convertToDate(insured.enrollmentDate),
			renewalDate: DateUtils.convertToDate(insured.renewalDate),
			plan: insured.plan,
			proposalType: insured.proposalType,
			proposalNumber: insured.proposalNumber,
			proposalCurrency: insured.proposalCurrency,
			policy: insured.policy,
			mediator: insured.mediator,
			policyNumber: insured.policyNumber,
			paymentFrequency: insured.paymentFrequency,
			student: insured.student,
			relationship: insured.relationship,
			review: insured.review,
			insureds: insured.insureds,
			createdAt: insured.createdAt,
			createdById: insured.createdById,
			updatedAt: DateUtils.convertToDate(insured.updatedAt),
			updatedById: insured.updatedById
		} as any
	}
}
