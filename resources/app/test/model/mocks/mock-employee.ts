import { EmployeeModel } from '@/domain/models'

export const mockEmployee = (): EmployeeModel => {
	const currentDate = new Date()

	return {
		name: 'Samuel Freitas',
		gender: 'Masculino',
		maritalStatus: 'Casado (a)',
		dependents: 1,
		dateOfBirth: currentDate,
		documentNumber: '001322548LA035',
		nif: '001322548LA035',
		residentialAddress: 'Coreia',
		email: 'joel@gmail.com',
		phone: '930690710',
		phone2: '990690710'
	} as EmployeeModel
}
