import { Employee } from '@/app/business/domain/models'

export interface EmployeeRepository {
  add(param: Employee): Promise<Employee>
  findByEmail(email: string): Promise<Employee | null>
  loadAll(): Promise<Employee[]>
  delete(employeeId: number): Promise<boolean>
}
