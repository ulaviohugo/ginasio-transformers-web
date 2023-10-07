export interface DeletePurchase {
	delete(id: number): Promise<boolean>
}
