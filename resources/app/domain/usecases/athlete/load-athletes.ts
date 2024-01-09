import { AthleteModel } from '@/domain/models'

export interface LoadAthletes {
	load(): Promise<AthleteModel[]>
}
