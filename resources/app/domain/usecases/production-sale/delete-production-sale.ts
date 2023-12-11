export interface DeleteProductionSale {
	delete(id: number): Promise<boolean>
}
