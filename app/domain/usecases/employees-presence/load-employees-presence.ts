import { EmployeePresenceModel } from '@/domain/models'

export interface LoadEmployeePresences {
	load(): Promise<EmployeePresenceModel[]>
}
