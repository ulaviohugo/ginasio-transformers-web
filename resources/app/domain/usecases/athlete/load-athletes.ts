import { QueryParams } from '@/data/protocols'
import { AthleteModel } from '@/domain/models'

export interface LoadAthletes {
		load(params?: QueryParams<AthleteModel>): Promise<AthleteModel[]>
}
