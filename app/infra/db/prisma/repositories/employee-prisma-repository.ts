import { EmployeeRepository } from '@/app/data/protocols'
import { prismaService } from '..'
import { EmployeeModel } from '@/app/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaEmployeeMapper } from '../mappers'

export class EmployeePrismaRepository implements EmployeeRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: EmployeeModel): Promise<EmployeeModel> {
		return (await this.prisma.employee.create({
			data: PrismaEmployeeMapper.toPrisma(param)
		})) as EmployeeModel
	}

	async loadAll(): Promise<EmployeeModel[]> {
		return (await this.prisma.employee.findMany()) as EmployeeModel[]
	}

	async findById(id: number): Promise<EmployeeModel | null> {
		return (await this.prisma.employee.findUnique({
			where: { id }
		})) as EmployeeModel
	}

	async findByEmail(email: string): Promise<EmployeeModel | null> {
		return (await this.prisma.employee.findUnique({
			where: { email }
		})) as EmployeeModel
	}

	async findByDocument(
		documentType: string,
		documentNumber: string
	): Promise<EmployeeModel | null> {
		return (await this.prisma.employee.findFirst({
			where: { documentType, documentNumber }
		})) as EmployeeModel
	}

	async count(): Promise<number> {
		return this.prisma.employee.count()
	}

	async update(param: EmployeeModel): Promise<EmployeeModel> {
		return (await this.prisma.employee.update({
			data: PrismaEmployeeMapper.toPrisma(param),
			where: { id: param.id }
		})) as EmployeeModel
	}

	async delete(employeeId: number): Promise<boolean> {
		const deletedEmployee = await this.prisma.employee.delete({
			where: { id: employeeId }
		})
		return !!deletedEmployee
	}
}
