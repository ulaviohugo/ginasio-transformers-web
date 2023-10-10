export interface DeleteProductionBudget {
	delete(id: number): Promise<boolean>
}
