import { SubmenuProps } from '@/presentation/components'

type RoleProps = {
	role?: 'Admin' | 'Normal'
}
export class MenuUtils {
	static readonly FRONT = {
		HOME: '/',
		BILLING: '/comercial/factura',
		CASH_REGISTER: '/comercial/caixa',
		CATEGORIES: '/comercial/categorias',
		CUSTOMERS: '/comercial/clientes',
		POLICY: '/comercial/apolice',
		PRODUCTS: '/comercial/produtos',
		STOCK: '/comercial/estoque',
		SALES: '/comercial/vendas',
		SUPPLIERS: '/comercial/fornecedores',

		EMPLOYEES: '/rh/funcionarios',
		EMPLOYEE_PRESENCES: '/rh/presenca',
		EMPLOYEE_SALARY_RECEIPT: '/rh/folha-salarial'
	}

	static readonly hrMenuItens = (param?: RoleProps): SubmenuProps[] => {
		const { role = 'Normal' } = param || {}
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
		if (role == 'Admin') {
			data.push({ link: this.FRONT.STOCK, text: 'Estoque' })
		}
		data.push({ link: this.FRONT.SALES, text: 'Venda' })
		if (role == 'Admin') {
			data.push(
				{ link: this.FRONT.CASH_REGISTER, text: 'Caixa' },
				{ link: this.FRONT.CATEGORIES, text: 'Categorias' },
				{ link: this.FRONT.PRODUCTS, text: 'Produtos' },
				{ link: this.FRONT.SUPPLIERS, text: 'Fornecedores' },
				{ link: this.FRONT.CUSTOMERS, text: 'Clientes' },
				{ link: this.FRONT.POLICY, text: 'Apólice' },
				{ link: this.FRONT.BILLING, text: 'Factura' }
			)
		}
		return data
	}
}
