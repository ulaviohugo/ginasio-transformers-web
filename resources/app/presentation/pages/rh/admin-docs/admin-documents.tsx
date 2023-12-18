import { DocumentSubmenu, Layout, LayoutBody, SubMenu } from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { MenuUtils } from '@/utils'
import React from 'react'
import { useSelector } from 'react-redux'

export function AdminDocuments() {
	const user = useSelector(useAuth())
	return (
		<Layout title="Documentos administrativos">
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={MenuUtils.hrMenuItens({ role: user.role })} />
					<DocumentSubmenu />
				</div>
				<div className="flex-1 flex justify-center items-center text-xl">
					Documentos administrativos
				</div>
			</LayoutBody>
		</Layout>
	)
}
