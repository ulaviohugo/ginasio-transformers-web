'use client'

import { FormLogin, Logo } from '@/app/(presentation)/components'

export default function Login() {
	return (
		<div className="flex flex-col justify-center items-center h-screen bg-primary">
			<Logo className="-mb-4 z-20" />
			<FormLogin className="z-10" />
		</div>
	)
}
