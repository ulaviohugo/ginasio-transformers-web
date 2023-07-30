import { DbAddEmployee } from '@/app/business/data/usecases'
import { EmployeePrismaRepository } from '@/app/business/infra/db'

export const makeAddEmployee = () => {
  const employeeRepository = new EmployeePrismaRepository()
  return new DbAddEmployee(employeeRepository, employeeRepository)
}
