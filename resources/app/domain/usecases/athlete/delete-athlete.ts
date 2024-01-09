export interface DeleteAthlete {
	delete(id: number): Promise<boolean>
}
