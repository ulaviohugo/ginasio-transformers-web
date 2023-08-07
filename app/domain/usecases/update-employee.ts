import { Employee } from '../models'

export interface UpdateEmployee {
	update(param: Employee): Promise<Employee | 'notFound' | 'emailInUse' | 'documentInUse'>
}
