import React from 'react'
import { Admissions } from '@/presentation/pages'
import {
	makeRemoteAddAdmission,
	makeRemoteDeleteAdmission,
	makeRemoteLoadAdmissions,
	makeRemoteLoadEmployees,
	makeRemoteUpdateAdmission
} from '../usecases'

export const MakeAdmission = () => {
	return (
		<Admissions
			addAdmission={makeRemoteAddAdmission()}
			deleteAdmission={makeRemoteDeleteAdmission()}
			loadAdmissions={makeRemoteLoadAdmissions()}
			loadEmployees={makeRemoteLoadEmployees()}
			updateAdmission={makeRemoteUpdateAdmission()}
		/>
	)
}
