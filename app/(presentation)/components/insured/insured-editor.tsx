'use client'

import { ChangeEvent, useMemo, useState } from 'react'
import { Input, InputEmail, InputPhone, Select } from '..'
import { DateUtils, DocumentUtils } from '@/utils'
import { InsuredModel } from '@/domain/models'
import { useLocations } from '@/(presentation)/hooks'

export function InsuredEditor() {
	const { provinces, municipalities } = useLocations()
	const [formData, setFormData] = useState<InsuredModel>({
		enrollmentDate: new Date()
	} as InsuredModel)

	const provinceList = useMemo(
		() => provinces.filter((province) => province.countryId == 1),
		[]
	)

	const municipalityList = useMemo(
		() =>
			formData?.provinceId
				? municipalities.filter(
						(municipality) => municipality.provinceId == formData.provinceId
				  )
				: municipalities,
		[formData?.provinceId]
	)

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target

		console.log({ name, value })

		let data = { ...formData, [name]: value }
		if (name == 'provinceId') {
			data = { ...data, municipalityId: undefined }
		}

		setFormData(data)
	}

	return (
		<fieldset className="my-4">
			<legend>Novo segurado</legend>
			<div className="grid grid-cols-4 gap-2">
				<Input
					name="proposalNumber"
					id="proposalNumber"
					value={formData?.proposalNumber || ''}
					label="Proposta nº"
					onChange={onChange}
				/>
				<Input
					name="policyNumber"
					id="policyNumber"
					value={formData?.policyNumber || ''}
					label="Apólice"
					onChange={onChange}
				/>
				<Select
					name="proposalType"
					id="proposalType"
					value={formData?.proposalType || ''}
					label="Proposta"
					data={[{ text: 'Novo Co-Seguro' }, { text: 'Alteração do Plano' }]}
					defaultText="Selecione"
					onChange={onChange}
				/>
				<Input
					name="mediator"
					id="mediator"
					value={formData?.mediator || ''}
					label="Mediador"
					onChange={onChange}
				/>
				<Input
					name="name"
					id="name"
					value={formData?.name || ''}
					label="Nome do segurado"
					onChange={onChange}
				/>
				<Input
					name="cardName"
					id="cardName"
					value={formData?.cardName || ''}
					label="Nome a constar no cartão"
					onChange={onChange}
				/>
				<Input
					type="date"
					name="dateOfBirth"
					id="dateOfBirth"
					value={formData?.dateOfBirth ? DateUtils.getDate(formData?.dateOfBirth) : ''}
					label="Data de nascimento"
					onChange={onChange}
				/>
				<Input
					name="age"
					id="age"
					value={formData?.dateOfBirth ? DateUtils.getAge(formData?.dateOfBirth) : ''}
					label="Idade"
					disabled
					onChange={onChange}
				/>
				<Select
					name="documentType"
					id="documentType"
					value={formData?.documentType || ''}
					label="Tipo de documento"
					data={DocumentUtils.docs.map((doc) => ({ text: doc }))}
					defaultText="Selecione"
					onChange={onChange}
				/>
				<Input
					name="documentNumber"
					id="documentNumber"
					value={formData?.documentNumber || ''}
					label="Nº do documento"
					disabled={!formData?.documentType}
					onChange={onChange}
				/>
				<Input
					name="documentIssueDate"
					id="documentIssueDate"
					value={(formData?.documentIssueDate as any) || ''}
					label="Data de emissão"
					disabled={!formData?.documentType}
					onChange={onChange}
				/>
				<Select
					name="gender"
					id="gender"
					value={formData?.gender || ''}
					label="Sexo"
					data={[{ text: 'Masculino' }, { text: 'Feminino' }]}
					defaultText="Selecione"
					onChange={onChange}
				/>
				<Select
					name="student"
					id="student"
					value={formData?.student || ''}
					label="Estudante"
					data={[{ text: 'SIM' }, { text: 'NÃO' }]}
					defaultText="Selecione"
					onChange={onChange}
				/>
				<Input
					name="occupation"
					id="occupation"
					value={(formData?.occupation as any) || ''}
					label="Profissão/actividade"
					onChange={onChange}
				/>
				<Input
					type="number"
					name="dependents"
					id="dependents"
					value={(formData?.dependents as any) || 0}
					label="Dependentes"
					onChange={onChange}
				/>
				<Select
					name="maritalStatus"
					id="maritalStatus"
					value={formData?.maritalStatus || ''}
					label="Estado civil"
					data={[
						{ text: 'Solteiro(a)' },
						{ text: 'Casado(a)' },
						{ text: 'Divorciado(a)' },
						{ text: 'Viúvo(a)' }
					]}
					defaultText="Selecione"
					onChange={onChange}
				/>
				<Select
					name="provinceId"
					id="provinceId"
					value={formData?.provinceId || ''}
					label="Província"
					data={provinceList.map(({ id, name }) => ({ text: name, value: id }))}
					defaultText="Selecione"
					onChange={onChange}
				/>
				<Select
					name="municipalityId"
					id="municipalityId"
					value={formData?.municipalityId || ''}
					label="Município"
					data={municipalityList.map(({ id, name }) => ({ text: name, value: id }))}
					defaultText="Selecione"
					onChange={onChange}
				/>
				<Input
					name="neighborhood"
					id="neighborhood"
					value={formData?.neighborhood || ''}
					label="Bairro"
					onChange={onChange}
				/>
				<Input
					name="address"
					id="address"
					value={formData?.address || ''}
					label="Endereço"
					onChange={onChange}
				/>
				<InputEmail
					name="email"
					id="email"
					value={formData?.email || ''}
					label="E-mail"
					onChange={onChange}
				/>
				<InputPhone
					name="phone"
					id="phone"
					value={formData?.phone || ''}
					label="Telefone"
					onChange={onChange}
				/>
				<InputPhone
					name="comercial"
					id="comercial"
					value={formData?.comercial || ''}
					label="Comercial"
					onChange={onChange}
				/>
				<Select
					name="plan"
					id="plan"
					value={formData?.plan || ''}
					label="Plano"
					data={[{ text: 'Empresarial' }, { text: 'Familiar' }, { text: 'Individual' }]}
					defaultText="Selecione"
					onChange={onChange}
				/>
				<Select
					name="policy"
					id="policy"
					value={formData?.policy || ''}
					label="Co-Seguro"
					data={[{ text: 'Cobre' }, { text: 'Prata' }, { text: 'Ouro' }]}
					defaultText="Selecione"
					onChange={onChange}
				/>
				<Input
					type="date"
					name="enrollmentDate"
					id="enrollmentDate"
					value={
						formData?.enrollmentDate ? DateUtils.getDate(formData.enrollmentDate) : ''
					}
					label="Data de adesão"
					onChange={onChange}
				/>
				<Input
					type="date"
					name="renewalDate"
					id="renewalDate"
					value={formData?.enrollmentDate ? DateUtils.getDate(formData.renewalDate) : ''}
					label="Data de renovação"
					onChange={onChange}
				/>
				<Select
					name="relationship"
					id="relationship"
					value={formData?.relationship || ''}
					label="Parentesco"
					data={[
						{ text: 'Pai' },
						{ text: 'Mãe' },
						{ text: 'Filho (a)' },
						{ text: 'Irmão (a)' }
					]}
					defaultText="Selecione"
					onChange={onChange}
				/>
			</div>
		</fieldset>
	)
}
