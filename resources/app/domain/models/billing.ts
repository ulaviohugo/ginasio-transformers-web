import { EmployeeModel, InsuredModel } from '.'

export type BillingModel = {
	id: number
	number: string
	created_at: Date
	consultation_service:
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
		unit_price: number
		discount: number
	}>
}
