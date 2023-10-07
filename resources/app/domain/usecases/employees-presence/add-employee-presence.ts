import { EmployeePresenceModel } from '@/domain/models'

export interface AddEmployeePresence {
	add(param: EmployeePresenceModel): Promise<EmployeePresenceModel>
}
