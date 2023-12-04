import React, { useEffect } from 'react'
import { FormLogin, Logo } from '@/presentation/components'

export function Login() {
	useEffect(() => {
		document.title = 'Login - Sistema WO'
	}, [])

	return (
		<div className="flex flex-col justify-center items-center h-screen bg-primary">
			<Logo className="-mb-4 z-20" />
			<FormLogin className="z-10" />
		</div>
	)
}
