import { ProductModel } from '@/domain/models'

export class ProductViewModel {
	static toHTTP(employee: ProductModel) {
		const photo = employee.photo && `/api${employee.photo}`
		return { ...employee, photo } as ProductModel
	}
}
