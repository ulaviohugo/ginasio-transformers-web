import { AthleteModel } from '@/domain/models'

export interface UpdateAthlete {
	update(param: AthleteModel): Promise<AthleteModel>
}
