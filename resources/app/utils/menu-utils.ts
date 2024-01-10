import { SubmenuProps } from '@/presentation/components'

type RoleProps = {
	role?: 'Admin' | 'Normal'
}
export class MenuUtils {
	static readonly FRONT = {
		HOME: '/',
		ATHLETES: '/atletas',
		LOGIN: '/login',
		CASH_REGISTER: '/caixa',
		HR: '/rh',

		EMPLOYEES: '/funcionarios'
	}

	static readonly hrMenuItens = (param?: RoleProps): SubmenuProps[] => {
		const { role = 'Normal' } = param || {}
		if (role == 'Normal') return []

		const data = [{ link: this.FRONT.EMPLOYEES, text: 'Funcionários' }]
		return data
	}

	static readonly commercialMenuItens = (param?: RoleProps): SubmenuProps[] => {
		const { role = 'Normal' } = param || {}
		const data = []
		if (role == 'Admin') {
			data.push({ link: this.FRONT.CASH_REGISTER, text: 'Caixa' })
		}

		return data
	}
}
