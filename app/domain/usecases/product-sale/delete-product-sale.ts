export interface DeleteSale {
	delete(id: number): Promise<boolean>
}
