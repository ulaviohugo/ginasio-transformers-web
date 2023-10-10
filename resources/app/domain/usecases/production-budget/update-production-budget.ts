import { ProductionBudgetModel } from '@/domain/models'

export interface UpdateProductionBudget {
	update(param: ProductionBudgetModel): Promise<ProductionBudgetModel>
}
