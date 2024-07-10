import { SubmenuProps } from '@/presentation/components'

type RoleProps = {
	role?: 'Admin' | 'Normal'
}
export class MenuUtils {
	static readonly FRONT = {
		HOME: '/',
		ATHLETES: '/areaDoAtleta/atletas',
		ATHLETESAREA: '/areaDoAtleta',
		LOGIN: '/login',
		CASH_REGISTER: '/financas/caixa',
		TUITION_FEES: '/areaDoAtleta/mensalidades',
		FINANCES: '/financas',	
		EQUIPMENTS: '/equipamentos',
		GYMS: '/ginasios',
		LESSONS: '/aulas',
		
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
			)
		}

		return data
	}
	static readonly athletesareaMenuItens = (param?: RoleProps): SubmenuProps[] => {
		const { role = 'Normal' } = param || {}
		const data = []
		if ((role == 'Admin') || (role == 'Normal')) {
			data.push(
				{ link: this.FRONT.ATHLETES, text: 'Atletas' },
				{ link: this.FRONT.TUITION_FEES, text: 'Mensalidades' },
			)
		}

		return data
	}
}
