import { DbAddEmployee } from '@/app/business/data/usecases'
import { EmployeePrismaRepository } from '@/app/business/infra/db'

export const makeAddEmployee = () => {
  return new DbAddEmployee(new EmployeePrismaRepository())
}
