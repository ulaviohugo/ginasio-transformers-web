import { QueryParams, ProductSaleRepository } from '@/data/protocols'
import { prismaService } from '@/infra/db'
import { ProductSaleModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaFilterMapper, PrismaProductSaleMapper } from '@/infra/db/prisma/mappers'

export class ProductSalePrismaRepository implements ProductSaleRepository {
	private prisma: PrismaClient
	private include = {
		employee: {
			select: {
				id: true,
				name: true
			}
		},
		customer: {
			select: {
				id: true,
				name: true
			}
		}
	}
	constructor() {
		this.prisma = prismaService
	}

	async add(param: ProductSaleModel): Promise<ProductSaleModel> {
		const createdProductSale = (await this.prisma.sale.create({
			data: PrismaProductSaleMapper.toPrisma(param) as any,
			include: this.include
		})) as any
		return createdProductSale
	}

	async loadAll(
		queryParams?: QueryParams<ProductSaleModel>
	): Promise<ProductSaleModel[]> {
		const filter = queryParams
			? PrismaFilterMapper.toWhere(queryParams.filter)
			: undefined
		console.log({ filter })

		return (await this.prisma.sale.findMany({
			where: filter,
			include: this.include
		})) as any
	}

	async findById(id: number): Promise<ProductSaleModel | null> {
		return (await this.prisma.sale.findUnique({
			where: { id },
			include: this.include
		})) as any
	}

	async find(
		queryParams?: QueryParams<ProductSaleModel>
	): Promise<ProductSaleModel | null> {
		return (await this.prisma.sale.findUnique({
			where: queryParams?.filter as any,
			include: this.include
		})) as any
	}

	async count(): Promise<number> {
		return this.prisma.sale.count()
	}

	async update(param: ProductSaleModel): Promise<ProductSaleModel> {
		return (await this.prisma.sale.update({
			data: PrismaProductSaleMapper.toPrisma(param),
			where: { id: param.id },
			include: this.include
		})) as any
	}

	async delete(id: number): Promise<boolean> {
		const deletedProductSale = await this.prisma.sale.delete({
			where: { id }
		})
		return !!deletedProductSale
	}
}
