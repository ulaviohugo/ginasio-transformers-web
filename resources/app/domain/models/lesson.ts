import { EmployeeModel } from './employee'

export type LessonModel = {
	name: string
	tipo: string
	data: string
	horario: string
	gym_id: number
    personal_trainer_id: number
    athlete_id: number

	user?: EmployeeModel
}
