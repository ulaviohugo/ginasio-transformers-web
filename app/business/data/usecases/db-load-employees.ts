import {
  LoadEmployees,
  LoadEmployeesResult,
} from '@/app/business/domain/usecases'
import { LoadEmployeeRepository } from '../protocols'

export class DbLoadEmployees implements LoadEmployees {
  constructor(
    private readonly loadEmployeeRepository: LoadEmployeeRepository
  ) {}
  async load(): Promise<LoadEmployeesResult> {
    return this.loadEmployeeRepository.loadAll()
  }
}
