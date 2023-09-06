import { DbAddEmployee } from '@/data/usecases'
import { BcryptAdapter } from '@/infra/cryptography'
import { EmployeePrismaRepository } from '@/infra/db'

export class EmployeeSeeder {
	static async run() {
		const dbAddEmployee = new DbAddEmployee(
			new EmployeePrismaRepository(),
			new BcryptAdapter()
		)
		const date = new Date()

		try {
			dbAddEmployee.add({
				id: undefined as any,
				name: 'Samuel Freitas',
				gender: 'Masculino',
				dateOfBirth: new Date('1992-05-08'),
				maritalStatus: 'Casado',
				documentType: 'BI',
				documentNumber: 'X',
				nif: 'x',
				socialSecurity: 'x',
				dependents: 1,
				educationDegree: 'Bacharel',
				phone1: '930690710',
				phone2: '951855037',
				email: 'samuelfreitas.ao@gmail.com',
				userName: 'samuelfreitas',
				password: '123456',
				canLogin: true,
				countryId: 1,
				provinceId: 1,
				residentialAddress: 'Rua Principal, 123',
				position: 'Desenvolvedor',
				baseSalary: 1980000,
				hireDate: date,
				contractEndDate: new Date(date.getTime() + 1000 * 86400 * 30 * 12), //1 year
				createdAt: date
			})
		} catch (error: any) {
			console.error(error.message)
		}
	}
}
