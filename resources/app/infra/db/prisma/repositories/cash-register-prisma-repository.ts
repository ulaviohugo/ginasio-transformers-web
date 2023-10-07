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

	async load(accountId?: number): Promise<CashRegisterModel> {
		let cashRegister = (await this.prisma.cashRegister.findFirst()) as any
		if (!cashRegister) {
			cashRegister = await this.add({
				balance: 5000,
				initial_balance: 50001,
				user_id: accountId
			} as any)
		}
		return cashRegister
	}

	async update(param: CashRegisterModel): Promise<CashRegisterModel> {
		return (await this.prisma.cashRegister.update({
			data: PrismaCashRegisterMapper.toPrisma(param),
			where: { id: param.id }
		})) as any
	}
}
