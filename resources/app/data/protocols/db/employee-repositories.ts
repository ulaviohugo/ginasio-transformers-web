import { EmployeeModel } from '@/domain/models'

export interface EmployeeRepository {
	add(param: EmployeeModel): Promise<EmployeeModel>
	findByEmail(email: string): Promise<EmployeeModel | null>
	findByDocument(
		document_type: string,
		document_number: string
	): Promise<EmployeeModel | null>
	findById(employee_id: number): Promise<EmployeeModel | null>
	loadAll(): Promise<EmployeeModel[]>
	update(param: EmployeeModel): Promise<EmployeeModel>
	delete(employee_id: number): Promise<boolean>
	count(): Promise<number>
}
