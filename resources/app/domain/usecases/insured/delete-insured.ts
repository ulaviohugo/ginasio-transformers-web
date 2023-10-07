export interface DeleteInsured {
	delete(id: number): Promise<boolean>
}
