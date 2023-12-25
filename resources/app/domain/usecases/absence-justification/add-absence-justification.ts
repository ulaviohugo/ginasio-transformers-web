import { AbsenceJustificationModel } from '@/domain/models'

export interface AddAbsenceJustification {
	add(params: AbsenceJustificationModel): Promise<AbsenceJustificationModel>
}
