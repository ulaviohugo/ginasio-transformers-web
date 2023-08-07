'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'

import { IconEmail, IconKey, Input, Spinner } from '..'

type FormProps = {
	email: string
	password: string
}

type FormLoginProps = {}

export function FormLogin(props: FormLoginProps) {
	const [formData, setFormData] = useState<FormProps>({ email: '', password: '' })
	const [isLoading, setIsLoading] = useState(false)

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		const respone = await signIn('credentials', { ...formData, callbackUrl: '/' })
		console.log('respone', respone)

		setIsLoading(false)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-4 shadow-lg p-4 bg-white rounded-lg max-w-xs"
		>
			<div className="flex flex-col gap-2">
				<Input
					type="email"
					name="email"
					id="email"
					placeholder="Digite o seu e-email"
					icon={IconEmail}
					label="E-mail"
					onChange={handleInputChange}
					value={formData.email}
				/>
				<Input
					type="password"
					name="password"
					id="password"
					placeholder="*******"
					icon={IconKey}
					label="Senha"
					onChange={handleInputChange}
					value={formData.password}
				/>
			</div>
			<button
				className="flex items-center gap-1 justify-center bg-gray-600 text-white px-2 py-1 text-sm rounded-md"
				disabled={isLoading}
			>
				Iniciar sessão {isLoading && <Spinner />}
			</button>
		</form>
	)
}
