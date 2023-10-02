'use client'

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import {
	ButtonSubmit,
	Input,
	InputEmail,
	InputPhone,
	InsuredCardChangeProps,
	PolicyholderInsuredEditor,
	Select
} from '..'
import {
	ArrayUtils,
	DateUtils,
	DocumentUtils,
	LabelUtils,
	MunicipalityProps,
	NumberUtils,
	ObjectUtils
} from '@/utils'
import { InsuredModel } from '@/domain/models'
import { useLocations } from '@/(presentation)/hooks'
import { AddInsured } from '@/domain/usecases'
import toast from 'react-hot-toast'

type PolicyholderEditorProps = {
	policyholder?: InsuredModel
	addInsured: AddInsured
}

export function PolicyholderEditor({
	addInsured,
	policyholder
}: PolicyholderEditorProps) {
	const { provinces, municipalities } = useLocations()
	const [municipalityList, setMunicipalityList] = useState<MunicipalityProps[]>([])

	const [formData, setFormData] = useState<InsuredModel>({
		...policyholder,
		enrollmentDate: new Date()
	} as InsuredModel)

	const [insuredItems, setInsuredItems] = useState<any>({ 0: {} })

	const insuredList = useMemo(() => Object.keys(insuredItems), [insuredItems])

	const [isLoading, setIsLoading] = useState(false)

	const provinceList = useMemo(
		() => provinces.filter((province) => province.countryId == 1),
		[provinces]
	)

	useEffect(() => {
		if (policyholder) {
			const municipality = municipalities.filter(
				(municipality) => municipality.provinceId == policyholder?.provinceId
			)
			setMunicipalityList(municipality)

			if (policyholder?.insureds?.length)
				setInsuredItems(ObjectUtils.convertToObject(policyholder.insureds))
		}
	}, [provinces, policyholder])

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target

		console.log({ name, value })

		let data = { ...formData, [name]: value }
		if (name == 'provinceId') {
			data = { ...data, municipalityId: undefined }
			setMunicipalityList(
				municipalities.filter((municipality) => municipality.provinceId == Number(value))
			)
		}

		setFormData(data)
	}

	const handleAddInsuredItem = () => {
		let data = { ...insuredItems }
		const keys = Object.keys(data)

		const key =
			ArrayUtils.getGreaterValue(
				keys.map((keyItem) => NumberUtils.convertToNumber(keyItem))
			) + 1
		Object.assign(data, { [key]: {} })
		setInsuredItems(data)
	}

	const handleChangeInsured = ({ index, name, value }: InsuredCardChangeProps) => {
		let data = insuredItems[index] || { [index]: { [name]: value } }[index]
		const policyholderId = policyholder?.id
		if (name == 'categoryId') {
			data = { ...data, [name]: value, productId: undefined, policyholderId }
		} else {
			data = { ...data, [name]: value, policyholderId }
		}
		setInsuredItems({ ...insuredItems, [index]: data })
	}

	const handleRemoveProductItem = (index: number) => {
		let data = { ...insuredItems }
		data = ObjectUtils.removeProps(data, [`${index}`])

		setInsuredItems(data)
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const insureds = ArrayUtils.convertToArray(insuredItems)
			const httpResponse = await addInsured.add({ ...formData, insureds })
			toast.success('Segurado cadastrado com sucesso')
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="my-4">
			<div className="grid lg:grid-cols-6 gap-2 items-start">
				<div className="lg:col-span-4">
					<fieldset>
						<legend>Titular do co-seguro</legend>
						<div className="grid grid-cols-3 gap-2">
							<Input
								name="proposalNumber"
								id="proposalNumber"
								value={formData?.proposalNumber || ''}
								label={LabelUtils.translateField('proposalNumber')}
								onChange={handleChange}
							/>
							<Input
								name="policyNumber"
								id="policyNumber"
								value={formData?.policyNumber || ''}
								label={LabelUtils.translateField('policyNumber')}
								onChange={handleChange}
							/>
							<Select
								name="proposalType"
								id="proposalType"
								value={formData?.proposalType || ''}
								label={LabelUtils.translateField('proposalType')}
								data={[{ text: 'Novo Co-Seguro' }, { text: 'Alteração do Plano' }]}
								defaultText="Selecione"
								onChange={handleChange}
							/>
							<Input
								name="mediator"
								id="mediator"
								value={formData?.mediator || ''}
								label={LabelUtils.translateField('mediator')}
								onChange={handleChange}
							/>
							<Input
								name="name"
								id="name"
								value={formData?.name || ''}
								label={LabelUtils.translateField('insured')}
								onChange={handleChange}
							/>
							<Input
								name="cardName"
								id="cardName"
								value={formData?.cardName || ''}
								label={LabelUtils.translateField('cardName')}
								onChange={handleChange}
							/>
							<Input
								type="date"
								name="dateOfBirth"
								id="dateOfBirth"
								value={
									formData?.dateOfBirth ? DateUtils.getDate(formData?.dateOfBirth) : ''
								}
								label={LabelUtils.translateField('dateOfBirth')}
								onChange={handleChange}
							/>
							<Input
								name="age"
								id="age"
								value={
									formData?.dateOfBirth ? DateUtils.getAge(formData?.dateOfBirth) : ''
								}
								label={'Idade'}
								disabled
								onChange={handleChange}
							/>
							<Select
								name="documentType"
								id="documentType"
								value={formData?.documentType || ''}
								label={LabelUtils.translateField('documentType')}
								data={DocumentUtils.docs.map((doc) => ({ text: doc }))}
								defaultText="Selecione"
								onChange={handleChange}
							/>
							<Input
								name="documentNumber"
								id="documentNumber"
								value={formData?.documentNumber || ''}
								label={LabelUtils.translateField('documentNumber')}
								disabled={!formData?.documentType}
								onChange={handleChange}
							/>
							<Input
								type="date"
								name="documentIssueDate"
								id="documentIssueDate"
								value={(formData?.documentIssueDate as any) || ''}
								label={LabelUtils.translateField('documentIssueDate')}
								disabled={!formData?.documentType}
								onChange={handleChange}
							/>
							<Select
								name="gender"
								id="gender"
								value={formData?.gender || ''}
								label={LabelUtils.translateField('gender')}
								data={[{ text: 'Masculino' }, { text: 'Feminino' }]}
								defaultText="Selecione"
								onChange={handleChange}
							/>
							<Select
								name="student"
								id="student"
								value={formData?.student || ''}
								label={LabelUtils.translateField('student')}
								data={[{ text: 'SIM' }, { text: 'NÃO' }]}
								defaultText="Selecione"
								onChange={handleChange}
							/>
							<Input
								name="occupation"
								id="occupation"
								value={(formData?.occupation as any) || ''}
								label={LabelUtils.translateField('occupation')}
								onChange={handleChange}
							/>
							<Input
								type="number"
								name="dependents"
								id="dependents"
								value={(formData?.dependents as any) || 0}
								label={LabelUtils.translateField('dependents')}
								onChange={handleChange}
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
								onChange={handleChange}
							/>
							<Select
								name="provinceId"
								id="provinceId"
								value={formData?.provinceId || ''}
								label={LabelUtils.translateField('provinceId')}
								data={provinceList.map(({ id, name }) => ({ text: name, value: id }))}
								defaultText="Selecione"
								onChange={handleChange}
							/>
							<Select
								name="municipalityId"
								id="municipalityId"
								value={formData?.municipalityId || ''}
								label={LabelUtils.translateField('municipalityId')}
								data={municipalityList.map(({ id, name }) => ({ text: name, value: id }))}
								defaultText="Selecione"
								onChange={handleChange}
							/>
							<Input
								name="neighborhood"
								id="neighborhood"
								value={formData?.neighborhood || ''}
								label={LabelUtils.translateField('neighborhood')}
								onChange={handleChange}
							/>
							<Input
								name="address"
								id="address"
								value={formData?.address || ''}
								label={LabelUtils.translateField('address')}
								onChange={handleChange}
							/>
							<InputEmail
								name="email"
								id="email"
								value={formData?.email || ''}
								label={LabelUtils.translateField('email')}
								onChange={handleChange}
							/>
							<InputPhone
								name="phone"
								id="phone"
								value={formData?.phone || ''}
								label={LabelUtils.translateField('phone')}
								onChange={handleChange}
							/>
							<InputPhone
								name="comercial"
								id="comercial"
								value={formData?.comercial || ''}
								label={LabelUtils.translateField('comercial')}
								onChange={handleChange}
							/>
							<Select
								name="plan"
								id="plan"
								value={formData?.plan || ''}
								label={LabelUtils.translateField('plan')}
								data={[
									{ text: 'Empresarial' },
									{ text: 'Familiar' },
									{ text: 'Individual' }
								]}
								defaultText="Selecione"
								onChange={handleChange}
							/>
							<Select
								name="policy"
								id="policy"
								value={formData?.policy || ''}
								label={LabelUtils.translateField('policy')}
								data={[{ text: 'Cobre' }, { text: 'Prata' }, { text: 'Ouro' }]}
								defaultText="Selecione"
								onChange={handleChange}
							/>
							<Input
								type="date"
								name="enrollmentDate"
								id="enrollmentDate"
								value={
									formData?.enrollmentDate
										? DateUtils.getDate(formData.enrollmentDate)
										: ''
								}
								label={LabelUtils.translateField('enrollmentDate')}
								onChange={handleChange}
							/>
							<Input
								type="date"
								name="renewalDate"
								id="renewalDate"
								value={
									formData?.renewalDate ? DateUtils.getDate(formData.renewalDate) : ''
								}
								label={LabelUtils.translateField('renewalDate')}
								onChange={handleChange}
							/>
							<Input
								name="cardNumber"
								id="cardNumber"
								value={formData?.cardNumber || ''}
								label={LabelUtils.translateField('cardNumber')}
								onChange={handleChange}
							/>
							<Select
								name="review"
								id="review"
								value={formData?.review || ''}
								label={LabelUtils.translateField('review')}
								data={[{ text: 'Bom' }, { text: 'Excelente' }, { text: 'Mau' }]}
								defaultText="Selecione"
								onChange={handleChange}
							/>
						</div>
					</fieldset>
				</div>
				<fieldset className="lg:col-span-2">
					<legend>Segurados ({insuredList.length})</legend>
					<div className="pb-2">
						<span className="btn-primary" onClick={handleAddInsuredItem}>
							Adicionar segurado
						</span>
					</div>
					<div className="flex flex-col gap-2 max-h-[500px] overflow-auto">
						{insuredList.map((key, index) => (
							<PolicyholderInsuredEditor
								key={key}
								itemIndex={Number(key)}
								index={index}
								insured={insuredItems[key]}
								onChange={handleChangeInsured}
								onRemoveItem={handleRemoveProductItem}
							/>
						))}
					</div>
				</fieldset>
			</div>
			<div className="flex mt-2">
				<ButtonSubmit isLoading={isLoading} disabled={isLoading} />
			</div>
		</form>
	)
}
