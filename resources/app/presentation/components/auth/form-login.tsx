import React, { ChangeEvent, FormEvent, FormHTMLAttributes, useState } from 'react'

import { IconEmail, IconKey, Input, Spinner } from '..'
import { makeRemoteAuthentication } from '@/main/factories/usecases/remote/auth'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addAuthStore } from '@/presentation/redux'
import { setCurrentAccountAdapter } from '@/main/adapters'

type FormProps = {
	email: string
	password: string
}

type FormLoginProps = FormHTMLAttributes<HTMLFormElement>

export function FormLogin({ className, ...props }: FormLoginProps) {
	const [formData, setFormData] = useState<FormProps>({ email: '', password: '' })
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const httpResponse = await makeRemoteAuthentication().auth(formData)
			setCurrentAccountAdapter(httpResponse)
			toast.success('Login efectuado com sucesso')
			dispatch(addAuthStore(httpResponse.user as any))
		} catch (error: any) {
			toast.error(error.message)
		}

		setIsLoading(false)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={`flex flex-col gap-4 shadow-lg p-4 bg-white rounded-lg max-w-xs ${
				className ?? ''
			}`}
			{...props}
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
				className="flex items-center gap-1 justify-center bg-primary text-white px-2 py-1 text-sm rounded-md"
				disabled={isLoading}
			>
				Iniciar sessão {isLoading && <Spinner />}
			</button>
		</form>
	)
}
