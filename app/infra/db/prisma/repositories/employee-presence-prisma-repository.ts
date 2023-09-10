import {
	EmployeePresenceRepository,
	EmployeePresenceRepositoryFindProps
} from '@/data/protocols'
import { prismaService } from '@/infra/db'
import { EmployeePresenceModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaEmployeePresenceMapper } from '../mappers'

export class EmployeePresencePrismaRepository implements EmployeePresenceRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: EmployeePresenceModel): Promise<EmployeePresenceModel> {
		return (await this.prisma.employeePresence.create({
			data: PrismaEmployeePresenceMapper.toPrisma(param),
			include: { employee: { select: { id: true, name: true } } }
		})) as any
	}

	async loadAll(): Promise<EmployeePresenceModel[]> {
		return (await this.prisma.employeePresence.findMany({
			include: { employee: { select: { id: true, name: true } } }
		})) as any
	}

	async find(
		param: EmployeePresenceRepositoryFindProps
	): Promise<EmployeePresenceModel | null> {
		return (await this.prisma.employeePresence.findFirst({
			where: param,
			include: { employee: { select: { id: true, name: true } } }
		})) as any
	}

	async count(): Promise<number> {
		return this.prisma.employeePresence.count()
	}

	async update(param: EmployeePresenceModel): Promise<EmployeePresenceModel> {
		return (await this.prisma.employeePresence.update({
			data: PrismaEmployeePresenceMapper.toPrisma(param),
			where: { id: param.id },
			include: { employee: { select: { id: true, name: true } } }
		})) as any
	}

	async delete(employeePresenceId: number): Promise<boolean> {
		const deletedEmployeePresence = await this.prisma.employeePresence.delete({
			where: { id: employeePresenceId }
		})
		return !!deletedEmployeePresence
	}
}
