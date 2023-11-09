import React from 'react'
import { Navigate } from 'react-router-dom'
import { MenuUtils } from '@/utils'

export function Store() {
	return <Navigate to={MenuUtils.FRONT.STORE_SALES} replace={true} />
}
