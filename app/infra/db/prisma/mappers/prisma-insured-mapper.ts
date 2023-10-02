import { Insured as InsuredRaw } from '@prisma/client'

import { InsuredModel } from '@/domain/models'

export class PrismaInsuredMapper {
	static toPrisma(insured: InsuredModel): InsuredRaw {
		if (!insured) return null as any
		return {
			id: insured.id,
			name: insured.name,
			policyholder: insured.policyholder,
			gender: insured.gender,
			maritalStatus: insured.maritalStatus,
			cardName: insured.cardName,
			cardNumber: insured.cardNumber,
			dateOfBirth: insured.dateOfBirth,
			documentType: insured.documentType,
			documentNumber: insured.documentNumber,
			documentIssueDate: insured.documentIssueDate,
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
			enrollmentDate: insured.enrollmentDate,
			renewalDate: insured.renewalDate,
			plan: insured.plan,
			proposalType: insured.proposalType,
			proposalNumber: insured.proposalNumber,
			proposalCurrency: insured.proposalCurrency,
			policy: insured.policy,
			mediator: insured.mediator,
			policyNumber: insured.policyNumber,
			typeOfInsurance: insured.typeOfInsurance,
			copaymentAmount: insured.copaymentAmount,
			paymentMethod: insured.paymentMethod,
			paymentFrequency: insured.paymentFrequency,
			student: insured.student,
			relationship: insured.relationship,
			review: insured.review,

			createdAt: insured.createdAt,
			createdById: insured.createdById,
			updatedAt: insured.updatedAt,
			updatedById: insured.updatedById
		} as any
	}
}
