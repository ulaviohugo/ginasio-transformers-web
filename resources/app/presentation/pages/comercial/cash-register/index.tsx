import React, { ChangeEvent, useEffect, useState } from 'react'
import {
	CashRegisterEditor,
	IconCashRegister,
	IconSearch,
	Input,
	Layout,
	LayoutBody,
	Select,
	Spinner,
	SubMenu,
	Title
} from '@/presentation/components'
import { useAuth, useTransactions } from '@/presentation/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { NotFound } from '../../notfound'
import { DateUtils, MenuUtils, NumberUtils, PaymentUtils } from '@/utils'
import { makeRemoteLoadTransactions } from '@/main/factories'
import toast from 'react-hot-toast'
import { loadTransactionStore } from '@/presentation/redux'

type FilterProps = {
	year: number
	month: number
	payment_method: number
}

export function CashRegister() {
	const dispatch = useDispatch()

	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	const transactions = useSelector(useTransactions())

	const currentDate = new Date()

	const [filter, setFilter] = useState<FilterProps>({
		year: currentDate.getFullYear(),
		month: currentDate.getMonth()
	} as any)

	const [isLoading, setIsLoading] = useState(true)

	const fetchData = () => {
		setIsLoading(true)
		makeRemoteLoadTransactions()
			.load({
				filter: JSON.stringify({
					...filter,
					year: filter?.year ? NumberUtils.convertToNumber(filter.year) : undefined,
					month: filter?.month ? NumberUtils.convertToNumber(filter.month) + 1 : undefined
				}) as any
			})
			.then((response) => {
				dispatch(loadTransactionStore(response))
			})
			.catch(({ message }) => toast.error(message))
			.finally(() => setIsLoading(false))
	}
	useEffect(() => fetchData(), [])

	const handleChangeFilter = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFilter({ ...filter, [name]: value })
	}

	const handleFilter = async () => fetchData()

	if (!isAdmin) return <NotFound />

	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={MenuUtils.commercialMenuItens({ role: user.role })} />
				<Title title="Caixa" icon={IconCashRegister} />
				<CashRegisterEditor />
				<fieldset>
					<legend className="flex gap-1">Filtro {isLoading && <Spinner />}</legend>
					<div className="flex p-2 border">
						<div className="flex gap-1 ml-auto items-end">
							<Input
								type="number"
								name="year"
								label="Ano"
								value={filter?.year || ''}
								onChange={handleChangeFilter}
							/>
							<Select
								name="month"
								label="Mês"
								value={filter?.month || ''}
								data={DateUtils.getMonthList().map((month) => ({
									text: DateUtils.getMonthExt(month),
									value: String(month)
								}))}
								defaultText="Todos"
								onChange={handleChangeFilter}
							/>
							<Select
								name="payment_method"
								label="Tipo de pagamento"
								value={filter?.payment_method || ''}
								data={PaymentUtils.getMethods().map((payment) => ({
									text: payment
								}))}
								defaultText="Todos"
								onChange={handleChangeFilter}
							/>
							<div className="flex">
								<button
									className="btn-primary"
									onClick={handleFilter}
									disabled={isLoading}
								>
									{isLoading ? <Spinner /> : <IconSearch />}
								</button>
							</div>
						</div>
					</div>
					<table className="w-full text-sm">
						<thead className="font-semibold uppercase border-b">
							<tr>
								<td>Data</td>
								<td>Descrição de operação</td>
								<td>Tipo operação</td>
								<td>Valor</td>
								<td>Saldo após movimento</td>
								<td>Movimento bancário</td>
							</tr>
						</thead>
						<tbody>
							{transactions.map((transaction, i) => {
								const bg = i % 2 == 0 ? 'bg-gray-50' : 'bg-none'
								const sinal = transaction.operation_type == 'Entrada' ? '+' : '-'
								return (
									<tr key={transaction.id} className={`${bg} hover:bg-gray-100`}>
										<td>{DateUtils.getDatePt(transaction.date)}</td>
										<td>{transaction.description}</td>
										<td>{transaction.operation_type}</td>
										<td className={`${sinal == '+' ? 'text-green-600' : 'text-red-500'}`}>
											{sinal}
											{NumberUtils.formatCurrency(transaction.amount)}
										</td>
										<td>
											{NumberUtils.formatCurrency(transaction.post_movement_balance)}
										</td>
										<td>{transaction.payment_method}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</fieldset>
			</LayoutBody>
		</Layout>
	)
}
