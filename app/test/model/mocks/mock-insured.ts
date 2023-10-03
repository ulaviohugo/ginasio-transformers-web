import { InsuredModel } from '@/domain/models'

export const mockInsured = (): InsuredModel => {
	const currentDate = new Date()
	return {
		enrollmentDate: new Date('2023-10-02T15:19:02.528Z'),
		proposalNumber: '1',
		policyNumber: '123',
		proposalType: 'Novo Co-Seguro',
		mediator: 'Santos Paul',
		name: 'Samuel Freitas',
		cardName: 'Samuel Freitas',
		dateOfBirth: new Date('1992-05-08'),
		documentType: 'Bilhete de identidade',
		documentNumber: '001355049LA037',
		documentIssueDate: new Date('2020-01-01'),
		nif: '001355049LA037',
		gender: 'Masculino',
		student: 'NÃO',
		occupation: 'Engenheiro Informático',
		dependents: 1,
		maritalStatus: 'Casado(a)',
		provinceId: 17,
		municipalityId: 264,
		neighborhood: 'Coreia',
		address: 'Heróis',
		email: 'samuelfreitas.ao@gmail.com',
		phone: '930 690 710',
		plan: 'Familiar',
		policy: 'Ouro',
		renewalDate: new Date('2022-01-01'),
		cardNumber: '123456',
		review: 'Excelente',
		insureds: [
			{
				name: 'Sílvia Freitas',
				cardName: 'Sílvia Freitas',
				dateOfBirth: new Date('1990-08-15'),
				documentType: 'Bilhete de identidade',
				documentNumber: '001355049LA035',
				nif: '001355049LA035',
				gender: 'Feminino',
				student: 'NÃO',
				occupation: 'Enfermeira',
				phone: '929 203 460',
				relationship: 'Esposo (a)'
			},
			{
				name: 'Alana Freitas',
				cardName: 'Alana Freitas',
				dateOfBirth: new Date('2019-09-16'),
				documentType: 'Cartão de residência',
				documentNumber: '123',
				gender: 'Feminino',
				student: 'SIM',
				relationship: 'Filho (a)'
			}
		] as InsuredModel[]
	}
}
