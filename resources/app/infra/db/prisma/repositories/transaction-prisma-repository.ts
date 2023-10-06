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
		const cashRegister = await cashRegisterRepository.load(param.createdById)

		const dbBalance = NumberUtils.convertToNumber(cashRegister.balance)
		const amount = NumberUtils.convertToNumber(param.amount)
		const balance =
			param.operationType == 'Entrada' ? dbBalance + amount : dbBalance - amount

		//Perform transaction
		const transaction = (await this.prisma.transaction.create({
			data: PrismaTransactionMapper.toPrisma({
				...param,
				cashRegisterId: cashRegister.id,
				postMovementBalance: balance
			})
		})) as any

		//Perform decrement/increment on cash register balance
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
