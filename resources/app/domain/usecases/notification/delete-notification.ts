export interface DeleteNotification {
	delete(employee_id: number): Promise<boolean>
}
