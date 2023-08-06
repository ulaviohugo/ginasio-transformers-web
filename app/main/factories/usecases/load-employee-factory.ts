import { DbLoadEmployees } from '@/app/data/usecases'
import { EmployeePrismaRepository } from '@/app/infra/db'

export const makeLoadEmployee = () => {
  return new DbLoadEmployees(new EmployeePrismaRepository())
}
