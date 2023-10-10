import { ProductionBudgetModel } from '@/domain/models'

export interface LoadProductionBudgets {
	load(): Promise<LoadProductionBudgetsResult>
}

export type LoadProductionBudgetsResult = ProductionBudgetModel[]
