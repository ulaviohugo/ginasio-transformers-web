import {
	CategoryModel,
	EmployeeModel,
	InsuredModel,
	ProductModel,
	PurchaseModel,
	SaleModel,
	SupplierModel
} from '@/domain/models'

type FieldTypes = Partial<Record<keyof CategoryModel, string>> &
	Partial<Record<keyof EmployeeModel, string>> &
	Partial<Record<keyof ProductModel, string>> &
	Partial<Record<keyof SaleModel, string>> &
	Partial<Record<keyof SupplierModel, string>> &
	Partial<Record<keyof PurchaseModel, string>> &
	Partial<Record<keyof InsuredModel, string>> & {
		insured?: string
	}

export class LabelUtils {
	private static labelFields: FieldTypes = {
		accountNumber: 'Nº de conta bancária',
		address: 'Endereço',
		baseSalary: 'Salário base',
		bankName: 'Nome do banco',
		barCode: 'Código de barra',
		businessAddress: 'Endereço comercial',
		categoryId: 'Categoria',
		cardName: 'Nome do cartão',
		cardNumber: 'Cartão co-seguro',
		color: 'Cor',
		comercial: 'Comercial',
		contractEndDate: 'Data de fim de contrato',
		countryId: 'País',
		customerId: 'Cliente',
		createdAt: 'Data de criação',
		createdById: 'Criado por',
		dateOfBirth: 'Data de nascimento',
		dependents: 'Número de dependentes',
		documentIssueDate: 'Data de emissão',
		documentNumber: 'Número do documento',
		documentType: 'Tipo de documento',
		dueDate: 'Data de vencimento',
		educationDegree: 'Nível académico',
		email: 'E-mail',
		employeeId: 'Funcionário',
		enrollmentDate: 'Data de adesão',
		gender: 'Género',
		hireDate: 'Data da contratação',
		iban: 'IBAN',
		id: 'Identificação',
		insured: 'Segurado',
		lot: 'Lote',
		maritalStatus: 'Estado civil',
		mediator: 'Mediador',
		municipalityId: 'Município',
		name: 'Nome',
		nif: 'NIF',
		neighborhood: 'Bairro',
		occupation: 'Profissão',
		paid: 'Pago',
		paymentMethod: 'Forma de pagamento',
		plan: 'Plano',
		phone: 'Telefone',
		phone1: 'Telefone 1',
		phone2: 'Telefone 2',
		position: 'Cargo',
		policy: 'Apólice',
		policyholder: 'Titular do co-seguro',
		policyNumber: 'Apólice',
		price: 'Preço',
		productId: 'Produto',
		proposalNumber: 'Nº proposta',
		proposalType: 'Proposta',
		purchaseDate: 'Data de entrada',
		provinceId: 'Província',
		quantity: 'Quantidade',
		relationship: 'Parentesco/vínculo laboral',
		renewalDate: 'Data de renovação',
		representative: 'Representante',
		residentialAddress: 'Endereço residencial',
		review: 'Avaliação do serviço',
		sellingPriceUnit: 'Preço de venda/unidade',
		size: 'Tamanho',
		socialSecurity: 'Segurança social',
		student: 'Estudante',
		supplierId: 'Fornecedor',
		totalValue: 'Valor total',
		unitPrice: 'Preço unitário',
		updatedAt: 'Data de atualização',
		updatedById: 'Atualizado por'
	}

	static translateField(field: keyof FieldTypes) {
		const label = this.labelFields[field] || null
		if (label) return label
		return field
	}
}
