import { CashRegisterRepository } from '@/data/protocols'
import { prismaService } from '@/infra/db'
import { CashRegisterModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaCashRegisterMapper } from '@/infra/db/prisma/mappers'

export class CashRegisterPrismaRepository implements CashRegisterRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: CashRegisterModel): Promise<CashRegisterModel> {
		return (await this.prisma.cashRegister.create({
			data: PrismaCashRegisterMapper.toPrisma(param)
		})) as any
	}

	async load(): Promise<CashRegisterModel> {
		return (await this.prisma.cashRegister.findFirst()) as any
	}

	async update(param: CashRegisterModel): Promise<CashRegisterModel> {
		return (await this.prisma.cashRegister.update({
			data: PrismaCashRegisterMapper.toPrisma(param),
			where: { id: param.id }
		})) as any
	}
}
