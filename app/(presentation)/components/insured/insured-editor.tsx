'use client'

import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import { ButtonSubmit, Input, InputEmail, InputPhone, Select } from '..'
import { DateUtils, DocumentUtils, LabelUtils } from '@/utils'
import { InsuredModel } from '@/domain/models'
import { useLocations } from '@/(presentation)/hooks'

export function InsuredEditor() {
	const { provinces, municipalities } = useLocations()
	const [formData, setFormData] = useState<InsuredModel>({
		enrollmentDate: new Date()
	} as InsuredModel)

	const [isLoading, setIsLoading] = useState(false)

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

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		setTimeout(() => setIsLoading(false), 1000)
	}

	return (
		<fieldset className="my-4">
			<legend>Novo segurado</legend>
			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-4 gap-2">
					<Input
						name="proposalNumber"
						id="proposalNumber"
						value={formData?.proposalNumber || ''}
						label={LabelUtils.translateField('proposalNumber')}
						onChange={onChange}
					/>
					<Input
						name="policyNumber"
						id="policyNumber"
						value={formData?.policyNumber || ''}
						label={LabelUtils.translateField('policyNumber')}
						onChange={onChange}
					/>
					<Select
						name="proposalType"
						id="proposalType"
						value={formData?.proposalType || ''}
						label={LabelUtils.translateField('proposalType')}
						data={[{ text: 'Novo Co-Seguro' }, { text: 'Alteração do Plano' }]}
						defaultText="Selecione"
						onChange={onChange}
					/>
					<Input
						name="mediator"
						id="mediator"
						value={formData?.mediator || ''}
						label={LabelUtils.translateField('mediator')}
						onChange={onChange}
					/>
					<Input
						name="policyholder"
						id="policyholder"
						value={formData?.policyholder || ''}
						label={LabelUtils.translateField('policyholder')}
						onChange={onChange}
					/>
					<Input
						name="name"
						id="name"
						value={formData?.name || ''}
						label={LabelUtils.translateField('insured')}
						onChange={onChange}
					/>
					<Input
						name="cardName"
						id="cardName"
						value={formData?.cardName || ''}
						label={LabelUtils.translateField('cardName')}
						onChange={onChange}
					/>
					<Input
						type="date"
						name="dateOfBirth"
						id="dateOfBirth"
						value={formData?.dateOfBirth ? DateUtils.getDate(formData?.dateOfBirth) : ''}
						label={LabelUtils.translateField('dateOfBirth')}
						onChange={onChange}
					/>
					<Input
						name="age"
						id="age"
						value={formData?.dateOfBirth ? DateUtils.getAge(formData?.dateOfBirth) : ''}
						label={'Idade'}
						disabled
						onChange={onChange}
					/>
					<Select
						name="documentType"
						id="documentType"
						value={formData?.documentType || ''}
						label={LabelUtils.translateField('documentType')}
						data={DocumentUtils.docs.map((doc) => ({ text: doc }))}
						defaultText="Selecione"
						onChange={onChange}
					/>
					<Input
						name="documentNumber"
						id="documentNumber"
						value={formData?.documentNumber || ''}
						label={LabelUtils.translateField('documentNumber')}
						disabled={!formData?.documentType}
						onChange={onChange}
					/>
					<Input
						name="documentIssueDate"
						id="documentIssueDate"
						value={(formData?.documentIssueDate as any) || ''}
						label={LabelUtils.translateField('documentIssueDate')}
						disabled={!formData?.documentType}
						onChange={onChange}
					/>
					<Select
						name="gender"
						id="gender"
						value={formData?.gender || ''}
						label={LabelUtils.translateField('gender')}
						data={[{ text: 'Masculino' }, { text: 'Feminino' }]}
						defaultText="Selecione"
						onChange={onChange}
					/>
					<Select
						name="student"
						id="student"
						value={formData?.student || ''}
						label={LabelUtils.translateField('student')}
						data={[{ text: 'SIM' }, { text: 'NÃO' }]}
						defaultText="Selecione"
						onChange={onChange}
					/>
					<Input
						name="occupation"
						id="occupation"
						value={(formData?.occupation as any) || ''}
						label={LabelUtils.translateField('occupation')}
						onChange={onChange}
					/>
					<Input
						type="number"
						name="dependents"
						id="dependents"
						value={(formData?.dependents as any) || 0}
						label={LabelUtils.translateField('dependents')}
						onChange={onChange}
					/>
					<Select
						name="maritalStatus"
						id="maritalStatus"
						value={formData?.maritalStatus || ''}
						label={LabelUtils.translateField('maritalStatus')}
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
						label={LabelUtils.translateField('provinceId')}
						data={provinceList.map(({ id, name }) => ({ text: name, value: id }))}
						defaultText="Selecione"
						onChange={onChange}
					/>
					<Select
						name="municipalityId"
						id="municipalityId"
						value={formData?.municipalityId || ''}
						label={LabelUtils.translateField('municipalityId')}
						data={municipalityList.map(({ id, name }) => ({ text: name, value: id }))}
						defaultText="Selecione"
						onChange={onChange}
					/>
					<Input
						name="neighborhood"
						id="neighborhood"
						value={formData?.neighborhood || ''}
						label={LabelUtils.translateField('neighborhood')}
						onChange={onChange}
					/>
					<Input
						name="address"
						id="address"
						value={formData?.address || ''}
						label={LabelUtils.translateField('address')}
						onChange={onChange}
					/>
					<InputEmail
						name="email"
						id="email"
						value={formData?.email || ''}
						label={LabelUtils.translateField('email')}
						onChange={onChange}
					/>
					<InputPhone
						name="phone"
						id="phone"
						value={formData?.phone || ''}
						label={LabelUtils.translateField('phone')}
						onChange={onChange}
					/>
					<InputPhone
						name="comercial"
						id="comercial"
						value={formData?.comercial || ''}
						label={LabelUtils.translateField('comercial')}
						onChange={onChange}
					/>
					<Select
						name="plan"
						id="plan"
						value={formData?.plan || ''}
						label={LabelUtils.translateField('plan')}
						data={[{ text: 'Empresarial' }, { text: 'Familiar' }, { text: 'Individual' }]}
						defaultText="Selecione"
						onChange={onChange}
					/>
					<Select
						name="policy"
						id="policy"
						value={formData?.policy || ''}
						label={LabelUtils.translateField('policy')}
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
						label={LabelUtils.translateField('enrollmentDate')}
						onChange={onChange}
					/>
					<Input
						type="date"
						name="renewalDate"
						id="renewalDate"
						value={
							formData?.enrollmentDate ? DateUtils.getDate(formData.renewalDate) : ''
						}
						label={LabelUtils.translateField('renewalDate')}
						onChange={onChange}
					/>
					<Select
						name="relationship"
						id="relationship"
						value={formData?.relationship || ''}
						label={LabelUtils.translateField('relationship')}
						data={[
							{ text: 'Pai' },
							{ text: 'Mãe' },
							{ text: 'Filho (a)' },
							{ text: 'Irmão (a)' }
						]}
						defaultText="Selecione"
						onChange={onChange}
					/>
					<Input
						name="cardNumber"
						id="cardNumber"
						value={formData?.cardNumber || ''}
						label={LabelUtils.translateField('cardNumber')}
						onChange={onChange}
					/>
					<Select
						name="review"
						id="review"
						value={formData?.review || ''}
						label={LabelUtils.translateField('review')}
						data={[{ text: 'Bom' }, { text: 'Excelente' }, { text: 'Mau' }]}
						defaultText="Selecione"
						onChange={onChange}
					/>
				</div>
				<div className="flex mt-2">
					<ButtonSubmit isLoading={isLoading} disabled={isLoading} />
				</div>
			</form>
		</fieldset>
	)
}
