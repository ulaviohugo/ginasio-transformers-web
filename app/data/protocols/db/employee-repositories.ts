import { EmployeeModel } from '@/app/domain/models'

export interface EmployeeRepository {
	add(param: EmployeeModel): Promise<EmployeeModel>
	findByEmail(email: string): Promise<EmployeeModel | null>
	findByDocument(
		documentType: string,
		documentNumber: string
	): Promise<EmployeeModel | null>
	findById(employeeId: number): Promise<EmployeeModel | null>
	loadAll(): Promise<EmployeeModel[]>
	update(param: EmployeeModel): Promise<EmployeeModel>
	delete(employeeId: number): Promise<boolean>
	count(): Promise<number>
}
