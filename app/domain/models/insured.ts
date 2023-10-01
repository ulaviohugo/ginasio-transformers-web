import { PaymentUtils } from '@/utils'

export type InsuredModel = {
	name: string
	gender: 'Masculino' | 'Feminino'
	maritalStatus: string
	cardName: string
	birthDate: Date
	documentNumber: string
	documentIssueDate: Date
	nif: string
	dependents: number
	occupation: string
	address: string
	neighborhood: string
	province: string
	municipality: string
	email: string
	phone: string
	phone2: string
	comercial: string
	enrollmentDate: Date
	lastAutoRenewDate: Date
	plan: 'Empresarial' | 'Familiar' | 'Individual'
	policy: 'Cobre' | 'Prata' | 'Ouro'
	paymentMethod: 'Dinheiro' | 'Multicaixa' | 'TPA' | 'Transferência Express'
	paymentFrequency: 'Trimestral' | 'Semestral' | 'Anual'
}
