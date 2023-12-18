import React from 'react'
import { SubMenu } from './layout'
import { MenuUtils } from '@/utils'

export function DocumentSubmenu() {
	return (
		<SubMenu
			submenus={[
				{ text: 'Declaração', link: MenuUtils.FRONT.ADMIN_DOC_DECLARACAO },
				{
					text: 'Formulário de admissão',
					link: MenuUtils.FRONT.ADMIN_DOC_ADMISSAO
				},
				{
					text: 'Justificativo de faltas',
					link: MenuUtils.FRONT.ADMIN_DOC_JUSTIFICATIVO
				},
				{
					text: 'Reembolso',
					link: MenuUtils.FRONT.ADMIN_DOC_REEMBOLSO
				},
				{
					text: 'Requisição de féria',
					link: MenuUtils.FRONT.ADMIN_DOC_REQUISICAO_FERIA
				}
			]}
		/>
	)
}
