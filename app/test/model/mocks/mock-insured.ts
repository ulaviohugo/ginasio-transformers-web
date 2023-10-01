import { InsuredModel } from '@/domain/models'

export const mockInsured = (): InsuredModel => {
	const currentDate = new Date()

	return {
		name: 'Josué Agostinho Cabral Simões',
		gender: 'Masculino',
		maritalStatus: 'Solteiro (a)',
		occupation: 'Engenheiro Informático',
		dependents: 4,
		cardName: 'Josué Simões',
		birthDate: currentDate,
		documentNumber: '001322548LA035',
		documentIssueDate: currentDate,
		nif: '001322548LA035',
		address: 'Coreia',
		neighborhood: 'Ingombotas',
		province: 'Luanda',
		municipality: 'Luanda',
		email: 'joel@gmail.com',
		phone: '930690710',
		phone2: '990690710',
		comercial: 'Paulo Vieira',
		enrollmentDate: currentDate,
		lastAutoRenewDate: currentDate,
		plan: 'Empresarial',
		policy: 'Ouro',
		paymentFrequency: 'Semestral',
		paymentMethod: 'TPA'
	}
}
