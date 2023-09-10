import { EmployeeModel } from '@/domain/models'

export class EmployeeViewModel {
	static toHTTP(employee: EmployeeModel) {
		const photo = employee.photo && `/api${employee.photo}`
		return { ...employee, photo, password: undefined } as EmployeeModel
	}
}
