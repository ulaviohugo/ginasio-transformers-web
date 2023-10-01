'use client'

import {
	IconUser,
	InsuredEditor,
	Layout,
	LayoutBody,
	Title
} from '@/(presentation)/components'

export default function Segurados() {
	return (
		<Layout>
			<LayoutBody>
				<InsuredEditor />
				<Title title="Segurados" icon={IconUser} />
			</LayoutBody>
		</Layout>
	)
}
