import { EmployeeRepository } from '@/data/protocols'
import { prismaService } from '@/infra/db'
import { EmployeeModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaEmployeeMapper } from '@/infra/db/prisma/mappers'

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
		document_type: string,
		document_number: string
	): Promise<EmployeeModel | null> {
		return (await this.prisma.employee.findFirst({
			where: { document_type, document_number }
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

	async delete(employee_id: number): Promise<boolean> {
		const deletedEmployee = await this.prisma.employee.delete({
			where: { id: employee_id }
		})
		return !!deletedEmployee
	}
}
