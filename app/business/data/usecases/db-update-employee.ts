import { UpdateEmployee } from '@/app/business/domain/usecases'
import { EmployeeRepository } from '../protocols'
import { Employee } from '../../domain/models'

export class DbUpdateEmployee implements UpdateEmployee {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async update(param: Employee): Promise<Employee | 'notFound' | 'emailInUse'> {
    const foundById = await this.employeeRepository.findById(param.id)

    if (!foundById) return 'notFound'

    const exists = await this.employeeRepository.findByEmail(param.email)
    if (exists && exists.id !== param.id) return 'emailInUse'

    const employee: Employee = {
      ...param,
      dateOfBirth: new Date(param.dateOfBirth),
      hireDate: new Date(param.hireDate),
      contractEndDate: param.contractEndDate
        ? new Date(param.contractEndDate)
        : param.dateOfBirth,
    }
    return this.employeeRepository.update(employee)
  }
}
