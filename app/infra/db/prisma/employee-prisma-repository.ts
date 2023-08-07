import { EmployeeRepository } from '@/app/data/protocols'
import { prismaService } from '.'
import { Employee } from '@/app/domain/models'
import { PrismaClient } from '@prisma/client'

export class EmployeePrismaRepository implements EmployeeRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: Employee): Promise<Employee> {
		return (await this.prisma.employee.create({ data: param })) as Employee
	}

	async loadAll(): Promise<Employee[]> {
		return (await this.prisma.employee.findMany()) as Employee[]
	}

	async findById(id: number): Promise<Employee | null> {
		return (await this.prisma.employee.findUnique({
			where: { id }
		})) as Employee
	}

	async findByEmail(email: string): Promise<Employee | null> {
		return (await this.prisma.employee.findUnique({
			where: { email }
		})) as Employee
	}

	async findByDocument(
		documentType: string,
		documentNumber: string
	): Promise<Employee | null> {
		return (await this.prisma.employee.findFirst({
			where: { documentType, documentNumber }
		})) as Employee
	}

	async update(param: Employee): Promise<Employee> {
		return (await this.prisma.employee.update({
			data: param,
			where: { id: param.id }
		})) as Employee
	}

	async delete(employeeId: number): Promise<boolean> {
		const deletedEmployee = await this.prisma.employee.delete({
			where: { id: employeeId }
		})
		return !!deletedEmployee
	}
}
