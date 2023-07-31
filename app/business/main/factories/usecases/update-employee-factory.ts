import { DbUpdateEmployee } from '@/app/business/data/usecases'
import { EmployeePrismaRepository } from '@/app/business/infra/db'

export const makeUpdateEmployee = () => {
  return new DbUpdateEmployee(new EmployeePrismaRepository())
}
