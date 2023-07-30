import {
  LoadEmployeeRepositoryResult,
  LoadEmployeeRepository,
  AddEmployeeRepository,
} from '@/app/business/data/protocols'
import { PrismaService } from '.'
import { Employee } from '@/app/business/domain/models'

export class EmployeePrismaRepository
  implements LoadEmployeeRepository, AddEmployeeRepository
{
  private prisma: PrismaService
  constructor() {
    this.prisma = new PrismaService()
  }

  async add(param: Employee): Promise<Employee> {
    return (await this.prisma.employee.create({ data: param })) as Employee
  }

  async loadAll(): Promise<LoadEmployeeRepositoryResult> {
    return (await this.prisma.employee.findMany()) as LoadEmployeeRepositoryResult
  }
}
