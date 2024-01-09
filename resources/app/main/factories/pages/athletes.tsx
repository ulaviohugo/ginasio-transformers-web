import React from 'react'
import { Athletes } from '@/presentation/pages'
import {
	makeRemoteAddAthlete,
	makeRemoteDeleteAthlete,
	makeRemoteLoadAthletes,
	makeRemoteLoadEmployees,
	makeRemoteUpdateAthlete
} from '../usecases'

export const MakeAthlete = () => {
	return (
		<Athletes
			addAthlete={makeRemoteAddAthlete()}
			deleteAthlete={makeRemoteDeleteAthlete()}
			loadAthletes={makeRemoteLoadAthletes()}
			loadEmployees={makeRemoteLoadEmployees()}
			updateAthlete={makeRemoteUpdateAthlete()}
		/>
	)
}
