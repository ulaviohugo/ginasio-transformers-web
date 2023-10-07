import { EmployeeModel, EmployeePresenceModel } from '@/domain/models'

export type EmployeePresenceRepositoryFindProps = {
	[key in keyof EmployeePresenceModel]?: EmployeePresenceModel[key]
}

export interface EmployeePresenceRepository {
	add(param: EmployeePresenceModel): Promise<EmployeePresenceModel>
	find(param: EmployeePresenceRepositoryFindProps): Promise<EmployeePresenceModel | null>
	loadAll(): Promise<EmployeeModel[]>
	update(param: EmployeePresenceModel): Promise<EmployeePresenceModel>
	delete(employee_id: number): Promise<boolean>
	count(): Promise<number>
}
