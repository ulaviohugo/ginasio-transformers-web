export interface DeleteTransaction {
	delete(id: number): Promise<boolean>
}
