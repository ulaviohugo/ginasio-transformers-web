import { EmployeePresenceRepository } from '@/data/protocols'
import { prismaService } from '@/infra/db'
import { EmployeePresenceModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'

export class EmployeePresencePrismaRepository implements EmployeePresenceRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: EmployeePresenceModel): Promise<EmployeePresenceModel> {
		return (await this.prisma.employee.create({
			data: param as any
		})) as any
	}

	async loadAll(): Promise<EmployeePresenceModel[]> {
		return (await this.prisma.employee.findMany()) as any
	}

	async findById(id: number): Promise<EmployeePresenceModel | null> {
		return (await this.prisma.employee.findUnique({
			where: { id }
		})) as any
	}

	async count(): Promise<number> {
		return this.prisma.employee.count()
	}

	async update(param: EmployeePresenceModel): Promise<EmployeePresenceModel> {
		return (await this.prisma.employee.update({
			data: param,
			where: { id: param.id }
		})) as any
	}

	async delete(employeeId: number): Promise<boolean> {
		const deletedEmployeePresence = await this.prisma.employee.delete({
			where: { id: employeeId }
		})
		return !!deletedEmployeePresence
	}
}
