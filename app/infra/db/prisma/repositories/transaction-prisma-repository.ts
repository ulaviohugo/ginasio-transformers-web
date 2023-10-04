import { TransactionRepository } from '@/data/protocols'
import { CashRegisterPrismaRepository, prismaService } from '@/infra/db'
import { TransactionModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaTransactionMapper } from '@/infra/db/prisma/mappers'
import { NumberUtils } from '@/utils'

export class TransactionPrismaRepository implements TransactionRepository {
	private prisma: PrismaClient

	constructor() {
		this.prisma = prismaService
	}

	async add(param: TransactionModel): Promise<TransactionModel> {
		const cashRegisterRepository = new CashRegisterPrismaRepository()
		let cashRegister = await cashRegisterRepository.load()
		if (!cashRegister) {
			cashRegister = await cashRegisterRepository.add({
				balance: 5000,
				initialBalance: 50001,
				createdById: param.createdById
			} as any)
		}
		const dbBalance = NumberUtils.convertToNumber(cashRegister.balance)
		const amount = NumberUtils.convertToNumber(param.amount)

		const balance =
			param.operationType == 'Entrada' ? dbBalance + amount : dbBalance - amount

		const transaction = (await this.prisma.transaction.create({
			data: PrismaTransactionMapper.toPrisma({
				...param,
				cashRegisterId: cashRegister.id,
				postMovementBalance: balance
			})
		})) as any

		await cashRegisterRepository.update({
			...cashRegister,
			balance
		})

		return {
			...transaction,
			cashRegister: {
				balance,
				initialBalance: NumberUtils.convertToNumber(cashRegister.initialBalance)
			}
		}
	}

	async loadAll(): Promise<TransactionModel[]> {
		return this.prisma.transaction.findMany() as any
	}

	async findById(id: number): Promise<TransactionModel | null> {
		return this.prisma.transaction.findUnique({
			where: { id }
		}) as any
	}

	async count(): Promise<number> {
		return this.prisma.transaction.count()
	}

	async update(param: TransactionModel): Promise<TransactionModel> {
		return this.prisma.transaction.update({
			data: PrismaTransactionMapper.toPrisma(param),
			where: { id: param.id }
		}) as any
	}

	async delete(transactionId: number): Promise<boolean> {
		const deletedTransaction = await this.prisma.transaction.delete({
			where: { id: transactionId }
		})
		return !!deletedTransaction
	}
}
