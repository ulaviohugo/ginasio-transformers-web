import { SubmenuProps } from '../(presentation)/components'

export class SubmenuUtils {
	static readonly hr: SubmenuProps[] = [
		{ link: '/rh', text: 'Funcionários' },
		{ link: '/rh/folha-salarial', text: 'Folha salarial' }
	]

	static readonly commercial: SubmenuProps[] = [
		{ link: '/comercial', text: 'Entrada' },
		{ link: '/comercial/saida', text: 'Saída' },
		{ link: '/comercial/caixa', text: 'Caixa' },
		{ link: '/comercial/estoque', text: 'Estoque' },
		{ link: '/comercial/categorias', text: 'Categorias' },
		{ link: '/comercial/produtos', text: 'Produtos' }
	]
}
