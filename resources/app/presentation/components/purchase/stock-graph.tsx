import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { Modal, ModalBody, ModalTitle } from '../modal'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { Spinner } from '../spinner'
import { DateUtils, GraphUtils, GraphValueProps } from '@/utils'
import { ButtonSubmit, Input, Select } from '../form-controls'
import { IconSearch } from '../icons'

type FilterDataProps = {
	year: number
	month: number
}

type GraphDataProps = {
	products: GraphValueProps[]
	categories: GraphValueProps[]
	payment_methods: GraphValueProps[]
}

type StockGraphProps = {
	onClose: () => void
}

export function StockGraph({ onClose }: StockGraphProps) {
	const [loading, setLoading] = useState(true)
	const [graphData, setGraphData] = useState<GraphDataProps>({
		categories: [],
		products: [],
		payment_methods: []
	})

	const currentDate = new Date()
	const [filterData, setFilterData] = useState<FilterDataProps>({
		year: currentDate.getFullYear(),
		month: currentDate.getMonth() + 1
	})

	const handleFilterInputChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target
		setFilterData({ ...filterData, [name]: value })
	}

	const productChartRef = useRef<HTMLCanvasElement & { myChart: any }>(null)
	const categoryChartRef = useRef<HTMLCanvasElement & { myChart: any }>(null)
	const paymentMethodChartRef = useRef<HTMLCanvasElement & { myChart: any }>(null)

	const fetchData = () => {
		const { month, year } = filterData
		makeAuthorizeHttpClientDecorator()
			.request({
				method: 'post',
				url: makeApiUrl('/graphs/stock-store'),
				body: { month, year }
			})
			.then(({ body }) => setGraphData(body))
			.catch(({ message }) => toast.error(message))
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		GraphUtils.buildGraph({
			title: 'Produtos',
			data: graphData.products,
			htmlRef: productChartRef,
			graphType: 'bar'
		})
		GraphUtils.buildGraph({
			title: 'Categorias',
			data: graphData.categories,
			htmlRef: categoryChartRef,
			graphType: 'bar'
		})
		GraphUtils.buildGraph({
			title: 'Métodos de pagamento',
			data: graphData.payment_methods,
			htmlRef: paymentMethodChartRef,
			graphType: 'bar'
		})
	}, [graphData])

	return (
		<Modal show onClose={onClose}>
			<ModalTitle>Gráfico de entradas (Loja)</ModalTitle>
			<ModalBody>
				{loading && <Spinner data="Carregando dados..." />}
				<fieldset className="inline-flex gap-2 mb-3">
					<legend>Filtro</legend>
					<Input
						type="number"
						name="year"
						label="Ano"
						value={filterData.year}
						onChange={handleFilterInputChange}
					/>
					<Select
						name="month"
						label="Mês"
						data={DateUtils.getMonthListExt().map((month, index) => ({
							text: month,
							value: index + 1
						}))}
						value={filterData.month}
						onChange={handleFilterInputChange}
					/>
					<div className="flex items-end">
						<ButtonSubmit
							text="Filtrar"
							icon={IconSearch}
							className="h-7"
							onClick={fetchData}
						/>
					</div>
				</fieldset>
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 border">
						<canvas ref={productChartRef} />
					</div>
					<div className="p-4 border">
						<canvas ref={categoryChartRef} />
					</div>
					<div className="p-4 border">
						<canvas ref={paymentMethodChartRef} />
					</div>
				</div>
			</ModalBody>
		</Modal>
	)
}
