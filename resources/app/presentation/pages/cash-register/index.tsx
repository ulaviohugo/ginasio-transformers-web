import React, { ChangeEvent, useEffect, useState } from 'react'
import {
	Button,
	CashRegisterEditor,
	CashRegisterGraph,
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
import { NotFound } from '@/presentation/pages'
import { DateUtils, MenuUtils, NumberUtils, PaymentUtils } from '@/utils'
import { makeRemoteLoadTransactions } from '@/main/factories'
import toast from 'react-hot-toast'
import { loadTransactionStore } from '@/presentation/redux'
import { GymModel } from '@/domain/models/gym'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

type FilterProps = {
	year: number
	month: number
	payment_method: number
	operation_type: string
	gym_id: number | null
}

export function CashRegister() {
	const dispatch = useDispatch()

	const [gyms, setGyms] = useState<GymModel[]>([])
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'
	const hasGymId = user.gym_id != null

	const transactions = useSelector(useTransactions())

	const currentDate = new Date()

	const [filter, setFilter] = useState<FilterProps>({
		year: currentDate.getFullYear(),
		month: currentDate.getMonth(),
		gym_id: hasGymId ? user.gym_id : null,
	} as any)

	const [isLoading, setIsLoading] = useState(true)
	const [showGraph, setShowGraph] = useState(false)

	const fetchDataGym = async (queryParams?: string) => {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/gym' + (queryParams || '')),
			method: 'get'
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			setGyms(httpResponse.body)
		} else {
			toast.error(httpResponse.body)
		}
	}

	useEffect(() => {
		fetchDataGym()
	}, [])

	const fetchData = () => {
		setIsLoading(true)
		makeRemoteLoadTransactions()
			.load({
				filter: JSON.stringify({
					...filter,
					year: filter?.year ? NumberUtils.convertToNumber(filter.year) : undefined,
					month: filter?.month ? NumberUtils.convertToNumber(filter.month) + 1 : undefined,
					gym_id: hasGymId ? user.gym_id : filter.gym_id // Ensuring gym_id is included for admins
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
			{showGraph && <CashRegisterGraph onClose={() => setShowGraph(false)} />}
			<LayoutBody>
				<div className="flex flex-col gap-4 md:gap-6">
					<SubMenu submenus={MenuUtils.financeMenuItens({ role: user.role })} />
					<Title title="Caixa" icon={IconCashRegister} />
					<CashRegisterEditor />
					<fieldset className="border p-4 rounded-lg">
						<legend className="flex items-center gap-2 mb-4">
							<span>Filtro</span>
							{isLoading && <Spinner />}
							<Button
								variant="gray-light"
								text="Ver gráfico"
								onClick={() => setShowGraph(true)}
							/>
						</legend>
						<div className="flex flex-col gap-4 md:flex-row md:items-end">
							<div className="flex flex-col gap-4 md:flex-row md:gap-4">
								<Select
									name="gym_id"
									onChange={handleChangeFilter}
									label="Selecione a Filial"
									required
									data={gyms.map((gym) => ({ text: gym.name, value: gym.id }))}
									value={hasGymId ? user.gym_id : filter?.gym_id || ''}
									defaultText="Selecione"
									disabled={hasGymId}
								/>
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
									name="operation_type"
									label="Tipo de Operação"
									value={filter?.operation_type || ''}
									data={['Entrada', 'Saída'].map((payment) => ({
										text: payment
									}))}
									defaultText="Todos"
									onChange={handleChangeFilter}
								/>
								<Select
									name="payment_method"
									label="Tipo de Pagamento"
									value={filter?.payment_method || ''}
									data={PaymentUtils.getMethods().map((payment) => ({
										text: payment
									}))}
									defaultText="Todos"
									onChange={handleChangeFilter}
								/>
							</div>
							<Button
								variant="gray-light"
								icon={IconSearch}
								isLoading={isLoading}
								onClick={handleFilter}
								className="w-full md:w-auto"
							/>
						</div>
						<div className="overflow-x-auto mt-4">
							<table className="w-full text-sm border-collapse">
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
										const bg = i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
										const sinal = transaction.operation_type === 'Entrada' ? '+' : '-'
										return (
											<tr key={transaction.id} className={`${bg} hover:bg-gray-100`}>
												<td>{DateUtils.getDatePt(transaction.date)}</td>
												<td>{transaction.description}</td>
												<td>{transaction.operation_type}</td>
												<td
													className={`${sinal === '+' ? 'text-green-600' : 'text-red-500'}`}
												>
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
						</div>
					</fieldset>
				</div>
			</LayoutBody>
		</Layout>
	)
}
