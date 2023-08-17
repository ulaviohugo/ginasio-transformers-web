import { Category, Employee, Product, Supplier } from '../domain/models'

type FieldTypes = Partial<Record<keyof Category, string>> &
	Partial<Record<keyof Employee, string>> &
	Partial<Record<keyof Product, string>> &
	Partial<Record<keyof Supplier, string>>

export class LabelUtils {
	private static labelFields: FieldTypes = {
		accountNumber: 'Nº de conta bancária',
		baseSalary: 'Salário base',
		bankName: 'Banco',
		businessAddress: 'Endereço comercial',
		categoryId: 'Categoria',
		contractEndDate: 'Data de fim de contrato',
		countryId: 'País',
		createdAt: 'Data de criação',
		createdBy: 'Criado por',
		dateOfBirth: 'Data de nascimento',
		dependents: 'Número de dependentes',
		documentNumber: 'Número do documento',
		documentType: 'Tipo de documento',
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
		phone: 'Telefone',
		phone1: 'Telefone 1',
		phone2: 'Telefone 2',
		position: 'Cargo',
		price: 'Preço',
		productId: 'Produto',
		provinceId: 'Província',
		residentialAddress: 'Endereço residencial',
		representative: 'Representante',
		socialSecurity: 'Segurança social',
		unitPrice: 'Preço unitário',
		updatedAt: 'Data de atualização',
		updatedBy: 'Atualizado por'
	}

	static translateField(field: keyof FieldTypes) {
		const label = this.labelFields[field] || null
		if (label) return label
		return field
	}
}
