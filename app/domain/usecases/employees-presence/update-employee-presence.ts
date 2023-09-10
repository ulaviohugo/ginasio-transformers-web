import { Uploader } from '@/data/protocols/services'
import { EmployeePresenceModel } from '@/domain/models'

export interface UpdateEmployeePresence {
	update(
		param: EmployeePresenceModel,
		uploader?: Uploader
	): Promise<EmployeePresenceModel>
}
