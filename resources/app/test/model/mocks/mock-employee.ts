import { EmployeeModel } from '@/domain/models'

export const mockEmployee = (): EmployeeModel => {
	const currentDate = new Date()

	return {
		name: 'Samuel Freitas',
		gender: 'Masculino',
		marital_status: 'Casado (a)',
		dependents: 1,
		date_of_birth: currentDate,
		document_number: '001322548LA035',
		nif: '001322548LA035',
		address: 'Coreia',
		email: 'joel@gmail.com',
		phone: '930690710',
		phone2: '990690710'
	} as EmployeeModel
}
