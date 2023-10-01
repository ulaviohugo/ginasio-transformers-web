import { CategoryModel } from '@/domain/models'
import { prismaService as prisma } from '@/infra/db'
import { ArrayUtils, ProductUtils } from '@/utils'

export class ProductSeeder {
	static async run() {
		await this.seedCategory(ProductUtils.categories())
	}

	static async seedCategory(categoriesData: CategoryModel[]) {
		if (!categoriesData?.length) return
		const categories = ArrayUtils.order<CategoryModel>({
			data: categoriesData,
			field: 'name'
		})
		console.log(`Category seeding started`)
		Promise.all(
			categories.map(async ({ name, products }) => {
				console.log(`Seeding category: ${name}`)
				await prisma.category.create({ data: { name } })
			})
		)
		console.log(`Category seeding finished`)
	}
}
