import { Employee } from '@/app/business/domain/models'

export interface FindEmployeeByEmailRepository {
  findByEmail(email: string): Promise<FindEmployeeByEmailRepositoryResult>
}

export type FindEmployeeByEmailRepositoryResult = Employee | null
