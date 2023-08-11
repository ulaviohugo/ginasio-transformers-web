import { Employee } from '../domain/models'

type EmployeeType = Record<keyof Employee, string>

export class LabelUtils {
	private static employeeFields: EmployeeType = {
		id: 'Identificação',
		name: 'Nome',
		gender: 'Género',
		dateOfBirth: 'Data de nascimento',
		maritalStatus: 'Estado civil',
		educationDegree: 'Nível académico',
		phone1: 'Telefone 1',
		phone2: 'Telefone 2',
		email: 'E-mail',
		countryId: 'País',
		provinceId: 'Província',
		municipalityId: 'Município',
		residentialAddress: 'Endereço residencial',
		documentType: 'Tipo de documento',
		documentNumber: 'Número do documento',
		nif: 'NIF',
		dependents: 'Número de dependentes',
		socialSecurity: 'Segurança social',
		position: 'Cargo',
		baseSalary: 'Salário base',
		hireDate: 'Data da contratação',
		contractEndDate: 'Data de fim de contrato',
		bankName: 'Banco',
		iban: 'IBAN',
		accountNumber: 'Nº de conta bancária',
		createdAt: 'Data de criação',
		createdBy: 'Criado por',
		updatedAt: 'Data de atualização',
		updatedBy: 'Atualizado por'
	}

	private static translateEmployeeField(field: keyof Employee) {
		return this.employeeFields[field] || null
	}

	static translateField<T extends object = any>(field: keyof T) {
		const employee = this.translateEmployeeField(field as any)
		if (employee) return employee
		return field
	}
}
