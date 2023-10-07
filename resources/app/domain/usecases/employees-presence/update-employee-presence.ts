import { EmployeePresenceModel } from '@/domain/models'

export interface UpdateEmployeePresence {
	update(param: EmployeePresenceModel): Promise<EmployeePresenceModel>
}
