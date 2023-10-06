import { ProductRepository } from '@/data/protocols'
import { prismaService as prisma } from '@/infra/db'
import { ProductModel } from '@/domain/models'
import { PrismaProductMapper } from '@/infra/db/prisma/mappers'

export class ProductPrismaRepository implements ProductRepository {
	async add(param: ProductModel): Promise<ProductModel> {
		return (await prisma.product.create({
			data: PrismaProductMapper.toPrisma(param),
			include: { category: { select: { name: true } } }
		})) as ProductModel
	}

	async loadAll(): Promise<ProductModel[]> {
		return (await prisma.product.findMany({
			include: { category: { select: { name: true } } }
		})) as ProductModel[]
	}

	async findByName(name: string): Promise<ProductModel | null> {
		return (await prisma.product.findFirst({
			where: { name }
		})) as ProductModel
	}

	async findByNameAndCategoryId(
		name: string,
		categoryId: number
	): Promise<ProductModel | null> {
		return (await prisma.product.findFirst({
			where: { name, categoryId }
		})) as ProductModel
	}

	async findById(id: number): Promise<ProductModel | null> {
		return (await prisma.product.findUnique({
			where: { id }
		})) as ProductModel
	}

	async count(): Promise<number> {
		return prisma.product.count()
	}

	async update(param: ProductModel): Promise<ProductModel> {
		return (await prisma.product.update({
			data: PrismaProductMapper.toPrisma(param),
			where: { id: param.id },
			include: { category: { select: { name: true } } }
		})) as ProductModel
	}

	async delete(productId: number): Promise<boolean> {
		const deletedProduct = await prisma.product.delete({
			where: { id: productId }
		})
		return !!deletedProduct
	}
}
