export interface DeleteCategory {
	delete(employeeId: number): Promise<boolean>
}
