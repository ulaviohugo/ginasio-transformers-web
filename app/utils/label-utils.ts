import { Category, Employee, Product, Purchase, Supplier } from '../domain/models'

type FieldTypes = Partial<Record<keyof Category, string>> &
	Partial<Record<keyof Employee, string>> &
	Partial<Record<keyof Product, string>> &
	Partial<Record<keyof Supplier, string>> &
	Partial<Record<keyof Purchase, string>>

export class LabelUtils {
	private static labelFields: FieldTypes = {
		accountNumber: 'Nº de conta bancária',
		baseSalary: 'Salário base',
		bankName: 'Banco',
		businessAddress: 'Endereço comercial',
		categoryId: 'Categoria',
		color: 'Cor',
		contractEndDate: 'Data de fim de contrato',
		countryId: 'País',
		createdAt: 'Data de criação',
		createdById: 'Criado por',
		dateOfBirth: 'Data de nascimento',
		dependents: 'Número de dependentes',
		documentNumber: 'Número do documento',
		documentType: 'Tipo de documento',
		dueDate: 'Data de vencimento',
		educationDegree: 'Nível académico',
		email: 'E-mail',
		gender: 'Género',
		hireDate: 'Data da contratação',
		iban: 'IBAN',
		id: 'Identificação',
		maritalStatus: 'Estado civil',
		municipalityId: 'Município',
		name: 'Nome',
		nif: 'NIF',
		paid: 'Pago',
		paymentMethod: 'Forma de pagamento',
		phone: 'Telefone',
		phone1: 'Telefone 1',
		phone2: 'Telefone 2',
		position: 'Cargo',
		price: 'Preço',
		productId: 'Produto',
		purchaseDate: 'Data de entrada',
		provinceId: 'Província',
		quantity: 'Quantidade',
		residentialAddress: 'Endereço residencial',
		representative: 'Representante',
		sellingPriceUnit: 'Preço de venda/unidade',
		size: 'Tamanho',
		socialSecurity: 'Segurança social',
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
