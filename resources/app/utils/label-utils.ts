import {
	CashRegisterModel,
	CategoryModel,
	CustomerModel,
	EmployeeModel,
	InsuredModel,
	ProductModel,
	StockModel,
	SaleModel,
	SupplierModel,
	TransactionModel
} from '@/domain/models'

type FieldTypes = Partial<Record<keyof CategoryModel, string>> &
	Partial<Record<keyof CustomerModel, string>> &
	Partial<Record<keyof EmployeeModel, string>> &
	Partial<Record<keyof ProductModel, string>> &
	Partial<Record<keyof SaleModel, string>> &
	Partial<Record<keyof SupplierModel, string>> &
	Partial<Record<keyof StockModel, string>> &
	Partial<Record<keyof TransactionModel, string>> &
	Partial<Record<keyof CashRegisterModel, string>> &
	Partial<Record<keyof InsuredModel, string>> & {
		insured?: string
		product_sales?: any
	}

export class LabelUtils {
	private static labelFields: FieldTypes = {
		account_number: 'Nº de Conta Bancária',
		address: 'Endereço',
		amount: 'Valor',
		balance: 'Saldo',
		bank_name: 'Nome do Banco',
		base_salary: 'Salário Base',
		bar_code: 'Código de Barra',
		category_id: 'Categoria',
		card_name: 'Nome do Cartão',
		card_number: 'Cartão Co-seguro',
		color: 'Cor',
		comercial: 'Comercial',
		contract_end_date: 'Data de Fim de Contrato',
		country_id: 'País',
		customer_id: 'Cliente',
		customer_type: 'Tipo de Cliente',
		created_at: 'Data de Criação',
		user_id: 'Criado por',
		date: 'Data',
		date_of_birth: 'Data de Nascimento',
		dependents: 'Número de Dependentes',
		description: 'Descrição',
		document_issue_date: 'Data de Emissão',
		document_number: 'Número do Documento',
		document_type: 'Tipo de Documento',
		due_date: 'Data de Vencimento',
		education_degree: 'Nível Académico',
		email: 'E-mail',
		employee_id: 'Funcionário',
		enrollment_date: 'Data de Adesão',
		gender: 'Género',
		hire_date: 'Data da Contratação',
		iban: 'IBAN',
		id: 'Identificação',
		initial_balance: 'Saldo Inicial',
		insured: 'Segurado',
		lot: 'Lote',
		marital_status: 'Estado Civil',
		mediator: 'Mediador',
		municipality_id: 'Município',
		name: 'Nome',
		max_stock: 'Estoque Máximo',
		min_stock: 'Estoque Mínimo',
		nif: 'NIF',
		neighborhood: 'Bairro',
		occupation: 'Profissão',
		operation_type: 'Tipo de Operação',
		paid: 'Pago',
		payment_method: 'Forma de Pagamento',
		plan: 'Plano',
		phone: 'Telefone',
		phone2: 'Telefone 2',
		position: 'Cargo',
		product_id: 'Produto',
		product_sales: 'Produtos',
		proposal_number: 'Nº proposta',
		proposal_type: 'Proposta',
		purchase_date: 'Data de Entrada',
		purchase_price: 'Preço de Compra',
		province_id: 'Província',
		quantity: 'Quantidade',
		renewal_date: 'Data de Renovação',
		representative: 'Representante',
		review: 'Avaliação do Serviço',
		selling_price: 'Preço de Venda',
		size: 'Tamanho',
		social_security: 'Segurança Social',
		supplier_id: 'Fornecedor',
		total_value: 'Valor Total',
		unit_price: 'Preço Unitário',
		updated_at: 'Data de Atualização',
		user_id_update: 'Atualizado por'
	}

	static translateField(field: keyof FieldTypes) {
		const label = this.labelFields[field] || null
		if (label) return label
		return field
	}
}
