import { BillingModel } from '@/domain/models'
import { mockEmployee, mockInsured } from '.'

export const mockBilling = (): BillingModel => {
	return {
		id: 1,
		number: '0101/2019',
		insured: mockInsured(),
		employee: mockEmployee(),
		created_at: new Date(),
		consultation_service: 'Consulta de Ginecologia',
		consultationType: 'Marcação',
		socialCoInsurance: 'NÃO',
		services: [
			{ description: 'Exame urina', quantity: 1, unit_price: 5000, discount: 1000 },
			{ description: 'Exame vidal', quantity: 1, unit_price: 5200, discount: 850 },
			{ description: 'Exame Raio-x', quantity: 1, unit_price: 10000, discount: 0 }
		]
	}
}
