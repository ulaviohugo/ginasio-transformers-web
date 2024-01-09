import { AthleteModel } from '@/domain/models'

export interface AddAthlete {
	add(params: AthleteModel): Promise<AthleteModel>
}
