import { InsuredModel } from '@/domain/models'

export const mockInsured = (): InsuredModel => {
	return {
		id: 1,
		enrollment_date: new Date('2023-10-02T15:19:02.528Z'),
		proposal_number: '1',
		policy_number: '123',
		proposal_type: 'Novo Co-Seguro',
		mediator: 'Santos Paul',
		name: 'Samuel Freitas',
		card_name: 'Samuel Freitas',
		date_of_birth: new Date('1992-05-08'),
		document_type: 'Bilhete de identidade',
		document_number: '001355049LA037',
		document_issue_date: new Date('2020-01-01'),
		nif: '001355049LA037',
		gender: 'Masculino',
		student: 'NÃO',
		occupation: 'Engenheiro Informático',
		dependents: 1,
		marital_status: 'Casado(a)',
		province_id: 17,
		municipality_id: 264,
		neighborhood: 'Coreia',
		address: 'Heróis',
		email: 'samuelfreitas.ao@gmail.com',
		phone: '930 690 710',
		plan: 'Familiar',
		policy: 'Ouro',
		renewal_date: new Date('2022-01-01'),
		card_number: '123456',
		review: 'Excelente',
		insureds: [
			{
				name: 'Sílvia Freitas',
				card_name: 'Sílvia Freitas',
				date_of_birth: new Date('1990-08-15'),
				document_type: 'Bilhete de identidade',
				document_number: '001355049LA035',
				nif: '001355049LA035',
				gender: 'Feminino',
				student: 'NÃO',
				occupation: 'Enfermeira',
				phone: '929 203 460',
				relationship: 'Esposo (a)'
			},
			{
				name: 'Alana Freitas',
				card_name: 'Alana Freitas',
				date_of_birth: new Date('2019-09-16'),
				document_type: 'Cartão de residência',
				document_number: '123',
				gender: 'Feminino',
				student: 'SIM',
				relationship: 'Filho (a)'
			}
		] as any
	}
}
