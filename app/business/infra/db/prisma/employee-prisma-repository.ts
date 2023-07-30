import {
  LoadEmployeeRepositoryResult,
  LoadEmployeeRepository,
  AddEmployeeRepository,
  FindEmployeeByEmailRepository,
  FindEmployeeByEmailRepositoryResult,
} from '@/app/business/data/protocols'
import { PrismaService } from '.'
import { Employee } from '@/app/business/domain/models'

export class EmployeePrismaRepository
  implements
    LoadEmployeeRepository,
    AddEmployeeRepository,
    FindEmployeeByEmailRepository
{
  private prisma: PrismaService
  constructor() {
    this.prisma = new PrismaService()
  }

  async add(param: Employee): Promise<Employee> {
    console.log('request', param)
    return (await this.prisma.employee.create({ data: param })) as Employee
  }

  async loadAll(): Promise<LoadEmployeeRepositoryResult> {
    return (await this.prisma.employee.findMany()) as LoadEmployeeRepositoryResult
  }

  async findByEmail(
    email: string
  ): Promise<FindEmployeeByEmailRepositoryResult> {
    return (await this.prisma.employee.findUnique({
      where: { email },
    })) as Employee
  }
}
