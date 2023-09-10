import { EmployeePresenceModel } from '@/domain/models'

export interface EmployeePresenceRepository {
	add(param: EmployeePresenceModel): Promise<EmployeePresenceModel>
	findById(employeeId: number): Promise<EmployeePresenceModel | null>
	loadAll(): Promise<EmployeePresenceModel[]>
	update(param: EmployeePresenceModel): Promise<EmployeePresenceModel>
	delete(employeeId: number): Promise<boolean>
	count(): Promise<number>
}
