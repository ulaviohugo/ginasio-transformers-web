export interface DeleteEmployee {
  delete(employeeId: number): Promise<boolean>
}
