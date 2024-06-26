import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Spinner } from '../spinner'
import { CashRegisterModel, TransactionModel } from '@/domain/models'
import { DateUtils, NumberUtils, PaymentUtils } from '@/utils'
import {
	makeRemoteAddCashRegister,
	makeRemoteAddTransaction,
	makeRemoteLoadCashRegister
} from '@/main/factories'
import toast from 'react-hot-toast'
import { Button, Input, InputPrice, Select, TextArea } from '../form-controls'
import { useDispatch } from 'react-redux'
import { addTransactionStore } from '@/presentation/redux'
import { IconCheck } from '../icons'

export function CashRegisterEditor() {
	const dispatch = useDispatch()

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
			.then((response) => {
				toast.success('Movimento realizado com sucesso')
				const { cash_register: cashRegister } = response
				if (cashRegister) {
					setBalanceData(cashRegister)
					setCashRegister(cashRegister)
					setFormData({} as any)
				}
				dispatch(addTransactionStore(response))
			})
			.catch(({ message }) => toast.error(message))
			.finally(() => setIsLoadingSubmit(false))
	}

	return (
		<div className="flex">
			{isLoading ? (
				<Spinner />
			) : (
				<div className="flex gap-4 w-full">
					<fieldset>
						<legend>Informação de Caixa</legend>
						<form onSubmit={handleSubmitBalance}>
							<div className="flex flex-col gap-2">
								{!cashRegister?.balance ? (
									<InputPrice
										name="initial_balance"
										id="initial_balance"
										label={'saldo incial'}
										value={balanceData?.initial_balance || ''}
										onChange={handleChangeBalance}
										disabled={!!cashRegister?.id}
									/>
								) : (
									<div className="flex flex-col gap-2 text-sm">
										<div>
											<label htmlFor="" className="font-semibold">
												Saldo Inicial
											</label>
											<div className="border rounded-md font-semibold px-2 py-1 bg-gray-100">
												{NumberUtils.formatCurrency(cashRegister.initial_balance)}
											</div>
										</div>
										<div>
											<label htmlFor="" className="font-semibold">
												Saldo Actual
											</label>
											<div
												className={`border rounded-md font-semibold px-2 py-1 text-2xl bg-gray-100 ${
													NumberUtils.convertToNumber(cashRegister.balance) < 10000
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
										<Button
											variant="green"
											text="Salvar"
											rightIcon={IconCheck}
											isLoading={isLoadingSubmitBalance}
											disabled={isLoadingSubmitBalance}
										/>
									</div>
								)}
							</div>
						</form>
					</fieldset>

					<fieldset className="w-full">
						<legend>Outros movimentos de caixa</legend>
						<form onSubmit={handleSubmit} className="w-full ">
							<div className="flex items-start gap-1">
								<div className="w-32">
									<Input
										type="date"
										name="date"
										id="date"
										label="Data"
										value={(formData?.date as any) || ''}
										onChange={handleInputChange}
									/>
								</div>
								<div className="w-36">
									<Select
										label="Tipo de Operação"
										name="operation_type"
										id="operation_type"
										value={formData?.operation_type || ''}
										data={[{ text: 'Entrada' }, { text: 'Saída' }]}
										defaultText="Selecione"
										onChange={handleInputChange}
									/>
								</div>
								<div className="col-span-2 flex-1">
									<TextArea
										name="description"
										id="description"
										label="Descrição da Operação"
										value={formData?.description || ''}
										onChange={handleInputChange}
										rows={1}
									/>
								</div>
								<div className="w-32">
									<InputPrice
										name="amount"
										id="amount"
										label="Valor KZ"
										value={formData?.amount || ''}
										onChange={handleInputChange}
									/>
								</div>
								<div className="w-56">
									<Select
										name="payment_method"
										id="payment_method"
										label="Movimento Bancário"
										value={formData?.payment_method || ''}
										data={PaymentUtils.getMethods().map((type) => ({ text: type }))}
										defaultText="Selecione"
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className="col-span-2 mt-2">
								<Button
									variant="green"
									text="Salvar"
									rightIcon={IconCheck}
									disabled={isLoading}
									isLoading={isLoadingSubmit}
								/>
							</div>
						</form>
					</fieldset>
				</div>
			)}
		</div>
	)
}
