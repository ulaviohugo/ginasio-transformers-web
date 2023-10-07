import React from 'react'
import { FormLogin, Logo } from '@/presentation/components'

export function Login() {
	return (
		<div className="flex flex-col justify-center items-center h-screen bg-primary">
			<Logo className="-mb-4 z-20" />
			<FormLogin className="z-10" />
		</div>
	)
}