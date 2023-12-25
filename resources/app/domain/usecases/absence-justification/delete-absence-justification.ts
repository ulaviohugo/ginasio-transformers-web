export interface DeleteAbsenceJustification {
	delete(id: number): Promise<boolean>
}
