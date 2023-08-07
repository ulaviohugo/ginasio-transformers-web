import { Employee } from '@/app/domain/models'

export interface EmployeeRepository {
	add(param: Employee): Promise<Employee>
	findByEmail(email: string): Promise<Employee | null>
	findByDocument(documentType: string, documentNumber: string): Promise<Employee | null>
	findById(employeeId: number): Promise<Employee | null>
	loadAll(): Promise<Employee[]>
	update(param: Employee): Promise<Employee>
	delete(employeeId: number): Promise<boolean>
}
