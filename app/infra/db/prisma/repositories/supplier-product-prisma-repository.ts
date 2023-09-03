import {
	SupplierProductFindDuplicatedParam,
	SupplierProductRepository
} from '@/app/data/protocols'
import { prismaService } from '..'
import { SupplierProductModel } from '@/app/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaSupplierProductMapper } from '../mappers'

export class SupplierProductPrismaRepository implements SupplierProductRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: SupplierProductModel): Promise<SupplierProductModel> {
		const createdSupplierProduct = (await this.prisma.supplierProduct.create({
			data: PrismaSupplierProductMapper.toPrisma(param)
		})) as SupplierProductModel

		return createdSupplierProduct
	}

	async loadAll(): Promise<SupplierProductModel[]> {
		return (await this.prisma.supplierProduct.findMany()) as SupplierProductModel[]
	}

	async findById(id: number): Promise<SupplierProductModel | null> {
		return (await this.prisma.supplierProduct.findUnique({
			where: { id }
		})) as SupplierProductModel
	}

	async findDuplicated({
		supplierId,
		categoryId,
		productId
	}: SupplierProductFindDuplicatedParam): Promise<SupplierProductModel | null> {
		return this.prisma.supplierProduct.findFirst({
			where: {
				supplierId,
				categoryId,
				productId
			}
		}) as any
	}

	async count(): Promise<number> {
		return this.prisma.supplierProduct.count()
	}

	async update(param: SupplierProductModel): Promise<SupplierProductModel> {
		const updatedSupplierProduct = (await this.prisma.supplierProduct.update({
			data: PrismaSupplierProductMapper.toPrisma(param),
			where: { id: param.id }
		})) as SupplierProductModel

		return updatedSupplierProduct
	}

	async addOrUpdate(param: SupplierProductModel): Promise<SupplierProductModel> {
		const { supplierId, productId, categoryId } = param

		const foundSupplierProduct = await this.findDuplicated({
			supplierId,
			productId,
			categoryId
		})

		let data
		if (foundSupplierProduct) {
			data = await this.update({
				...param,
				id: foundSupplierProduct.id,
				createdById: undefined,
				updatedAt: new Date()
			})
		} else {
			data = await this.add({ ...param, updatedById: undefined })
		}
		return data
	}

	async delete(id: number): Promise<boolean> {
		const deletedSupplierProduct = await this.prisma.supplierProduct.delete({
			where: { id }
		})
		return !!deletedSupplierProduct
	}
}
