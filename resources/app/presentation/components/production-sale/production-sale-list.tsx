import {
	DateUtils,
	LabelUtils,
	NumberUtils,
	ObjectUtils,
	ProductionBudgetUtils,
	StringUtils
} from '@/utils'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Button, Input, Select } from '../form-controls'
import { Spinner } from '../spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useEmployees, useProductionSales } from '@/presentation/hooks'
import { NoData } from '../no-data'
import { LoadProductionSales } from '@/domain/usecases'
import { loadProductionSaleStore } from '@/presentation/redux'
import toast from 'react-hot-toast'
import { IconClose, IconSearch } from '../icons'
import { QueryParams } from '@/data/protocols'
import { ProductionProductSaleModel, ProductionSaleModel } from '@/domain/models'
import { ProductionSaleGraph } from './production-sale-graph'

type FilterDataProps = {
	id: number
	employee_id: number
	end_product: number
	date: Date
}

type SaleListProps = {
	loadSales: LoadProductionSales
	onSelectProductSale: (selectedProductSale: ProductionProductSaleModel) => void
}

export function ProductionSaleList({ loadSales, onSelectProductSale }: SaleListProps) {
	const dispatch = useDispatch()

	const currentDate = DateUtils.getDate(new Date())

	const sales = useSelector(useProductionSales())
	const employees = useSelector(useEmployees())

	const [isLoading, setIsLoading] = useState(true)
	const [showGraph, setShowGraph] = useState(false)

	const [filter, setFilter] = useState<FilterDataProps>({
		date: currentDate as any
	} as FilterDataProps)

	const [selectedRow, setSelectedRow] = useState(0)

	const hasFilter = useMemo(() => {
		return !ObjectUtils.isEmpty(filter)
	}, [filter])

	const fetchData = async (queryParams?: QueryParams) => {
		try {
			const httpResponse = await loadSales.load(queryParams)
			dispatch(loadProductionSaleStore(httpResponse))
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData({ filter })
	}, [])

	const handleChangeFilterInput = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		const data = { ...filter, [name]: value }
		setFilter(data)
	}

	const handleRequestFilter = () => {
		if (ObjectUtils.isEmpty(filter)) {
			return toast.error('Selecione alguns campos para filtrar resultados')
		}
		fetchData({ filter: filter })
	}

	const clearFilter = () => {
		const filter = { date: currentDate }
		setFilter(filter as any)
		fetchData({ filter })
	}

	const handleSelectRow = (id: number) => {
		setSelectedRow(selectedRow != id ? id : 0)
	}

	const handleSelectStock = (productSale: ProductionSaleModel) => {
		handleSelectRow(productSale.id)
		onSelectProductSale(selectedRow != productSale.id ? productSale : ({} as any))
	}

	return (
		<fieldset>
			{showGraph && <ProductionSaleGraph onClose={() => setShowGraph(false)} />}
			<legend>
				Filtro ({sales.length})
				<Button
					variant="gray-light"
					text="Ver gráfico"
					onClick={() => setShowGraph(true)}
				/>
			</legend>
			<Button variant="gray-light" text="Exportar Excel" className="mb-2" />
			<div className="grid grid-cols-11 mb-3">
				<div className="col-span-2">
					<Input
						name="id"
						label={'Código'}
						value={filter?.id || ''}
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="col-span-2">
					<Select
						name="employee_id"
						label={LabelUtils.translateField('employee_id')}
						value={filter?.employee_id || ''}
						data={employees.map(({ id: value, name: text }) => ({ text, value }))}
						defaultText="Selecione"
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="col-span-2">
					<Select
						name="end_product"
						label={'Peça final'}
						value={filter?.end_product || ''}
						data={ProductionBudgetUtils.endProducts.map((endProduct) => ({
							text: endProduct
						}))}
						defaultText="Selecione"
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="col-span-2">
					<Input
						type="date"
						name="date"
						label={LabelUtils.translateField('date')}
						value={filter?.date?.toString() || ''}
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="flex items-end gap-2 pl-2">
					<Button
						variant="gray-light"
						icon={IconSearch}
						onClick={handleRequestFilter}
						className="h-8"
						isLoading={isLoading}
					/>
					{hasFilter && <Button icon={IconClose} onClick={clearFilter} className="h-8" />}
				</div>
			</div>

			<table className="table w-full text-left text-sm border border-gray-100">
				<thead>
					<tr>
						<th className="p-1">Código</th>
						<th className="p-1">Data</th>
						<th className="p-1">Funcionário</th>
						<th className="p-1">Peça final</th>
						<th className="p-1">Quantidade</th>
						<th className="p-1">Saldo</th>
					</tr>
				</thead>
				<tbody>
					{sales.length > 0 &&
						sales.map((sale, i) => (
							<tr
								key={sale.id}
								className={`cursor-pointer transition-all duration-150 ${
									i % 2 !== 0 && 'bg-gray-100'
								} ${
									selectedRow == sale.id ? 'bg-primary text-white' : 'hover:bg-gray-200'
								}`}
								onClick={() => handleSelectStock(sale)}
							>
								<td className="p-1">{sale.id}</td>

								<td className="p-1">{DateUtils.getDatePt(sale.created_at)}</td>
								<td className="p-1">
									{StringUtils.getFirstAndLastWord(sale?.employee?.name as string)}
								</td>
								<td className="p-1">{sale.end_product}</td>
								<td className="p-1">{NumberUtils.format(sale.quantity)}</td>
								<td className="p-1">{NumberUtils.formatCurrency(sale.balance)}</td>
							</tr>
						))}
				</tbody>
			</table>
			{isLoading ? <Spinner /> : sales.length < 1 && <NoData />}
		</fieldset>
	)
}
