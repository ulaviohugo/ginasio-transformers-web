import React from 'react'
import { Navigate } from 'react-router-dom'
import { MenuUtils } from '@/utils'

export function Production() {
	return <Navigate to={MenuUtils.FRONT.PRODUCTION_SALES} replace={true} />
}
