import {
	ArrayUtils,
	DateUtils,
	LabelUtils,
	NumberUtils,
	ObjectUtils,
	StringUtils
} from '@/utils'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { CardActions } from '../cards'
import { Input, Select } from '../form-controls'
import { Spinner } from '../spinner'
import { useDispatch, useSelector } from 'react-redux'
import {
	useCategories,
	useCustomers,
	useEmployees,
	useProductSales,
	useProducts
} from '@/presentation/hooks'
import { NoData } from '../no-data'
import { LoadSales } from '@/domain/usecases'
import { loadProductSaleStore } from '@/presentation/redux'
import toast from 'react-hot-toast'
import { IconClose, IconSearch } from '../icons'
import { QueryParams } from '@/data/protocols'

type FilterDataProps = {
	customer_id: number
	employee_id: number
	category_id: number
	product_id: number
	date: Date
}

type SaleListProps = {
	loadSales: LoadSales
}

export function SaleList({ loadSales }: SaleListProps) {
	const dispatch = useDispatch()

	const productSales = useSelector(useProductSales())
	const products = useSelector(useProducts())
	const categories = useSelector(useCategories())
	const customers = useSelector(useCustomers())
	const employes = useSelector(useEmployees())

	const [isLoading, setIsLoading] = useState(true)

	const [filterData, setFilterData] = useState<FilterDataProps>({
		date: new Date()
	} as FilterDataProps)

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
		try {
			const httpResponse = await loadSales.load(queryParams)
			dispatch(loadProductSaleStore(httpResponse))
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

	return (
		<fieldset>
			<legend>Filtro ({productSales.length})</legend>
			<div className="grid grid-cols-11 mb-3">
				<div className="col-span-2">
					<Select
						name="customer_id"
						label={LabelUtils.translateField('customer_id')}
						value={filterData?.customer_id || ''}
						data={customers.map(({ id: value, name: text }) => ({ text, value }))}
						defaultText="Selecione"
						onChange={handleChangeFilterInput}
					/>
				</div>
				<div className="col-span-2">
					<Select
						name="employee_id"
						label={LabelUtils.translateField('employee_id')}
						value={filterData?.employee_id || ''}
						data={employes.map(({ id: value, name: text }) => ({ text, value }))}
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
						<button type="button" className="flex btn-default h-8" onClick={clearFilter}>
							<IconClose />
						</button>
					)}
				</div>
			</div>

			<table className="table w-full text-left text-sm border border-gray-100">
				<tr>
					<th className="p-1">Id</th>
					<th className="p-1">Cliente</th>
					<th className="p-1">Categoria</th>
					<th className="p-1">Produto</th>
					<th className="p-1">Cor</th>
					<th className="p-1">Tamanho</th>
					<th className="p-1">Quantidade</th>
					<th className="p-1">Preço unitário</th>
					<th className="p-1">Desconto</th>
					<th className="p-1">Pago</th>
					<th className="p-1">Funcionário</th>
					<th className="p-1">Data</th>
					<th className="p-1">Acção</th>
				</tr>
				{productSales.length > 0 &&
					productSales.map((sale, i) => (
						<tr
							key={sale.id}
							className={` ${
								i % 2 == 0 ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'
							} `}
						>
							<td className="p-1">{sale.id}</td>

							<td className="p-1">{sale.customer?.name}</td>
							<td className="p-1">{sale.category?.name}</td>
							<td className="p-1">{sale.product?.name}</td>
							<td className="p-1">{sale.color}</td>
							<td className="p-1">{sale.size}</td>
							<td className="p-1">{NumberUtils.format(sale.quantity)}</td>
							<td className="p-1">{NumberUtils.formatCurrency(sale.unit_price)}</td>
							<td className="p-1">{NumberUtils.formatCurrency(sale.discount)}</td>
							<td className="p-1">{NumberUtils.formatCurrency(sale.amount_paid)}</td>
							<td className="p-1">
								{StringUtils.getFirstAndLastWord(sale?.employee?.name as string)}
							</td>
							<td className="p-1">{DateUtils.getDatePt(sale.created_at)}</td>
							<td className="p-1">
								<CardActions
								// onClickDelete={() => handleOpenFormDelete(sale)}
								// onClickEdit={() => handleOpenDetalhe(sale)}
								/>
							</td>
						</tr>
					))}
			</table>
			{isLoading ? <Spinner /> : productSales.length < 1 && <NoData />}
		</fieldset>
	)
}
