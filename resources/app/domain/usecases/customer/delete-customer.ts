export interface DeleteCustomer {
	delete(employee_id: number): Promise<boolean>
}
