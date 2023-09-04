export interface DeleteNotification {
	delete(employeeId: number): Promise<boolean>
}
