import { TransactionRepository } from '@/data/protocols'
import { CashRegisterPrismaRepository, prismaService } from '@/infra/db'
import { TransactionModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaTransactionMapper } from '@/infra/db/prisma/mappers'

export class TransactionPrismaRepository implements TransactionRepository {
	private prisma: PrismaClient

	constructor() {
		this.prisma = prismaService
	}

	async add(param: TransactionModel): Promise<TransactionModel> {
		let cashRegisterId = param.cashRegisterId
		const cashRegisterRepository = new CashRegisterPrismaRepository()
		let cashRegister = await cashRegisterRepository.load()
		if (!cashRegister) {
			cashRegister = await cashRegisterRepository.add({
				balance: 5000,
				initialBalance: 50001,
				createdById: param.createdById
			} as any)
			cashRegisterId = cashRegister.id
		}
		const transaction = (await this.prisma.transaction.create({
			data: PrismaTransactionMapper.toPrisma({ ...param, cashRegisterId })
		})) as any
		return transaction
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
