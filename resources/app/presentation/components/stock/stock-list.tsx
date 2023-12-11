import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
	Button,
	IconClose,
	IconSearch,
	IconStock,
	Input,
	NoData,
	Select,
	Spinner,
	StockGraph
} from '..'
import { ArrayUtils, DateUtils, LabelUtils, NumberUtils, ObjectUtils } from '@/utils'
import { LoadStocks } from '@/domain/usecases'
import { loadStockStore } from '@/presentation/redux'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useCategories, useProducts, useStocks, useSuppliers } from '@/presentation/hooks'
import { QueryParams } from '@/data/protocols'
import { StockModel } from '@/domain/models'

type StokeListProps = {
	loadStokes: LoadStocks
	onSelectStock: (selectedStock: StockModel) => void
}

type FilterDataProps = {
	supplier_id: number
	category_id: number
	product_id: number
	date: Date
}

export function StockList({ loadStokes, onSelectStock }: StokeListProps) {
	const dispatch = useDispatch()
	const stocks = useSelector(useStocks())
	const suppliers = useSelector(useSuppliers())
	const categories = useSelector(useCategories())
	const products = useSelector(useProducts())

	const [isLoading, setIsLoading] = useState(true)
	const [showGraph, setShowGraph] = useState(false)

	const [filterData, setFilterData] = useState<FilterDataProps>({} as FilterDataProps)
	const [selectedRow, setSelectedRow] = useState(0)

	const productList = useMemo(() => {
		return ArrayUtils.order({
			data: filterData?.category_id
				? products.filter((product) => product.category_id == filterData.category_id)
				: products,
			field: 'name'
		})
	}, [filterData.category_id, products])

	const hasFilter = useMemo(() => {
		return !ObjectUtils.isEmpty(filterData)
	}, [filterData])

	const fetchData = async (queryParams?: QueryParams) => {
		setIsLoading(true)
		try {
			const httpResponse = await loadStokes.load(queryParams)
			dispatch(loadStockStore(httpResponse))
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const handleChangeFilterInput = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		let data = { ...filterData, [name]: value }

		if (name == 'category_id') {
			data = { ...data, product_id: undefined as any }
		}

		setFilterData(data)
	}

	const handleRequestFilter = () => {
		if (ObjectUtils.isEmpty(filterData)) {
			return toast.error('Selecione alguns campos para filtrar resultados')
		}
		fetchData({ filter: filterData })
	}

	const clearFilter = () => {
		setFilterData({} as any)
		fetchData()
	}

	const handleSelectRow = (id: number) => {
		setSelectedRow(selectedRow != id ? id : 0)
	}

	const handleSelectStock = (customer: StockModel) => {
		handleSelectRow(customer.id)
		onSelectStock(selectedRow != customer.id ? customer : ({} as any))
	}

	return (
		<>
			{showGraph && <StockGraph onClose={() => setShowGraph(false)} />}
			<fieldset>
				<legend>
					Filtro ({stocks.length})
					<Button
						variant="gray-light"
						text="Ver gráfico"
						onClick={() => setShowGraph(true)}
					/>
				</legend>
				<div className="grid grid-cols-9 mb-3">
					<div className="col-span-2">
						<Select
							name="supplier_id"
							label={LabelUtils.translateField('supplier_id')}
							value={filterData?.supplier_id || ''}
							data={suppliers.map(({ id: value, name: text }) => ({ text, value }))}
							defaultText="Selecione"
							onChange={handleChangeFilterInput}
						/>
					</div>
					<div className="col-span-2">
						<Select
							name="category_id"
							label={LabelUtils.translateField('category_id')}
							value={filterData?.category_id || ''}
							data={categories.map(({ id: value, name: text }) => ({ text, value }))}
							defaultText="Selecione"
							onChange={handleChangeFilterInput}
						/>
					</div>
					<div className="col-span-2">
						<Select
							name="product_id"
							label={LabelUtils.translateField('product_id')}
							value={filterData?.product_id || ''}
							data={productList.map(({ id: value, name: text }) => ({ text, value }))}
							defaultText="Selecione"
							onChange={handleChangeFilterInput}
						/>
					</div>
					<div className="col-span-2">
						<Input
							type="date"
							name="date"
							label={LabelUtils.translateField('date')}
							value={filterData?.date?.toString() || ''}
							onChange={handleChangeFilterInput}
						/>
					</div>
					<div className="flex items-end gap-2 pl-2">
						<button
							type="button"
							className="flex btn-primary h-8"
							onClick={handleRequestFilter}
						>
							{isLoading ? <Spinner /> : <IconSearch />}
						</button>
						{hasFilter && (
							<button
								type="button"
								className="flex btn-default h-8"
								onClick={clearFilter}
							>
								<IconClose />
							</button>
						)}
					</div>
				</div>
				<div className="max-h-64 overflow-auto">
					<table className="table w-full text-left text-sm border border-gray-100">
						<thead>
							<tr>
								<th className="p-1">Lote</th>
								<th className="p-1">Imagem</th>
								<th className="p-1">Data</th>
								<th className="p-1">Fornecedor</th>
								<th className="p-1">Categoria</th>
								<th className="p-1">Produto</th>
								<th className="p-1">Tamanho</th>
								<th className="p-1">Quantidade</th>
							</tr>
						</thead>
						{stocks.length > 0 && (
							<tbody className="h-5">
								{stocks.map((stock, i) => (
									<tr
										key={stock.id}
										className={`cursor-pointer transition-all duration-150 ${
											i % 2 !== 0 && 'bg-gray-100'
										} ${
											selectedRow == stock.id
												? 'bg-primary text-white'
												: 'hover:bg-gray-200'
										}`}
										onClick={() => handleSelectStock(stock)}
									>
										<td className="p-1">{stock.id}</td>
										<td className="p-1">
											{stock.photo ? (
												<img
													src={stock.photo}
													alt="Imagem"
													width={30}
													height={30}
													className="aspect-square object-cover"
												/>
											) : (
												<IconStock size={25} />
											)}
										</td>
										<td className="p-1">{DateUtils.getDatePt(stock.purchase_date)}</td>
										<td className="p-1">{stock.supplier?.name}</td>
										<td className="p-1">{stock.category?.name}</td>
										<td className="p-1">{stock.product?.name}</td>
										<td className="p-1">{stock.size}</td>
										<td className="p-1">{NumberUtils.format(stock.quantity)}</td>
									</tr>
								))}
							</tbody>
						)}
					</table>
					{isLoading ? (
						<Spinner />
					) : (
						stocks.length < 1 && (
							<NoData
								data={
									!ObjectUtils.isEmpty(filterData) ? 'Nenhum resultado da pesquisa' : null
								}
							/>
						)
					)}
				</div>
			</fieldset>
		</>
	)
}
