import { Employee } from '@/app/business/domain/models'

export interface AddEmployeeRepository {
  add(param: Employee): Promise<AddEmployeeRepositoryResult>
}

export type AddEmployeeRepositoryResult = Employee
