import { ConsultationModel } from './consultation'

export type InsuredModel = {
	id: number
	name: string
	policyholderId?: number
	gender: 'Masculino' | 'Feminino'
	maritalStatus?: string
	cardName?: string
	cardNumber?: string
	dateOfBirth: Date
	documentType: string
	documentNumber: string
	documentIssueDate?: Date
	nif?: string
	dependents?: number
	occupation?: string
	provinceId?: number
	municipalityId?: number
	address?: string
	neighborhood?: string
	email?: string
	phone?: string
	phone2?: string
	comercial?: string
	enrollmentDate?: Date
	renewalDate?: Date
	plan?: 'Empresarial' | 'Familiar' | 'Individual'
	proposalType?: 'Novo Co-Seguro' | 'Alteração do Plano'
	proposalNumber?: string
	proposalCurrency?: 'AOA'
	policy?: 'Cobre' | 'Prata' | 'Ouro'
	mediator?: string
	policyNumber?: string
	paymentFrequency?: 'Trimestral' | 'Semestral' | 'Anual'
	student?: 'SIM' | 'NÃO'
	relationship?: string
	review?: string
	createdAt?: Date
	createdById?: number
	updatedAt?: Date
	updatedById?: number

	policyholder?: InsuredModel
	insureds?: InsuredModel[]
	consultations?: ConsultationModel[]
}
