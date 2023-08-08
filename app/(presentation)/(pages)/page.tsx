import { Metadata } from 'next'
import { Layout, LayoutBody } from '../components'
import { NumberUtils, StringUtils } from '@/app/utils'

export const metadata: Metadata = {
	title: 'Sistema de Facuturação WO'
}

export default function Home() {
	return (
		<Layout>
			<LayoutBody>
				<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 p-2 h-full">
					{Array.from(Array(6)).map((_, i) => (
						<div
							key={i}
							className={`shadow-md p-4 ${
								[
									'bg-blue-50',
									'bg-rose-50',
									'bg-gray-50',
									'bg-blue-50',
									'bg-red-50',
									'bg-gray-50'
								][i]
							}`}
						>
							<h2 className="text-2xl">Card {i + 1}</h2>
							<div>
								{StringUtils.generate({ separator: ' ', decimal: 5, length: 100 })}
							</div>
						</div>
					))}
				</div>
			</LayoutBody>
		</Layout>
	)
}
