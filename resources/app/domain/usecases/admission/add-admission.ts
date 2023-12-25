import { AdmissionModel } from '@/domain/models'

export interface AddAdmission {
	add(params: AdmissionModel): Promise<AdmissionModel>
}
