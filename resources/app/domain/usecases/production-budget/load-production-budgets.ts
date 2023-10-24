import { QueryParams } from '@/data/protocols'
import { ProductionBudgetModel } from '@/domain/models'

export interface LoadProductionBudgets {
	load(queryParams?: LoadProductionBudgetsParams): Promise<ProductionBudgetModel[]>
}

export type LoadProductionBudgetsParams = QueryParams<ProductionBudgetModel>
export type LoadProductionBudgetsResult = ProductionBudgetModel[]
