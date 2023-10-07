export interface DeleteEmployeePresence {
	delete(employee_id: number): Promise<boolean>
}
