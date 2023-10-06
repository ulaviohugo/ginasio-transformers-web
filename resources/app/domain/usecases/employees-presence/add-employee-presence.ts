import { Uploader } from '@/data/protocols/services'
import { EmployeePresenceModel } from '@/domain/models'

export interface AddEmployeePresence {
	add(param: EmployeePresenceModel, uploader?: Uploader): Promise<EmployeePresenceModel>
}
