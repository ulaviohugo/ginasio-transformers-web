import {
  LoadEmployeeRepositoryResult,
  LoadEmployeeRepository,
} from '@/app/business/data/protocols'
import { PrismaService } from '.'

export class EmployeePrismaRepository implements LoadEmployeeRepository {
  private prisma: PrismaService
  constructor() {
    this.prisma = new PrismaService()
  }

  async loadAll(): Promise<LoadEmployeeRepositoryResult> {
    return (await this.prisma.employee.findMany()) as LoadEmployeeRepositoryResult
  }
}
