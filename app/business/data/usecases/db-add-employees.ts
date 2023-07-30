import {
  AddEmployees,
  AddEmployeesResult,
} from '@/app/business/domain/usecases'
import {
  AddEmployeeRepository,
  FindEmployeeByEmailRepository,
} from '../protocols'
import { Employee } from '../../domain/models'

export class DbAddEmployee implements AddEmployees {
  constructor(
    private readonly AddEmployeeRepository: AddEmployeeRepository,
    private findEmployeeByEmailRepository: FindEmployeeByEmailRepository
  ) {}
  async add(param: Employee): Promise<AddEmployeesResult> {
    const exists = await this.findEmployeeByEmailRepository.findByEmail(
      param.email
    )

    if (exists) return null as any

    const employee: Employee = {
      ...param,
      hireDate: new Date(param.dateOfBirth),
      dateOfBirth: new Date(param.dateOfBirth),
      contractEndDate: param.dateOfBirth
        ? new Date(param.dateOfBirth)
        : param.dateOfBirth,
    }

    return this.AddEmployeeRepository.add(employee)
  }
}
