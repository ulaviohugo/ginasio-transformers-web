import { SubmenuProps } from '@/presentation/components'

type RoleProps = {
	role?: 'Admin' | 'Normal'
}
export class MenuUtils {
	static readonly FRONT = {
		HOME: '/',
		LOGIN: '/login',
		BILLING: '/comercial/factura',
		CASH_REGISTER: '/comercial/caixa',
		CATEGORIES: '/comercial/categorias',
		CUSTOMERS: '/comercial/clientes',
		PRODUCTION_BUDGETS: '/comercial/orcamento-de-producao',
		COMERCIAL: '/comercial',
		HR: '/rh',
		POLICY: '/comercial/apolice',
		PRODUCTS: '/comercial/produtos',
		PRODUCTION: '/comercial/producao',
		PRODUCTION_STOCK: '/comercial/producao/estoque',
		PRODUCTION_SALES: '/comercial/producao/vendas',
		STORE: '/comercial/loja',
		STORE_STOCK: '/comercial/loja/estoque',
		STORE_SALES: '/comercial/loja/vendas',
		SUPPLIERS: '/comercial/fornecedores',

		EMPLOYEES: '/rh/funcionarios',
		EMPLOYEE_PRESENCES: '/rh/presenca',
		EMPLOYEE_SALARY_RECEIPT: '/rh/folha-salarial',

		NOTIFICATION: '/notificacoes'
	}

	static readonly hrMenuItens = (param?: RoleProps): SubmenuProps[] => {
		const { role = 'Normal' } = param || {}
		if (role == 'Normal') return []

		const data = [
			{ link: this.FRONT.EMPLOYEES, text: 'Funcionários' },
			{ link: this.FRONT.EMPLOYEE_PRESENCES, text: 'Presença' },
			{ link: this.FRONT.EMPLOYEE_SALARY_RECEIPT, text: 'Folha salarial' }
		]
		return data
	}

	static readonly commercialMenuItens = (param?: RoleProps): SubmenuProps[] => {
		const { role = 'Normal' } = param || {}
		const data = []
		// if (role == 'Admin') {
		// 	data.push({ link: this.FRONT.STORE_STOCK, text: 'Compra' })
		// }
		data.push({ link: this.FRONT.STORE, text: 'Loja' })
		if (role == 'Admin') {
			data.push(
				{ link: this.FRONT.PRODUCTION, text: 'Produção' },
				{ link: this.FRONT.CASH_REGISTER, text: 'Caixa' },
				{ link: this.FRONT.CATEGORIES, text: 'Categorias' },
				{ link: this.FRONT.PRODUCTS, text: 'Produtos' },
				{ link: this.FRONT.SUPPLIERS, text: 'Fornecedores' },
				{ link: this.FRONT.CUSTOMERS, text: 'Clientes' },
				{ link: this.FRONT.PRODUCTION_BUDGETS, text: 'Orçamento' }
				// { link: this.FRONT.POLICY, text: 'Apólice' },
				// { link: this.FRONT.BILLING, text: 'Factura' }
			)
		}
		return data
	}
}
