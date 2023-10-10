import { ProductionBudgetModel } from '@/domain/models'

export interface AddProductionBudget {
	add(param: ProductionBudgetModel): Promise<ProductionBudgetModel>
}
