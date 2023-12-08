import { Chart, ChartType } from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { ArrayUtils } from './array-utils'
import { RefObject } from 'react'
import { NumberUtils } from './number-utils'

Chart.register(ChartDataLabels)

export type GraphValueProps = {
	field: string
	value: number
}

export type GraphType = ChartType

export type GraphHtmlRefProps = HTMLCanvasElement & { myChart: any }

type GraphBuilderProps = {
	title: string
	data: GraphValueProps[]
	htmlRef: RefObject<GraphHtmlRefProps>
	graphType: GraphType
}

export class GraphUtils {
	static buildGraph({ data, htmlRef, title, graphType }: GraphBuilderProps) {
		const graphData = ArrayUtils.order({
			data: data.map(({ field, value }) => ({
				field,
				value
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
								// barThickness: barWidth,
								backgroundColor: [
									'#047857',
									'#0891b2',
									'#2563eb',
									'#1e40af',
									'#eab308',
									'#d97706',
									'#b91c1c',
									'#7f1d1d'
								]
							}
						]
					},
					options: {
						plugins: {
							datalabels: {
								color: 'white',
								font: {
									weight: 'bold'
								},
								formatter: (value) => NumberUtils.format(value)
							}
						}
					}
				})
			}
		}
	}
}
