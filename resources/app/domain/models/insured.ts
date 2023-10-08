import { EmployeeModel } from '.'
import { ConsultationModel } from './consultation'

export type InsuredModel = {
	id: number
	name: string
	policyholder_id?: number
	gender: 'Masculino' | 'Feminino'
	marital_status?: string
	card_name?: string
	card_number?: string
	date_of_birth: Date
	document_type: string
	document_number: string
	document_issue_date?: Date
	nif?: string
	dependents?: number
	occupation?: string
	province_id?: number
	municipality_id?: number
	address?: string
	neighborhood?: string
	email?: string
	phone?: string
	phone2?: string
	comercial?: string
	enrollment_date?: Date
	renewal_date?: Date
	plan?: 'Empresarial' | 'Familiar' | 'Individual'
	proposal_type?: 'Novo Co-Seguro' | 'Alteração do Plano'
	proposal_number?: string
	proposal_currency?: 'AOA'
	policy?: 'Cobre' | 'Prata' | 'Ouro'
	mediator?: string
	policy_number?: string
	payment_frequency?: 'Trimestral' | 'Semestral' | 'Anual'
	student?: 'SIM' | 'NÃO'
	relationship?: string
	review?: string
	payment_method?: string
	created_at?: Date
	user_id?: number
	updated_at?: Date
	user_id_update?: number
	copayment_amount?: number

	user?: EmployeeModel
	province?: string
	municipality?: string
	policyholder?: InsuredModel
	insureds?: InsuredModel[]
	consultations?: ConsultationModel[]
}
