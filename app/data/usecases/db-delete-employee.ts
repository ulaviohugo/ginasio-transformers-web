import { DeleteEmployee } from '@/app/domain/usecases'
import { EmployeeRepository } from '../protocols'

export class DbDeleteEmployee implements DeleteEmployee {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async delete(employeeId: number): Promise<boolean> {
    const exists = await this.employeeRepository.findById(employeeId)

    if (!exists) return null as any

    return this.employeeRepository.delete(employeeId)
  }
}
