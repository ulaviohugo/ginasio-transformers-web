import { EmployeeModel } from './employee'

export type GymModel = {
    id:number
	location: string
    name: string
    user_id: number
    user_id_update: number

	user?: EmployeeModel
}
