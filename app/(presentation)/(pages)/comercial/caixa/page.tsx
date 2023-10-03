'use client'

import {
	ButtonSubmit,
	IconCashRegister,
	Input,
	InputPrice,
	Layout,
	LayoutBody,
	Spinner,
	SubMenu,
	Title
} from '@/(presentation)/components'
import { CashRegisterModel } from '@/domain/models'
import {
	makeRemoteAddCashRegister,
	makeRemoteLoadCashRegister
} from '@/main/factories/usecases/remote'
import { LabelUtils, SubmenuUtils } from '@/utils'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Caixa() {
	const [cashRegister, setCashRegister] = useState<CashRegisterModel>({} as any)
	const [formData, setFormData] = useState<CashRegisterModel>({} as any)
	const [isLoading, setIsLoading] = useState(true)
	const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

	useEffect(() => {
		makeRemoteLoadCashRegister()
			.load()
			.then(setCashRegister)
			.catch(({ message }) => toast.error(message))
			.finally(() => setIsLoading(false))
	}, [])

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		if (cashRegister?.id) return
		const { value } = e.target
		const balance = value as any
		setFormData({ balance, initialBalance: balance } as any)
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		setIsLoadingSubmit(true)

		makeRemoteAddCashRegister()
			.add(formData)
			.then((response) => {
				toast.success('Caixa actualizado com sucesso')
				setCashRegister(response)
			})
			.catch(({ message }) => toast.error(message))
			.finally(() => setIsLoadingSubmit(false))
	}

	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={SubmenuUtils.commercial} />
				<Title title="Caixa" icon={IconCashRegister} />
				<div className="flex">
					{isLoading ? (
						<Spinner />
					) : (
						<form onSubmit={handleSubmit}>
							<div className="flex flex-col gap-2">
								<InputPrice
									name="initialBalance"
									label={LabelUtils.translateField('initialBalance')}
									value={formData.initialBalance || ''}
									onChange={handleChange}
									disabled={!!cashRegister?.id}
								/>
								{cashRegister?.id && (
									<InputPrice
										name="balance"
										label={LabelUtils.translateField('balance')}
										value={formData.balance || ''}
										onChange={handleChange}
										disabled={!!cashRegister?.id}
									/>
								)}
								<div className="flex">
									<ButtonSubmit isLoading={isLoadingSubmit} disabled={isLoadingSubmit} />
								</div>
							</div>
						</form>
					)}
				</div>
			</LayoutBody>
		</Layout>
	)
}
