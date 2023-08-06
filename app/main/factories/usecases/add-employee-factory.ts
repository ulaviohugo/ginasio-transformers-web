import { DbAddEmployee } from '@/app/data/usecases'
import { EmployeePrismaRepository } from '@/app/infra/db'

export const makeAddEmployee = () => {
  return new DbAddEmployee(new EmployeePrismaRepository())
}
