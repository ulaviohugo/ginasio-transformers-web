import { AdmissionModel } from '@/domain/models'

export interface UpdateAdmission {
	update(param: AdmissionModel): Promise<AdmissionModel>
}
