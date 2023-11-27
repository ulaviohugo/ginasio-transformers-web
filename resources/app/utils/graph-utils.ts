import { Chart } from 'chart.js'
import { ArrayUtils } from './array-utils'
import { RefObject } from 'react'

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
			data: data,
			field: 'value',
			orderOption: 'desc'
		})
		const labels = graphData.map(({ field }) => field)
		const values = graphData.map(({ value }) => value)
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
								label: title,
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
