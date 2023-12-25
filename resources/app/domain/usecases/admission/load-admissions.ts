import { AdmissionModel } from '@/domain/models'

export interface LoadAdmissions {
	load(): Promise<AdmissionModel[]>
}
