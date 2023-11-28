import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { Modal, ModalBody, ModalTitle } from '../modal'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { Spinner } from '../spinner'
import { DateUtils, GraphHtmlRefProps, GraphUtils, GraphValueProps } from '@/utils'
import { ButtonSubmit, Input, Select } from '../form-controls'
import { IconSearch } from '../icons'
import { HttpStatusCode } from '@/data/protocols/http'

type FilterDataProps = {
	year: number
	month: number
}

type GraphDataProps = {
	operations: GraphValueProps[]
	payment_methods: GraphValueProps[]
}

type CashRegisterGraphProps = {
	onClose: () => void
}

export function CashRegisterGraph({ onClose }: CashRegisterGraphProps) {
	const [loading, setLoading] = useState(true)
	const [graphData, setGraphData] = useState<GraphDataProps>({
		operations: [],
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

	const operationChartRef = useRef<GraphHtmlRefProps>(null)
	const paymentMethodChartRef = useRef<GraphHtmlRefProps>(null)

	const fetchData = () => {
		const { month, year } = filterData
		makeAuthorizeHttpClientDecorator()
			.request({
				method: 'post',
				url: makeApiUrl('/graphs/cash-register'),
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
			title: 'Operações',
			data: graphData.operations,
			htmlRef: operationChartRef,
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
			<ModalTitle>Gráfico de caixa</ModalTitle>
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
						<canvas ref={operationChartRef} />
					</div>
					<div className="p-4 border">
						<canvas ref={paymentMethodChartRef} />
					</div>
				</div>
			</ModalBody>
		</Modal>
	)
}