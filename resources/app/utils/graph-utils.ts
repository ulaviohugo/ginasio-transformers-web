import { Chart } from 'chart.js'
import { ArrayUtils } from './array-utils'
import { RefObject } from 'react'
import { NumberUtils } from './number-utils'

export type GraphValueProps = {
	field: string
	value: number
}

type GraphBuilderProps = {
	title: string
	data: GraphValueProps[]
	htmlRef: RefObject<HTMLCanvasElement & { myChart: any }>
	graphType: 'bar'
}

export class GraphUtils {
	static buildGraph({ data, htmlRef, title, graphType }: GraphBuilderProps) {
		const graphData = ArrayUtils.order({
			data: data.map(({ field, value }) => ({
				field,
				value: NumberUtils.convertToNumber(value)
			})),
			field: 'value',
			orderOption: 'desc'
		})
		const labels = []
		const values = []

		for (let i = 0; i < graphData.length; i++) {
			const { field, value } = graphData[i]
			labels.push(field)
			values.push(value)
		}

		if (htmlRef.current) {
			const ctx = htmlRef.current?.getContext('2d') as CanvasRenderingContext2D

			if (htmlRef.current?.myChart) {
				htmlRef.current.myChart.data.labels = labels
				htmlRef.current.myChart.data.datasets[0].data = values
				htmlRef.current.myChart.update()
			} else {
				htmlRef.current.myChart = new Chart(ctx, {
					type: graphType,
					data: {
						labels,
						datasets: [
							{
								label: title.toLocaleUpperCase(),
								data: values,
								backgroundColor: ['#047857', '#0891b2', '#d97706', '#b91c1c']
							}
						]
					}
				})
			}
		}
	}
}
