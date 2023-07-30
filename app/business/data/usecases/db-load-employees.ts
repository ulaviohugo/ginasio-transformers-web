import {
  LoadEmployees,
  LoadEmployeesResult,
} from '@/app/business/domain/usecases'
import { EmployeeRepository } from '../protocols'

export class DbLoadEmployees implements LoadEmployees {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  async load(): Promise<LoadEmployeesResult> {
    return this.employeeRepository.loadAll()
  }
}
