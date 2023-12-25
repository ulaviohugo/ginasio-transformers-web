export interface DeleteAdmission {
	delete(id: number): Promise<boolean>
}
