export interface DeleteProductSale {
	delete(id: number): Promise<boolean>
}
