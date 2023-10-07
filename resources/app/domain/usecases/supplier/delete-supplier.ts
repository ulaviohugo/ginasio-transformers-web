export interface DeleteSupplier {
	delete(employee_id: number): Promise<boolean>
}
