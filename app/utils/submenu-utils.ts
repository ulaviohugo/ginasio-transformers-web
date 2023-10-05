import { SubmenuProps } from '@/(presentation)/components'

type RoleProps = {
	role?: 'Admin' | 'Normal'
}
export class SubmenuUtils {
	static readonly hr = (param?: RoleProps): SubmenuProps[] => {
		const { role = 'Normal' } = param || {}
		const data = [
			{ link: '/rh/funcionarios', text: 'Funcionários' },
			{ link: '/rh/presenca', text: 'Presença' },
			{ link: '/rh/folha-salarial', text: 'Folha salarial' }
		]
		return data
	}

	static readonly commercial = (param?: RoleProps): SubmenuProps[] => {
		const { role = 'Normal' } = param || {}
		const data = []
		if (role == 'Admin') {
			data.push({ link: '/comercial/estoque', text: 'Estoque' })
		}
		data.push({ link: '/comercial/vendas', text: 'Venda' })
		if (role == 'Admin') {
			data.push(
				{ link: '/comercial/caixa', text: 'Caixa' },
				{ link: '/comercial/categorias', text: 'Categorias' },
				{ link: '/comercial/produtos', text: 'Produtos' },
				{ link: '/comercial/fornecedores', text: 'Fornecedores' },
				{ link: '/comercial/clientes', text: 'Clientes' },
				{ link: '/comercial/apolice', text: 'Apólice' },
				{ link: '/comercial/factura', text: 'Factura' }
			)
		}
		return data
	}
}
