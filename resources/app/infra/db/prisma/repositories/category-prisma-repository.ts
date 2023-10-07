import { CategoryRepository } from '@/data/protocols'
import { prismaService } from '@/infra/db'
import { CategoryModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaCategoryMapper } from '@/infra/db/prisma/mappers'

export class CategoryPrismaRepository implements CategoryRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}
	async add(param: CategoryModel): Promise<CategoryModel> {
		return (await this.prisma.category.create({
			data: PrismaCategoryMapper.toPrisma(param)
		})) as CategoryModel
	}

	async loadAll(): Promise<CategoryModel[]> {
		return (await this.prisma.category.findMany()) as CategoryModel[]
	}

	async findByName(name: string): Promise<CategoryModel | null> {
		return (await this.prisma.category.findUnique({
			where: { name }
		})) as CategoryModel
	}

	async findById(id: number): Promise<CategoryModel | null> {
		return (await this.prisma.category.findUnique({
			where: { id }
		})) as CategoryModel
	}

	async count(): Promise<number> {
		return this.prisma.category.count()
	}

	async update(param: CategoryModel): Promise<CategoryModel> {
		return (await this.prisma.category.update({
			data: PrismaCategoryMapper.toPrisma(param),
			where: { id: param.id }
		})) as CategoryModel
	}

	async delete(category_id: number): Promise<boolean> {
		const deletedCategory = await this.prisma.category.delete({
			where: { id: category_id }
		})
		return !!deletedCategory
	}
}
