import { WorkStatementModel } from '@/domain/models'
import {
	DocumentSubmenu,
	Layout,
	LayoutBody,
	SubMenu,
	WorkStatementEditor,
	WorkStatementList
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { MenuUtils } from '@/utils'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export function WorkStatement() {
	const [selectedWorkStatement, setSelectedWorkStatement] = useState<WorkStatementModel>()

	const user = useSelector(useAuth())
	return (
		<Layout title="Declaração de trabalho">
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={MenuUtils.hrMenuItens({ role: user.role })} />
					<DocumentSubmenu />

					<WorkStatementEditor data={selectedWorkStatement} />
					<WorkStatementList onSelect={setSelectedWorkStatement} />
				</div>
			</LayoutBody>
		</Layout>
	)
}
