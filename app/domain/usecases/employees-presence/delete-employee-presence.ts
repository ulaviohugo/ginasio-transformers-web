export interface DeleteEmployeePresence {
	delete(employeeId: number): Promise<boolean>
}
