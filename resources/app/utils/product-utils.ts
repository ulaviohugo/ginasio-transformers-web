import { CategoryModel } from '@/domain/models'

export class ProductUtils {
	static categories(): CategoryModel[] {
		return [
			{ id: 1, name: 'Medicamentos Injectáveis' },
			{ id: 2, name: 'Medicamento oral' },
			{ id: 3, name: 'Materiais gastáveis' }
		] as CategoryModel[]
	}
}
