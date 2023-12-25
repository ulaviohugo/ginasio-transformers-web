import { AbsenceJustificationModel } from '@/domain/models'

export interface UpdateAbsenceJustification {
	update(param: AbsenceJustificationModel): Promise<AbsenceJustificationModel>
}
