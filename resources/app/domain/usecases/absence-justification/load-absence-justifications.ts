import { AbsenceJustificationModel } from '@/domain/models'

export interface LoadAbsenceJustifications {
	load(): Promise<AbsenceJustificationModel[]>
}
