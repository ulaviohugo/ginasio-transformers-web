import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Chart } from 'chart.js/auto'
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
import { NotFound } from '@/presentation/pages'
import { ArrayUtils, DateUtils, MenuUtils, NumberUtils, PaymentUtils } from '@/utils'
import { makeRemoteLoadTransactions } from '@/main/factories'
import toast from 'react-hot-toast'
import { loadTransactionStore } from '@/presentation/redux'

type FilterProps = {
	year: number
	month: number
	payment_method: number
	operation_type: string
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

	const operationChartLabels = useMemo(
		() =>
			ArrayUtils.removeDuplicated(transactions.map((item) => item.operation_type)).sort(),
		[transactions]
	)
	const operationChartData = useMemo(
		() =>
			operationChartLabels.map(
				(item) => transactions.filter((tr) => tr.operation_type == item).length
			),
		[operationChartLabels, transactions]
	)

	const movementChart = useMemo(() => {
		const obj: any = {}
		transactions.forEach(({ payment_method }) => {
			if (obj[payment_method]) {
				obj[payment_method]++
			} else {
				obj[payment_method] = 1
			}
		})
		return ArrayUtils.order({
			data: Object.entries(obj).map(([label, value]) => ({ label, value })),
			field: 'value',
			orderOption: 'desc'
		})
	}, [transactions])

	const operationChartRef = useRef<HTMLCanvasElement & { myChart: any }>(null)
	const movementChartRef = useRef<HTMLCanvasElement & { myChart: any }>(null)

	useEffect(() => {
		let myChart: any
		if (operationChartRef.current) {
			const ctx = operationChartRef.current?.getContext('2d') as CanvasRenderingContext2D

			if (operationChartRef.current?.myChart) {
				operationChartRef.current.myChart.data.labels = operationChartLabels
				operationChartRef.current.myChart.data.datasets[0].data = operationChartData
				operationChartRef.current.myChart.update()
			} else {
				operationChartRef.current.myChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: operationChartLabels,
						datasets: [
							{
								label: 'Operação',
								data: operationChartData
							}
						]
					},
					options: { layout: {} }
				})
			}
		}

		return () => {
			if (myChart) {
				myChart.destroy()
			}
		}
	}, [operationChartData, operationChartLabels])

	useEffect(() => {
		let myChart: any
		const labels = movementChart.map(({ label }) => label)
		const data = movementChart.map(({ value }) => value)
		if (movementChartRef.current) {
			const ctx = movementChartRef.current?.getContext('2d') as CanvasRenderingContext2D

			if (movementChartRef.current?.myChart) {
				movementChartRef.current.myChart.data.labels = labels
				movementChartRef.current.myChart.data.datasets[0].data = data
				movementChartRef.current.myChart.update()
			} else {
				movementChartRef.current.myChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels,
						datasets: [
							{
								label: 'Movimento bancário',
								data,
								backgroundColor: ['#047857', '#0891b2', '#d97706', '#b91c1c']
							}
						]
					}
				})
			}
		}

		return () => {
			if (myChart) {
				myChart.destroy()
			}
		}
	}, [movementChart])

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
								name="operation_type"
								label="Tipo de operação"
								value={filter?.operation_type || ''}
								data={['Entrada', 'Saída'].map((payment) => ({
									text: payment
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
				<fieldset>
					<legend>Gráfico</legend>
					<div className="grid grid-cols-2 gap-4">
						<div className="p-4 border">
							<canvas ref={operationChartRef} />
						</div>
						<div className="p-4 border">
							<canvas ref={movementChartRef} />
						</div>
					</div>
				</fieldset>
			</LayoutBody>
		</Layout>
	)
}
