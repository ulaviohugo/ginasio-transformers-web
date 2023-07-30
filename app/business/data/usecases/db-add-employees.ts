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
      dateOfBirth: new Date(param.dateOfBirth),
      hireDate: new Date(param.hireDate),
      contractEndDate: param.contractEndDate
        ? new Date(param.contractEndDate)
        : param.dateOfBirth,
    }

    return this.AddEmployeeRepository.add(employee)
  }
}
