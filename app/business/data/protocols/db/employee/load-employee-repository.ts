import { Employee } from "@/app/business/domain/models"

export interface LoadEmployeeRepository {
  loadAll(): Promise<LoadEmployeeRepositoryResult>
}

export type LoadEmployeeRepositoryResult = Employee[]
