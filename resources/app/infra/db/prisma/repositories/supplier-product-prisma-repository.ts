import {
	SupplierProductFindDuplicatedParam,
	SupplierProductRepository
} from '@/data/protocols'
import { prismaService } from '@/infra/db'
import { SupplierProductModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaSupplierProductMapper } from '@/infra/db/prisma/mappers'

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
		supplier_id,
		category_id,
		product_id
	}: SupplierProductFindDuplicatedParam): Promise<SupplierProductModel | null> {
		return this.prisma.supplierProduct.findFirst({
			where: {
				supplier_id,
				category_id,
				product_id
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
		const { supplier_id, product_id, category_id } = param

		const foundSupplierProduct = await this.findDuplicated({
			supplier_id,
			product_id,
			category_id
		})

		let data
		if (foundSupplierProduct) {
			data = await this.update({
				...param,
				id: foundSupplierProduct.id,
				user_id: undefined,
				updated_at: new Date()
			})
		} else {
			data = await this.add({ ...param, user_id_update: undefined })
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
