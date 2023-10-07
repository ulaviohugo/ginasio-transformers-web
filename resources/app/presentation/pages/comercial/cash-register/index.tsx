import React from 'react'
import {
	ButtonSubmit,
	IconCashRegister,
	Input,
	InputPrice,
	Layout,
	LayoutBody,
	Select,
	Spinner,
	SubMenu,
	TextArea,
	Title
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { CashRegisterModel, TransactionModel } from '@/domain/models'
import {
	makeRemoteAddCashRegister,
	makeRemoteAddTransaction,
	makeRemoteLoadCashRegister
} from '@/main/factories/usecases/remote'
import { DateUtils, LabelUtils, NumberUtils, PaymentUtils, SubmenuUtils } from '@/utils'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export function CashRegister() {
	const user = useSelector(useAuth())

	const [cashRegister, setCashRegister] = useState<CashRegisterModel>({} as any)
	const [balanceData, setBalanceData] = useState<CashRegisterModel>(cashRegister)
	const [formData, setFormData] = useState<TransactionModel>({
		date: DateUtils.getDate(new Date()) as any
	} as TransactionModel)
	const [isLoading, setIsLoading] = useState(true)
	const [isLoadingSubmitBalance, setIsLoadingSubmitBalance] = useState(false)
	const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

	useEffect(() => {
		makeRemoteLoadCashRegister()
			.load()
			.then((response) => {
				setCashRegister(response)
				setBalanceData(response)
			})
			.catch(({ message }) => toast.error(message))
			.finally(() => setIsLoading(false))
	}, [])

	const handleChangeBalance = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		if (cashRegister?.id) return
		const { value } = e.target
		const balance = value as any
		setBalanceData({ balance, initial_balance: balance } as any)
	}

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmitBalance = (e: FormEvent) => {
		e.preventDefault()
		setIsLoadingSubmitBalance(true)

		makeRemoteAddCashRegister()
			.add(balanceData)
			.then((response) => {
				toast.success('Caixa actualizado com sucesso')
				setCashRegister(response)
			})
			.catch(({ message }) => toast.error(message))
			.finally(() => setIsLoadingSubmitBalance(false))
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		if (!balanceData?.initial_balance)
			return toast.error('Adicione um saldo inicial antes de registar uma operação')

		setIsLoadingSubmit(true)

		makeRemoteAddTransaction()
			.add(formData)
			.then(({ cash_register: cashRegister }) => {
				toast.success('Movimento realizado com sucesso')
				if (cashRegister) {
					setBalanceData(cashRegister)
					setCashRegister(cashRegister)
					setFormData({} as any)
				}
			})
			.catch(({ message }) => toast.error(message))
			.finally(() => setIsLoadingSubmit(false))
	}

	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={SubmenuUtils.commercial({ role: user.role })} />
				<Title title="Caixa" icon={IconCashRegister} />
				<div className="flex">
					{isLoading ? (
						<Spinner />
					) : (
						<div className="flex gap-4">
							<fieldset>
								<legend>Informação de Caixa</legend>
								<form onSubmit={handleSubmitBalance}>
									<div className="flex flex-col gap-2">
										{!cashRegister?.balance ? (
											<InputPrice
												name="initial_balance"
												id="initial_balance"
												label={LabelUtils.translateField('initial_balance')}
												value={balanceData?.initial_balance || ''}
												onChange={handleChangeBalance}
												disabled={!!cashRegister?.id}
											/>
										) : (
											<div className="flex flex-col gap-2 text-sm">
												<div>
													<label htmlFor="" className="font-semibold">
														Saldo inicial
													</label>
													<div className="border rounded-md font-semibold px-2 py-1">
														{NumberUtils.formatCurrency(cashRegister.initial_balance)}
													</div>
												</div>
												<div>
													<label htmlFor="" className="font-semibold">
														Saldo actual
													</label>
													<div
														className={`border rounded-md font-semibold px-2 py-1 ${
															NumberUtils.convertToNumber(cashRegister.balance) <
															NumberUtils.convertToNumber(cashRegister.initial_balance)
																? 'text-red-500'
																: 'text-green-500'
														}`}
													>
														{NumberUtils.formatCurrency(cashRegister.balance)}
													</div>
												</div>
											</div>
										)}
										{!cashRegister?.initial_balance && (
											<div className="flex">
												<ButtonSubmit
													isLoading={isLoadingSubmitBalance}
													disabled={isLoadingSubmitBalance}
												/>
											</div>
										)}
									</div>
								</form>
							</fieldset>

							<fieldset>
								<legend>Outros movimentos de caixa</legend>
								<form onSubmit={handleSubmit}>
									<div className="grid grid-cols-2 gap-1">
										<Input
											type="date"
											name="date"
											id="date"
											label="Data"
											value={(formData?.date as any) || ''}
											onChange={handleInputChange}
										/>
										<Select
											label="Tipo de operação"
											name="operation_type"
											id="operation_type"
											value={formData?.operation_type || ''}
											data={[{ text: 'Entrada' }, { text: 'Saída' }]}
											defaultText="Selecione"
											onChange={handleInputChange}
										/>
										<div className="col-span-2">
											<TextArea
												name="description"
												id="description"
												label="Descrição da operação"
												value={formData?.description || ''}
												onChange={handleInputChange}
											/>
										</div>
										<InputPrice
											name="amount"
											id="amount"
											label="Valor KZ"
											value={formData?.amount || ''}
											onChange={handleInputChange}
										/>
										<Select
											name="payment_method"
											id="payment_method"
											label="Movimento Bancário"
											value={formData?.payment_method || ''}
											data={PaymentUtils.getMethods().map((type) => ({ text: type }))}
											defaultText="Selecione"
											onChange={handleInputChange}
										/>
										<div className="col-span-2 mt-2">
											<ButtonSubmit
												isLoading={isLoadingSubmit}
												disabled={isLoadingSubmit}
											/>
										</div>
									</div>
								</form>
							</fieldset>
						</div>
					)}
				</div>
			</LayoutBody>
		</Layout>
	)
}
