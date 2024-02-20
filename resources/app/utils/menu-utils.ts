import { SubmenuProps } from '@/presentation/components'

type RoleProps = {
	role?: 'Admin' | 'Normal'
}
export class MenuUtils {
	static readonly FRONT = {
		HOME: '/',
		ATHLETES: '/atletas',
		LOGIN: '/login',
		CASH_REGISTER: '/financas/caixa',
		TUITION_FEES: '/financas/mensalidades',
		FINANCES: '/financas',	
		EQUIPMENTS: '/equipamentos',
		PAYMENT: '/mensalidade',
		
		EMPLOYEES: '/funcionarios'
	}

	static readonly hrMenuItens = (param?: RoleProps): SubmenuProps[] => {
		const { role = 'Normal' } = param || {}
		if (role == 'Normal') return []

		const data = [{ link: this.FRONT.EMPLOYEES, text: 'Funcionários' }]
		return data
	}

	static readonly financeMenuItens = (param?: RoleProps): SubmenuProps[] => {
		const { role = 'Normal' } = param || {}
		const data = []
		if (role == 'Admin') {
			data.push(
				{ link: this.FRONT.CASH_REGISTER, text: 'Caixa' },
				{ link: this.FRONT.TUITION_FEES, text: 'Mensalidades' },
				{ link: '/stock', text: 'Estoque' }
			)
		}

		return data
	}
}
