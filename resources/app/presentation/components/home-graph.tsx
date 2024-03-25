import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { DateUtils, GraphHtmlRefProps, GraphUtils, GraphValueProps } from '@/utils'
import { HttpStatusCode } from '@/data/protocols/http'
import { Spinner } from './spinner'
import { Button, Input } from './form-controls'
import { IconSearch } from './icons'

type FilterDataProps = {
	year: number
}

export type HomeGraphDataProps = {
	monthly_fees: GraphValueProps[]
}

type HomeGraphProps = {
	data:HomeGraphDataProps
}

export function HomeGraph({ data }: HomeGraphProps) {
	const [loading, setLoading] = useState(true)
	const [graphData, setGraphData] = useState<HomeGraphDataProps>(data)

	const currentDate = new Date()
	const [filterData, setFilterData] = useState<FilterDataProps>({
		year: currentDate.getFullYear()
	})

	const handleFilterInputChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target
		setFilterData({ ...filterData, [name]: value })
	}

	const operationChartRef = useRef<GraphHtmlRefProps>(null)

	useEffect(() => {
		GraphUtils.buildGraph({
			title: 'Mensalidades',
			data: data.monthly_fees,
			htmlRef: operationChartRef,
			graphType: 'bar'
		})
	}, [data])

	return (
		<div>
			<fieldset className="inline-flex gap-2 mb-3">
				<legend>Filtro</legend>
				<Input
					type="number"
					name="year"
					label="Ano"
					value={filterData.year}
					onChange={handleFilterInputChange}
				/>
			</fieldset>
			<div className="grid grid-cols-1 gap-4">
				<div className="p-4 border">
					<canvas ref={operationChartRef} />
				</div>
			</div>
		</div>
	)
}
