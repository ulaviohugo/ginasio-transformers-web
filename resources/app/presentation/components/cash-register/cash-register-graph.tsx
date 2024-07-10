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
import { GymModel } from '@/domain/models/gym'
import { useAuth } from '@/presentation/hooks'
import { useSelector } from 'react-redux'

type FilterDataProps = {
	year: number
	month: number
	gym_id: number
}

export type GraphDataProps = {
	operations_amount: GraphValueProps[]
	payment_methods_amount: GraphValueProps[]
}

type CashRegisterGraphProps = {
	onClose: () => void
}

export function CashRegisterGraph({ onClose }: CashRegisterGraphProps) {
	const [loading, setLoading] = useState(true)
	const [gyms, setGyms] = useState<GymModel[]>([])
	const user = useSelector(useAuth())
	const isAdmin = user.gym_id != null
	const [graphData, setGraphData] = useState<GraphDataProps>({
		operations_amount: [],
		payment_methods_amount: []
	})

	const currentDate = new Date()
	const [filterData, setFilterData] = useState<FilterDataProps>({
		year: currentDate.getFullYear(),
		month: currentDate.getMonth() + 1,
		gym_id: '' as any
	})

	const handleFilterInputChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target
		setFilterData({ ...filterData, [name]: value })
	}

	const fetchData = () => {
		const { month, year, gym_id } = filterData
		setLoading(true)
		makeAuthorizeHttpClientDecorator()
			.request({
				method: 'post',
				url: makeApiUrl('/graphs/cash-register'),
				body: { month, year, gym_id }
			})
			.then(({ body, statusCode }) => {
				if (statusCode != HttpStatusCode.ok) return toast.error(body)
				setGraphData(body)
			})
			.catch(({ message }) => toast.error(message))
			.finally(() => setLoading(false))
	}

	
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

	useEffect(() => {
		if (user.gym_id) {
			setFilterData({...filterData,gym_id:user.gym_id})
		}
	}, [user.gym_id])

	useEffect(() => {
		if (gyms.length > 0) {
		  fetchData()
		}
	  }, [gyms,filterData.month, filterData.year, filterData.gym_id]) 

	const operationChartRef = useRef<GraphHtmlRefProps>(null)
	const paymentMethodChartRef = useRef<GraphHtmlRefProps>(null)


	useEffect(() => {
		GraphUtils.buildGraph({
			title: 'Operações',
			data: graphData.operations_amount,
			htmlRef: operationChartRef,
			graphType: 'bar'
		})
		GraphUtils.buildGraph({
			title: 'Métodos de pagamento',
			data: graphData.payment_methods_amount,
			htmlRef: paymentMethodChartRef,
			graphType: 'bar'
		})
	}, [graphData])

	return (
		<Modal show onClose={onClose}>
			<ModalTitle>Gráfico de caixa</ModalTitle>
			<ModalBody>
				<fieldset className="inline-flex gap-2 mb-3">
					<legend>Filtro {loading && <Spinner />}</legend>
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
					<Select
						name="gym_id"
						onChange={handleFilterInputChange}
						label="Selecione a Filial"
						required
						data={gyms.map((gym) => ({ text: gym.name, value: gym.id }))}
						value={isAdmin ? user.gym_id : filterData?.gym_id || ''} // Modificado para usar a condição isAdmin
						defaultText="Selecione"
						disabled={isAdmin}
					/>
					<div className="flex items-end">
						<Button
							variant="gray-light"
							text="Filtrar"
							rightIcon={IconSearch}
							isLoading={loading}
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
