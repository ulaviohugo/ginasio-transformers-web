import { Metadata } from 'next'
import { IconUser, Layout, LayoutBody } from '../components'
import { StringUtils } from '@/app/utils'
import { ElementType } from 'react'

export const metadata: Metadata = {
	title: 'Sistema de Facuturação WO'
}

type DashboardProps = {
	text: string
	number: number
	icon?: ElementType
}
const data: DashboardProps[] = [
	{ text: 'Funcionários', number: 4, icon: IconUser },
	{ text: 'Entrada', number: 23 }
]

export default function Home() {
	return (
		<Layout>
			<LayoutBody>
				<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 p-2">
					{data.map(({ text, number, icon: Icon }, i) => (
						<div key={i} className="flex gap-2 shadow-md p-4 rounded-lg">
							{Icon && <Icon className="text-7xl" />}
							<div className={`flex-1`}>
								<h2 className="">{text}</h2>
								<div className="text-5xl font-bold">{number}</div>
							</div>
						</div>
					))}
				</div>
			</LayoutBody>
		</Layout>
	)
}
