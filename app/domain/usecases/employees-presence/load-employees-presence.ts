import { EmployeeModel } from '@/domain/models'

export interface LoadEmployeePresences {
	load(): Promise<EmployeeModel[]>
}
