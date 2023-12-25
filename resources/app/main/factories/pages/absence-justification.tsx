import React from 'react'
import { AbsenceJustifications } from '@/presentation/pages'
import {
	makeRemoteAddAbsenceJustification,
	makeRemoteDeleteAbsenceJustification,
	makeRemoteLoadAbsenceJustifications,
	makeRemoteLoadEmployees,
	makeRemoteUpdateAbsenceJustification
} from '../usecases'

export const MakeAbsenceJustification = () => {
	return (
		<AbsenceJustifications
			addAbsenceJustification={makeRemoteAddAbsenceJustification()}
			deleteAbsenceJustification={makeRemoteDeleteAbsenceJustification()}
			loadAbsenceJustifications={makeRemoteLoadAbsenceJustifications()}
			loadEmployees={makeRemoteLoadEmployees()}
			updateAbsenceJustification={makeRemoteUpdateAbsenceJustification()}
		/>
	)
}
