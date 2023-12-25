export interface DeleteRefund {
	delete(employee_id: number): Promise<boolean>
}
