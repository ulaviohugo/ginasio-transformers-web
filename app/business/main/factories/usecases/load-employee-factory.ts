import { DbLoadEmployees } from '@/app/business/data/usecases'
import { EmployeePrismaRepository } from '@/app/business/infra/db'

export const makeLoadEmployee = () => {
  return new DbLoadEmployees(new EmployeePrismaRepository())
}
