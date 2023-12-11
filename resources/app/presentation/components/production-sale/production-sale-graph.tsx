import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { Modal, ModalBody, ModalTitle } from '../modal'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { Spinner } from '../spinner'
import { DateUtils, GraphHtmlRefProps, GraphUtils, GraphValueProps } from '@/utils'
import { Button, Input, Select } from '../form-controls'
import { IconSearch } from '../icons'
import { HttpStatusCode } from '@/data/protocols/http'

type FilterDataProps = {
	year: number
	month: number
}

type GraphDataProps = {
	products_quantity: GraphValueProps[]
	products_amount: GraphValueProps[]
	categories_quantity: GraphValueProps[]
	categories_amount: GraphValueProps[]
	payment_methods_quantity: GraphValueProps[]
	payment_methods_amount: GraphValueProps[]
	employees_quantity: GraphValueProps[]
	employees_amount: GraphValueProps[]
}

type ProductionSaleGraphProps = {
	onClose: () => void
}

export function ProductionSaleGraph({ onClose }: ProductionSaleGraphProps) {
	const [loading, setLoading] = useState(true)
	const [graphData, setGraphData] = useState<GraphDataProps>({
		categories_quantity: [],
		categories_amount: [],
		products_quantity: [],
		products_amount: [],
		payment_methods_quantity: [],
		payment_methods_amount: [],
		employees_quantity: [],
		employees_amount: []
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

	const productQuantityChartRef = useRef<GraphHtmlRefProps>(null)
	const productAmountChartRef = useRef<GraphHtmlRefProps>(null)
	const categoryQuantityChartRef = useRef<GraphHtmlRefProps>(null)
	const categoryAmountChartRef = useRef<GraphHtmlRefProps>(null)
	const paymentMethodAmountChartRef = useRef<GraphHtmlRefProps>(null)
	const employeesQuantityChartRef = useRef<GraphHtmlRefProps>(null)
	const employeesAmountChartRef = useRef<GraphHtmlRefProps>(null)

	const fetchData = () => {
		const { month, year } = filterData
		makeAuthorizeHttpClientDecorator()
			.request({
				method: 'post',
				url: makeApiUrl('/graphs/production-sale'),
				body: { month, year }
			})
			.then(({ body, statusCode }) => {
				if (statusCode != HttpStatusCode.ok) return toast.error(body)
				setGraphData(body)
			})
			.catch(({ message }) => toast.error(message))
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		GraphUtils.buildGraph({
			title: 'Quantidade',
			data: graphData.products_quantity,
			htmlRef: productQuantityChartRef,
			graphType: 'bar'
		})
		GraphUtils.buildGraph({
			title: 'Saída',
			data: graphData.products_amount,
			htmlRef: productAmountChartRef,
			graphType: 'bar'
		})

		GraphUtils.buildGraph({
			title: 'Quantidade',
			data: graphData.categories_quantity,
			htmlRef: categoryQuantityChartRef,
			graphType: 'bar'
		})
		GraphUtils.buildGraph({
			title: 'Saída',
			data: graphData.categories_amount,
			htmlRef: categoryAmountChartRef,
			graphType: 'bar'
		})

		GraphUtils.buildGraph({
			title: 'Saída',
			data: graphData.payment_methods_amount,
			htmlRef: paymentMethodAmountChartRef,
			graphType: 'bar'
		})

		GraphUtils.buildGraph({
			title: 'Quantidade',
			data: graphData.employees_quantity,
			htmlRef: employeesQuantityChartRef,
			graphType: 'bar'
		})
		GraphUtils.buildGraph({
			title: 'Saída',
			data: graphData.employees_amount,
			htmlRef: employeesAmountChartRef,
			graphType: 'bar'
		})
	}, [graphData])

	return (
		<Modal show onClose={onClose}>
			<ModalTitle>Gráfico de saídas (Produção)</ModalTitle>
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
						<Button
							variant="gray-light"
							text="Filtrar"
							icon={IconSearch}
							className="h-7"
							onClick={fetchData}
						/>
					</div>
				</fieldset>
				<div className="grid gap-4">
					<fieldset className="grid grid-cols-2">
						<legend>Categorias</legend>
						<div className="shadow-lg m-2">
							<canvas ref={categoryQuantityChartRef} />
						</div>
						<div className="shadow-lg m-2">
							<canvas ref={categoryAmountChartRef} />
						</div>
					</fieldset>
					<fieldset className="grid grid-cols-2">
						<legend>Produtos</legend>
						<div className="shadow-lg m-2">
							<canvas ref={productQuantityChartRef} />
						</div>
						<div className="shadow-lg m-2">
							<canvas ref={productAmountChartRef} />
						</div>
					</fieldset>
					<fieldset className="grid grid-cols-2">
						<legend>Métodos de pagamento</legend>
						<div className="shadow-lg m-2">
							<canvas ref={paymentMethodAmountChartRef} />
						</div>
					</fieldset>
					<fieldset className="grid grid-cols-2">
						<legend>Funcionário</legend>
						<div className="shadow-lg m-2">
							<canvas ref={employeesQuantityChartRef} />
						</div>
						<div className="shadow-lg m-2">
							<canvas ref={employeesAmountChartRef} />
						</div>
					</fieldset>
				</div>
			</ModalBody>
		</Modal>
	)
}
