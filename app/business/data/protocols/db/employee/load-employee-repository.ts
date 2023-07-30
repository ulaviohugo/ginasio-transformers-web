import { Employee } from "@/app/business/domain/models"

export interface LoadEmployeeRepository {
  loadAll(): Promise<GetEmployeeRepositoryResult>
}

export type GetEmployeeRepositoryResult = Employee[]
