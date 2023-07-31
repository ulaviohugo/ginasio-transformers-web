import { DeleteEmployee } from '@/app/business/domain/usecases'
import { EmployeeRepository } from '../protocols'

export class DbDeleteEmployee implements DeleteEmployee {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async delete(employeeId: number): Promise<boolean> {
    return this.employeeRepository.delete(employeeId)
  }
}
