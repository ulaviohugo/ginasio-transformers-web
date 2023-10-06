import { EmployeeModel, InsuredModel } from '.'

export type BillingModel = {
	id: number
	number: string
	createdAt: Date
	consultationService:
		| 'Consulta de Ginecologia'
		| 'Consulta Geral'
		| 'Consulta de Rotina'
		| 'Consulta de Pediatria'
	consultationType: 'Marcação' | 'Emergência'
	socialCoInsurance: 'SIM' | 'NÃO'

	insured: InsuredModel
	employee: EmployeeModel
	services: Array<{
		quantity: number
		description: string
		unitPrice: number
		discount: number
	}>
}
