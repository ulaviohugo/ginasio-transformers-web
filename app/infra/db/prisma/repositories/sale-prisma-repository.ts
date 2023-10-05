import { QueryParams, SaleRepository } from '@/data/protocols'
import { TransactionPrismaRepository, prismaService } from '@/infra/db'
import { SaleModel, TransactionModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import {
	PrismaFilterMapper,
	PrismaProductSaleMapper,
	PrismaSaleMapper
} from '@/infra/db/prisma/mappers'

export class SalePrismaRepository implements SaleRepository {
	private prisma: PrismaClient
	private include = {
		employee: {
			select: {
				id: true,
				name: true
			}
		},
		productSales: true
	}
	constructor() {
		this.prisma = prismaService
	}

	async add(param: SaleModel): Promise<SaleModel> {
		const { productSales, ...sale } = param

		const createdSale = (await this.prisma.sale.create({
			data: PrismaSaleMapper.toPrisma(sale as SaleModel),
			include: this.include
		})) as any

		await this.prisma.productSale.createMany({
			data: productSales.map((item) =>
				PrismaProductSaleMapper.toPrisma({ ...item, saleId: createdSale.id })
			)
		})

		//Perform transaction
		const transactionRepository = new TransactionPrismaRepository()
		await transactionRepository.add({
			date: new Date(),
			paymentMethod: param.paymentMethod,
			description: `Venda de ${productSales.length} produto(s)`,
			amount: param.amountPaid,
			operationType: 'Entrada',
			createdById: param.createdById
		} as TransactionModel)

		return createdSale
	}

	async loadAll(queryParams?: QueryParams<SaleModel>): Promise<SaleModel[]> {
		const filter = queryParams
			? PrismaFilterMapper.toWhere(queryParams.filter)
			: undefined
		console.log({ filter })

		return (await this.prisma.sale.findMany({
			where: filter,
			include: this.include
		})) as any
	}

	async find(queryParams: QueryParams<SaleModel>): Promise<SaleModel | null> {
		return (await this.prisma.sale.findFirst({
			where: queryParams.filter as any,
			include: this.include
		})) as any
	}
	async findById(id: number): Promise<SaleModel | null> {
		return (await this.prisma.sale.findUnique({
			where: { id },
			include: this.include
		})) as any
	}

	async count(): Promise<number> {
		return this.prisma.sale.count()
	}

	async update(param: SaleModel): Promise<SaleModel> {
		return (await this.prisma.sale.update({
			data: PrismaSaleMapper.toPrisma(param),
			where: { id: param.id },
			include: this.include
		})) as any
	}

	async delete(id: number): Promise<boolean> {
		const deletedSale = await this.prisma.sale.delete({
			where: { id }
		})
		return !!deletedSale
	}
}
