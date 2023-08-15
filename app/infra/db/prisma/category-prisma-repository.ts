import { CategoryRepository } from '@/app/data/protocols'
import { prismaService } from '.'
import { Category } from '@/app/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaCategoryMapper } from './mappers'

export class CategoryPrismaRepository implements CategoryRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}
	async add(param: Category): Promise<Category> {
		return (await this.prisma.category.create({
			data: PrismaCategoryMapper.toPrisma(param)
		})) as Category
	}

	async loadAll(): Promise<Category[]> {
		return (await this.prisma.category.findMany()) as Category[]
	}

	async findByName(name: string): Promise<Category | null> {
		return (await this.prisma.category.findUnique({
			where: { name }
		})) as Category
	}

	async findById(id: number): Promise<Category | null> {
		return (await this.prisma.category.findUnique({
			where: { id }
		})) as Category
	}

	async count(): Promise<number> {
		return this.prisma.category.count()
	}

	async update(param: Category): Promise<Category> {
		return (await this.prisma.category.update({
			data: PrismaCategoryMapper.toPrisma(param),
			where: { id: param.id }
		})) as Category
	}

	async delete(categoryId: number): Promise<boolean> {
		const deletedCategory = await this.prisma.category.delete({
			where: { id: categoryId }
		})
		return !!deletedCategory
	}
}
