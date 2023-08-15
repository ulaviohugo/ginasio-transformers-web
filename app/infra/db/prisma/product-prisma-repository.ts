import { ProductRepository } from '@/app/data/protocols'
import { prismaService as prisma } from '.'
import { Product } from '@/app/domain/models'

export class ProductPrismaRepository implements ProductRepository {
	async add(param: Product): Promise<Product> {
		return (await prisma.product.create({ data: param as any })) as Product
	}

	async loadAll(): Promise<Product[]> {
		return (await prisma.product.findMany({
			include: { category: { select: { name: true } } }
		})) as Product[]
	}

	async findByName(name: string): Promise<Product | null> {
		return (await prisma.product.findFirst({
			where: { name }
		})) as Product
	}

	async findByNameAndCategoryId(
		name: string,
		categoryId: number
	): Promise<Product | null> {
		return (await prisma.product.findFirst({
			where: { name, categoryId }
		})) as Product
	}

	async findById(id: number): Promise<Product | null> {
		return (await prisma.product.findUnique({
			where: { id }
		})) as Product
	}

	async count(): Promise<number> {
		return prisma.product.count()
	}

	async update(param: Product): Promise<Product> {
		return (await prisma.product.update({
			data: param as any,
			where: { id: param.id }
		})) as Product
	}

	async delete(productId: number): Promise<boolean> {
		const deletedProduct = await prisma.product.delete({
			where: { id: productId }
		})
		return !!deletedProduct
	}
}
