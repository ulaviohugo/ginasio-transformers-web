import { ProductionBudgetModel } from '@/domain/models'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Spinner } from '../spinner'
import { DateUtils, NumberUtils, ObjectUtils } from '@/utils'
import { LoadProductionBudgets } from '@/domain/usecases'
import toast from 'react-hot-toast'
import { Button, Input, Select } from '../form-controls'
import { useDispatch, useSelector } from 'react-redux'
import { useCustomers, useProductionBudgets } from '@/presentation/hooks'
import { IconClose, IconSearch } from '../icons'
import { QueryParams } from '@/data/protocols'
import { loadProductionBudgetStore } from '@/presentation/redux'

type ProductionBudgetListProps = {
	loadProductionBudgets: LoadProductionBudgets
	onSelectBudget: (selectedBudget: ProductionBudgetModel) => void
}

type FilterProps = {
	id: number
	date: string
	customer_id: string
}

export function ProductionBudgetList({
	loadProductionBudgets,
	onSelectBudget
}: ProductionBudgetListProps) {
	const dispatch = useDispatch()
	const currentDate = DateUtils.getDate(new Date())
	const customers = useSelector(useCustomers())
	const productionBudgets = useSelector(useProductionBudgets())

	const [budgets, setBudgets] = useState<ProductionBudgetModel[]>(productionBudgets)
	const [isLoading, setIsLoading] = useState(true)
	const [selectedRow, setSelectedRow] = useState(0)

	useMemo(() => {
		if (selectedRow < 1) return
		onSelectBudget(budgets.find((budget) => budget.id == selectedRow) as any)
	}, [selectedRow])

	useEffect(() => {
		setBudgets(productionBudgets)
	}, [productionBudgets])

	const [filter, setFilter] = useState<FilterProps>({
		date: currentDate
	} as FilterProps)

	const hasFilter = useMemo(() => {
		return !ObjectUtils.isEmpty(filter) || filter?.date != currentDate
	}, [filter])

	const fetchData = (queryParams?: QueryParams) => {
		setIsLoading(true)
		loadProductionBudgets
			.load(queryParams)
			.then((response) => {
				setBudgets(response)
				dispatch(loadProductionBudgetStore(response))
			})
			.catch(({ message }) => toast.error(message))
			.finally(() => setIsLoading(false))
	}

	useEffect(() => fetchData({ filter }), [])

	const handleChangeFilter = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFilter({ ...filter, [name]: value })
	}

	const handleFilter = async () => fetchData({ filter })

	const clearFilter = () => {
		const filter = { date: currentDate }
		setFilter(filter as any)
		fetchData({ filter })
	}

	const handleSelectRow = (id: number) => {
		setSelectedRow(selectedRow != id ? id : 0)
	}
	const handleSelectBudget = (budget: ProductionBudgetModel) => {
		handleSelectRow(budget.id)
	}

	return (
		<fieldset>
			<legend>Filtro {isLoading && <Spinner />}</legend>
			<Button variant="gray-light" text="Exportar Excel" className="mb-2" />
			<>
				<div className="flex p-2 border">
					<div className="flex gap-1 ml-auto items-end">
						<Input
							type="number"
							name="id"
							label="Código"
							value={filter?.id || ''}
							onChange={handleChangeFilter}
						/>
						<Input
							type="date"
							name="date"
							label="Data"
							value={filter?.date || ''}
							onChange={handleChangeFilter}
						/>
						<Select
							name="customer_id"
							label="Cliente"
							value={filter?.customer_id || ''}
							data={customers.map(({ name, id }) => ({
								text: name,
								value: String(id)
							}))}
							defaultText="Todos"
							onChange={handleChangeFilter}
						/>

						<div className="flex gap-1">
							<Button
								variant="gray-light"
								icon={IconSearch}
								className=" h-8"
								onClick={handleFilter}
								disabled={isLoading}
							/>
							{hasFilter && (
								<Button icon={IconClose} className=" h-8" onClick={clearFilter} />
							)}
						</div>
					</div>
				</div>
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b font-semibold">
							<td className="px-1">Código</td>
							<td className="px-1">Cliente</td>
							<td className="px-1">Produto Final</td>
							<td className="px-1">Data</td>
							<td className="px-1">Avaliação</td>
							<td className="px-1">Custo corte</td>
							<td className="px-1">Custo Costura</td>
							<td className="px-1">Custo Variável</td>
							<td className="px-1">Acabamento</td>
							<td className="px-1">Custo produção</td>
							<td className="px-1">Custo Venda</td>
							<td className="px-1">Desconto</td>
							<td className="px-1">Total Pago</td>
						</tr>
					</thead>
					<tbody>
						{budgets.map((budget, i) => (
							<tr
								key={budget.id}
								className={`cursor-pointer transition-all duration-150 ${
									i % 2 !== 0 && 'bg-gray-100'
								} 
									${selectedRow == budget.id ? 'bg-primary text-white' : 'hover:bg-gray-200'} `}
								onClick={() => handleSelectBudget(budget)}
							>
								<td className="px-1">{budget.id}</td>
								<td className="px-1">{budget.customer.name}</td>
								<td className="px-1">{budget.end_product}</td>
								<td className="px-1">{DateUtils.getDatePt(budget.date)}</td>
								<td className="px-1">{budget.customer_rating}</td>
								<td className="px-1">
									{NumberUtils.formatCurrency(budget.cutting_cost)}
								</td>
								<td className="px-1">{NumberUtils.formatCurrency(budget.sewing_cost)}</td>
								<td className="px-1">
									{NumberUtils.formatCurrency(budget.variable_cost)}
								</td>
								<td className="px-1">
									{NumberUtils.formatCurrency(budget.finishing_cost)}
								</td>
								<td className="px-1">
									{NumberUtils.formatCurrency(budget.production_cost)}
								</td>
								<td className="px-1">
									{NumberUtils.formatCurrency(budget.selling_cost)}
								</td>
								<td className="px-1">{NumberUtils.formatCurrency(budget.discount)}</td>
								<td className="px-1">
									{NumberUtils.formatCurrency(budget.total_to_pay)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{budgets.length < 1 && (
					<div className="flex justify-center">Nenhum registo de orçamento</div>
				)}
			</>
		</fieldset>
	)
}
