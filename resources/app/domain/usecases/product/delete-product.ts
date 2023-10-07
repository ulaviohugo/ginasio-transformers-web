export interface DeleteProduct {
	delete(product_id: number): Promise<boolean>
}
