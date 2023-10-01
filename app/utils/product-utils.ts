import { CategoryModel, ProductModel } from '@/domain/models'

export class ProductUtils {
	static categories(): CategoryModel[] {
		return [
			{ id: 1, name: 'Medicamentos Injectáveis' },
			{ id: 2, name: 'medicamento oral' },
			{ id: 3, name: 'Materiais gastáveis' }
		] as CategoryModel[]
	}
}
