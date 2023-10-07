export interface DeleteEmployee {
	delete(employee_id: number): Promise<boolean>
}
