import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
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
import { useInsureds, useLocations } from '@/presentation/hooks'
import { AddInsured } from '@/domain/usecases'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { loadInsuredStore } from '@/presentation/redux'

type PolicyholderEditorProps = {
	policyholder?: InsuredModel
	addInsured: AddInsured
	onSubmitSuccess?: () => void
}

export function PolicyholderEditor({
	addInsured,
	policyholder,
	onSubmitSuccess
}: PolicyholderEditorProps) {
	const dispatch = useDispatch()
	const currentInsureds = useSelector(useInsureds())

	const { provinces, municipalities } = useSelector(useLocations())
	const [municipalityList, setMunicipalityList] = useState<MunicipalityProps[]>([])

	const [formData, setFormData] = useState<InsuredModel>({
		...policyholder,
		enrollment_date: new Date()
	} as InsuredModel)

	const [insuredItems, setInsuredItems] = useState<any>({ 0: {} })

	const insuredList = useMemo(() => Object.keys(insuredItems), [insuredItems])

	const [isLoading, setIsLoading] = useState(false)

	const provinceList = useMemo(
		() => provinces.filter((province) => province.country_id == 1),
		[provinces]
	)

	useEffect(() => {
		if (policyholder) {
			const municipality = municipalities.filter(
				(municipality) => municipality.province_id == policyholder?.province_id
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
		if (name == 'province_id') {
			data = { ...data, municipality_id: undefined }
			setMunicipalityList(
				municipalities.filter((municipality) => municipality.province_id == Number(value))
			)
		}

		setFormData(data)
	}

	const handleAddInsuredItem = () => {
		const data = { ...insuredItems }
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
		const policyholder_id = policyholder?.id
		if (name == 'category_id') {
			data = { ...data, [name]: value, product_id: undefined, policyholder_id }
		} else {
			data = { ...data, [name]: value, policyholder_id }
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
			const httpResponse = (await addInsured.add({
				...formData,
				insureds
			})) as InsuredModel

			const { insureds: insuredList } = httpResponse
			let data
			if (insuredList?.length) {
				data = [httpResponse, ...insuredList, ...currentInsureds]
			} else {
				data = [httpResponse, ...currentInsureds]
			}
			dispatch(loadInsuredStore(data))
			if (onSubmitSuccess) onSubmitSuccess()
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
								name="proposal_number"
								id="proposal_number"
								value={formData?.proposal_number || ''}
								label={LabelUtils.translateField('proposal_number')}
								onChange={handleChange}
							/>
							<Input
								name="policy_number"
								id="policy_number"
								value={formData?.policy_number || ''}
								label={LabelUtils.translateField('policy_number')}
								onChange={handleChange}
							/>
							<Select
								name="proposal_type"
								id="proposal_type"
								value={formData?.proposal_type || ''}
								label={LabelUtils.translateField('proposal_type')}
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
								name="card_name"
								id="card_name"
								value={formData?.card_name || ''}
								label={LabelUtils.translateField('card_name')}
								onChange={handleChange}
							/>
							<Input
								type="date"
								name="date_of_birth"
								id="date_of_birth"
								value={
									formData?.date_of_birth
										? DateUtils.getDate(formData?.date_of_birth)
										: ''
								}
								label={LabelUtils.translateField('date_of_birth')}
								onChange={handleChange}
							/>
							<Input
								name="age"
								id="age"
								value={
									formData?.date_of_birth ? DateUtils.getAge(formData?.date_of_birth) : ''
								}
								label={'Idade'}
								disabled
								onChange={handleChange}
							/>
							<Select
								name="document_type"
								id="document_type"
								value={formData?.document_type || ''}
								label={LabelUtils.translateField('document_type')}
								data={DocumentUtils.docs.map((doc) => ({ text: doc }))}
								defaultText="Selecione"
								onChange={handleChange}
							/>
							<Input
								name="document_number"
								id="document_number"
								value={formData?.document_number || ''}
								label={LabelUtils.translateField('document_number')}
								disabled={!formData?.document_type}
								onChange={handleChange}
							/>
							<Input
								type="date"
								name="document_issue_date"
								id="document_issue_date"
								value={
									formData?.document_issue_date
										? DateUtils.getDate(formData?.document_issue_date)
										: ''
								}
								label={LabelUtils.translateField('document_issue_date')}
								disabled={!formData?.document_type}
								onChange={handleChange}
							/>
							<Input
								name="nif"
								id="nif"
								value={formData?.nif || ''}
								label={LabelUtils.translateField('nif')}
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
								name="marital_status"
								id="marital_status"
								value={formData?.marital_status || ''}
								label={LabelUtils.translateField('marital_status')}
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
								name="province_id"
								id="province_id"
								value={formData?.province_id || ''}
								label={LabelUtils.translateField('province_id')}
								data={provinceList.map(({ id, name }) => ({ text: name, value: id }))}
								defaultText="Selecione"
								onChange={handleChange}
							/>
							<Select
								name="municipality_id"
								id="municipality_id"
								value={formData?.municipality_id || ''}
								label={LabelUtils.translateField('municipality_id')}
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
								name="enrollment_date"
								id="enrollment_date"
								value={
									formData?.enrollment_date
										? DateUtils.getDate(formData.enrollment_date)
										: ''
								}
								label={LabelUtils.translateField('enrollment_date')}
								onChange={handleChange}
							/>
							<Input
								type="date"
								name="renewal_date"
								id="renewal_date"
								value={
									formData?.renewal_date ? DateUtils.getDate(formData.renewal_date) : ''
								}
								label={LabelUtils.translateField('renewal_date')}
								onChange={handleChange}
							/>
							<Input
								name="card_number"
								id="card_number"
								value={formData?.card_number || ''}
								label={LabelUtils.translateField('card_number')}
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
