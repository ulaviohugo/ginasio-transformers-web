import { SubmenuProps } from '../(presentation)/components'

export class SubmenuUtils {
	static readonly hr: SubmenuProps[] = [
		{ link: '/rh/funcionarios', text: 'Funcionários' },
		{ link: '/rh/folha-salarial', text: 'Folha salarial' }
	]

	static readonly commercial: SubmenuProps[] = [
		{ link: '/comercial/estoque', text: 'Estoque' },
		{ link: '/comercial/vendas', text: 'Venda' },
		{ link: '/comercial/caixa', text: 'Caixa' },
		{ link: '/comercial/categorias', text: 'Categorias' },
		{ link: '/comercial/produtos', text: 'Produtos' },
		{ link: '/comercial/fornecedores', text: 'Fornecedores' }
	]
}
