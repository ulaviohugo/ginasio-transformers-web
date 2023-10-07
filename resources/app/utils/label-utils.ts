import {
	CashRegisterModel,
	CategoryModel,
	EmployeeModel,
	InsuredModel,
	ProductModel,
	PurchaseModel,
	SaleModel,
	SupplierModel,
	TransactionModel
} from '@/domain/models'

type FieldTypes = Partial<Record<keyof CategoryModel, string>> &
	Partial<Record<keyof EmployeeModel, string>> &
	Partial<Record<keyof ProductModel, string>> &
	Partial<Record<keyof SaleModel, string>> &
	Partial<Record<keyof SupplierModel, string>> &
	Partial<Record<keyof PurchaseModel, string>> &
	Partial<Record<keyof TransactionModel, string>> &
	Partial<Record<keyof CashRegisterModel, string>> &
	Partial<Record<keyof InsuredModel, string>> & {
		insured?: string
		product_sales?: any
	}

export class LabelUtils {
	private static labelFields: FieldTypes = {
		account_number: 'Nº de conta bancária',
		address: 'Endereço',
		amount: 'Valor',
		balance: 'Saldo',
		bank_name: 'Nome do banco',
		base_salary: 'Salário base',
		bar_code: 'Código de barra',
		category_id: 'Categoria',
		card_name: 'Nome do cartão',
		card_number: 'Cartão co-seguro',
		color: 'Cor',
		comercial: 'Comercial',
		contract_end_date: 'Data de fim de contrato',
		country_id: 'País',
		customer_id: 'Cliente',
		created_at: 'Data de criação',
		user_id: 'Criado por',
		date_of_birth: 'Data de nascimento',
		dependents: 'Número de dependentes',
		description: 'Descrição',
		documentIssueDate: 'Data de emissão',
		document_number: 'Número do documento',
		document_type: 'Tipo de documento',
		due_date: 'Data de vencimento',
		education_degree: 'Nível académico',
		email: 'E-mail',
		employee_id: 'Funcionário',
		enrollment_date: 'Data de adesão',
		gender: 'Género',
		hire_date: 'Data da contratação',
		iban: 'IBAN',
		id: 'Identificação',
		initial_balance: 'Saldo inicial',
		insured: 'Segurado',
		lot: 'Lote',
		marital_status: 'Estado civil',
		mediator: 'Mediador',
		municipality_id: 'Município',
		name: 'Nome',
		nif: 'NIF',
		neighborhood: 'Bairro',
		occupation: 'Profissão',
		operation_type: 'Tipo de operação',
		paid: 'Pago',
		payment_method: 'Forma de pagamento',
		plan: 'Plano',
		phone: 'Telefone',
		phone2: 'Telefone 2',
		position: 'Cargo',
		policy: 'Apólice',
		policyholder: 'Titular do co-seguro',
		policy_number: 'Apólice',
		price: 'Preço',
		product_id: 'Produto',
		product_sales: 'Produtos',
		proposal_number: 'Nº proposta',
		proposal_type: 'Proposta',
		purchase_date: 'Data de entrada',
		province_id: 'Província',
		quantity: 'Quantidade',
		relationship: 'Parentesco/vínculo laboral',
		renewal_date: 'Data de renovação',
		representative: 'Representante',
		review: 'Avaliação do serviço',
		selling_price_unit: 'Preço de venda/unidade',
		size: 'Tamanho',
		social_security: 'Segurança social',
		student: 'Estudante',
		supplier_id: 'Fornecedor',
		total_value: 'Valor total',
		unit_price: 'Preço unitário',
		updated_at: 'Data de atualização',
		user_id_update: 'Atualizado por'
	}

	static translateField(field: keyof FieldTypes) {
		const label = this.labelFields[field] || null
		if (label) return label
		return field
	}
}
