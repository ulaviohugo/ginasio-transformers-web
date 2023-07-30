import { EmployeeRepository } from '@/app/business/data/protocols'
import { PrismaService } from '.'
import { Employee } from '@/app/business/domain/models'

export class EmployeePrismaRepository implements EmployeeRepository {
  private prisma: PrismaService
  constructor() {
    this.prisma = new PrismaService()
  }

  async add(param: Employee): Promise<Employee> {
    console.log('request', param)
    return (await this.prisma.employee.create({ data: param })) as Employee
  }

  async loadAll(): Promise<Employee[]> {
    return (await this.prisma.employee.findMany()) as Employee[]
  }

  async findByEmail(email: string): Promise<Employee | null> {
    return (await this.prisma.employee.findUnique({
      where: { email },
    })) as Employee
  }
}
