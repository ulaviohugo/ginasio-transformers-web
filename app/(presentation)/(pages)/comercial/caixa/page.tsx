'use client'

import { IconCashRegister, Layout, LayoutBody, Title } from '@/(presentation)/components'

export default function Caixa() {
	return (
		<Layout>
			<LayoutBody>
				<Title title="Caixa" icon={IconCashRegister} />
				<div className="flex">
					<div></div>
				</div>
			</LayoutBody>
		</Layout>
	)
}
