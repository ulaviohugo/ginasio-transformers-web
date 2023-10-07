export interface DeleteCategory {
	delete(employee_id: number): Promise<boolean>
}
