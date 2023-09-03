import { CategoryModel, ProductModel } from '@/app/domain/models'
import { prismaService as prisma } from '@/app/infra/db'
import { ArrayUtils, ProductUtils } from '@/app/utils'

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
				const category = await prisma.category.create({ data: { name } })

				if (products && products.length > 0) {
					await this.seedProduct(products, category.id)
				}
			})
		)
		console.log(`Category seeding finished`)
	}

	static async seedProduct(
		productsData: ProductModel[],
		categoryId: number
	): Promise<void> {
		if (!productsData?.length) return
		const products = ArrayUtils.order<ProductModel>({
			data: productsData,
			field: 'name'
		})
		console.log(`Product seeding started`)
		Promise.all(
			products.map(async ({ name, price }) => {
				await prisma.product.create({ data: { name, price, categoryId } })
			})
		)
		console.log(`Product seeding finished`)
	}
}
