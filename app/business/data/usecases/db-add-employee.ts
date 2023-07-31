import { AddEmployee, AddEmployeesResult } from '@/app/business/domain/usecases'
import { EmployeeRepository } from '../protocols'
import { Employee } from '../../domain/models'

export class DbAddEmployee implements AddEmployee {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  async add(param: Employee): Promise<AddEmployeesResult> {
    const exists = await this.employeeRepository.findByEmail(param.email)

    if (exists) return null as any

    const employee: Employee = {
      ...param,
      dateOfBirth: new Date(param.dateOfBirth),
      hireDate: new Date(param.hireDate),
      contractEndDate: param.contractEndDate
        ? new Date(param.contractEndDate)
        : param.dateOfBirth,
    }
    return this.employeeRepository.add(employee)
  }
}
