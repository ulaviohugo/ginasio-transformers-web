import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { EmployeeModel } from '@/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	IconUser,
	ImagePreview,
	Input,
	InputEmail,
	InputIBAN,
	InputPhone,
	InputPrice,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	Select
} from '..'

import {
	DateUtils,
	DocumentUtils,
	LabelUtils,
	MunicipalityProps,
	ProvinceProps
} from '@/utils'
import { addEmployeeStore, updateEmployeeStore } from '@/presentation/redux'
import { AddEmployee, UpdateEmployee } from '@/domain/usecases'
import { useLocations } from '@/presentation/hooks'

type EmployeeEditorProps = {
	employee?: EmployeeModel
	show: boolean
	onClose: () => void
	addEmployee: AddEmployee
	updateEmployee: UpdateEmployee
}

export function EmployeeEditor({
	employee,
	show,
	onClose,
	addEmployee,
	updateEmployee
}: EmployeeEditorProps) {
	const dispatch = useDispatch()
	const { countries, provinces, municipalities } = useSelector(useLocations())

	const [provinceList, setProvinceList] = useState<ProvinceProps[]>([])
	const [municipalityList, setMunicipalityList] = useState<MunicipalityProps[]>([])

	const [formDate, setFormData] = useState<EmployeeModel>(
		employee || ({} as EmployeeModel)
	)
	const [isLoading, setIsLoading] = useState(false)
	const [photoPreview, setPhotoPreview] = useState('')

	useEffect(() => {
		if (employee) {
			setProvinceList(
				provinces.filter((province) => province.country_id == employee.country_id)
			)
			setMunicipalityList(
				municipalities.filter(
					(municipality) => municipality.province_id == employee.province_id
				)
			)
			if (employee?.photo) setPhotoPreview(employee.photo)
		}
	}, [])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: EmployeeModel = { ...formDate, [name]: value }

		if (name == 'country_id') {
			data = { ...data, province_id: undefined, municipality_id: undefined }
			setProvinceList(
				provinces.filter((province) => province.country_id == Number(value))
			)
		}
		if (name == 'province_id') {
			data = { ...data, municipality_id: undefined }
			setMunicipalityList(
				municipalities.filter((municipality) => municipality.province_id == Number(value))
			)
		}
		if (name == 'photo') {
			const file = (e.target as any)?.files[0]
			data = { ...data, [name]: file }
			handleInputFile(file)
		}
		if (name == 'phone' && !value) {
			data = { ...data, phone2: '' }
		}

		if (name == 'can_login') {
			const checked = (e.target as any).checked
			data = { ...data, [name]: checked }
		}
		setFormData(data)
	}

	const handleInputFile = (file: File) => {
		if (file) {
			const reader = new FileReader()

			reader.onload = function (e) {
				setPhotoPreview(String(e.target?.result))
			}

			reader.readAsDataURL(file)
		}
	}

	const clearInputFile = () => {
		setFormData((prev) => ({ ...prev, photo: '' }))
		setPhotoPreview('')
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)
		try {
			const httpResponse = (
				formDate.id
					? await updateEmployee.update(formDate)
					: await addEmployee.add(formDate)
			) as EmployeeModel

			if (formDate.id) {
				dispatch(updateEmployeeStore(httpResponse))
			} else {
				dispatch(addEmployeeStore(httpResponse))
			}
			toast.success(
				`Funcionário ${formDate.id ? 'actualizado' : 'cadastrado'} com sucesso`
			)
			onClose()
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<Modal show={show} onClose={onClose}>
			<ModalTitle>
				<IconUser />
				{employee?.id ? `Funcionário - ${employee.name}` : 'Cadastrar funcionário'}
			</ModalTitle>
			<ModalBody>
				<form onSubmit={handleSubmit}>
					<div className="flex gap-1">
						<div className="">
							<ImagePreview
								photoPreview={photoPreview}
								onInputFileChange={handleInputChange}
								clearInputFile={clearInputFile}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<fieldset>
								<legend>Dados pessoais</legend>
								<div className="flex gap-1">
									<Input
										type="text"
										id="name"
										name="name"
										value={formDate?.name || ''}
										label={LabelUtils.translateField('name')}
										onChange={handleInputChange}
										autoFocus
									/>
								</div>
								<div className="grid grid-cols-3 gap-1">
									<Select
										id="gender"
										name="gender"
										value={formDate?.gender || ''}
										label={LabelUtils.translateField('gender')}
										data={[{ text: 'Masculino' }, { text: 'Feminino' }]}
										defaultText="Selecione"
										onChange={handleInputChange}
									/>
									<Input
										type="date"
										id="date_of_birth"
										name="date_of_birth"
										value={
											(formDate?.date_of_birth &&
												DateUtils.getDate(formDate?.date_of_birth)) ||
											''
										}
										label={LabelUtils.translateField('date_of_birth')}
										onChange={handleInputChange}
									/>
									<Select
										id="marital_status"
										name="marital_status"
										value={formDate?.marital_status || ''}
										label={LabelUtils.translateField('marital_status')}
										data={[
											{ text: 'Solteiro(a)' },
											{ text: 'Casado(a)' },
											{ text: 'Divorciado(a)' },
											{ text: 'Viúvo(a)' }
										]}
										defaultText="Selecione"
										onChange={handleInputChange}
									/>
									<Select
										id="document_type"
										name="document_type"
										value={formDate?.document_type || ''}
										label={LabelUtils.translateField('document_type')}
										data={DocumentUtils.docs.map((doc) => ({ text: doc }))}
										defaultText="Selecione"
										onChange={handleInputChange}
									/>
									<Input
										type="text"
										id="document_number"
										name="document_number"
										value={formDate?.document_number || ''}
										label={LabelUtils.translateField('document_number')}
										onChange={handleInputChange}
										disabled={!formDate?.document_type}
										title={
											!formDate?.document_type ? 'Selecione 1º o tipo de documento' : ''
										}
									/>
									<Input
										type="text"
										id="nif"
										name="nif"
										value={formDate?.nif || ''}
										label={LabelUtils.translateField('nif')}
										onChange={handleInputChange}
									/>
									<Input
										type="text"
										id="social_security"
										name="social_security"
										value={formDate?.social_security || ''}
										label={LabelUtils.translateField('social_security')}
										onChange={handleInputChange}
									/>
									<Input
										type="number"
										id="dependents"
										name="dependents"
										value={formDate?.dependents || ''}
										label={LabelUtils.translateField('dependents')}
										onChange={handleInputChange}
									/>
									<Select
										id="education_degree"
										name="education_degree"
										value={formDate?.education_degree || ''}
										label={LabelUtils.translateField('education_degree')}
										data={[
											{ text: 'Ensino primário' },
											{ text: 'Ensino secundário' },
											{ text: 'Ensino médio' },
											{ text: 'Ensino superior' }
										]}
										defaultText="Selecione"
										onChange={handleInputChange}
									/>
								</div>
								<div className="grid grid-cols-3 gap-1">
									<InputPhone
										id="phone"
										name="phone"
										value={formDate?.phone || ''}
										label={LabelUtils.translateField('phone')}
										onChange={handleInputChange}
									/>
									<InputPhone
										id="phone2"
										name="phone2"
										value={!formDate?.phone ? '' : formDate?.phone2 || ''}
										label={LabelUtils.translateField('phone2')}
										onChange={handleInputChange}
										disabled={!formDate?.phone}
									/>
									<InputEmail
										id="email"
										name="email"
										value={formDate?.email || ''}
										label={LabelUtils.translateField('email')}
										onChange={handleInputChange}
									/>
								</div>
								<div className="grid grid-cols-3 gap-1">
									<Select
										id="country_id"
										name="country_id"
										value={formDate?.country_id || ''}
										label={LabelUtils.translateField('country_id')}
										data={countries.map(({ name, id }) => ({
											text: name,
											value: id
										}))}
										defaultText="Selecione"
										onChange={handleInputChange}
									/>
									<Select
										id="province_id"
										name="province_id"
										value={formDate?.province_id || ''}
										label={LabelUtils.translateField('province_id')}
										data={provinceList.map(({ name, id }) => ({
											text: name,
											value: id
										}))}
										defaultText="Selecione"
										onChange={handleInputChange}
									/>
									<Select
										id="municipality_id"
										name="municipality_id"
										value={formDate?.municipality_id || ''}
										label={LabelUtils.translateField('municipality_id')}
										data={municipalityList.map(({ name, id }) => ({
											text: name,
											value: id
										}))}
										defaultText="Selecione"
										onChange={handleInputChange}
									/>
								</div>
								<div>
									<Input
										type="text"
										id="address"
										name="address"
										value={formDate?.address || ''}
										label={LabelUtils.translateField('address')}
										onChange={handleInputChange}
									/>
								</div>
							</fieldset>
							<fieldset className="grid grid-cols-2 gap-1">
								<legend>Dados profissionais</legend>
								<Select
									id="position"
									name="position"
									value={formDate?.position || ''}
									label={LabelUtils.translateField('position')}
									data={[
										{ text: 'Assistente administrativo' },
										{ text: 'Costureiro' },
										{ text: 'Coordenador de operações' },
										{ text: 'Mestre de costura' }
									]}
									defaultText="Selecione"
									onChange={handleInputChange}
								/>
								<InputPrice
									id="base_salary"
									name="base_salary"
									value={formDate?.base_salary || ''}
									label={LabelUtils.translateField('base_salary')}
									onChange={handleInputChange}
									disabled={!formDate?.position}
									title={`Selecione o ${LabelUtils.translateField(
										'position'
									)} para habilitar este campo`}
								/>
								<Input
									type="date"
									id="hire_date"
									name="hire_date"
									value={
										(formDate?.hire_date && DateUtils.getDate(formDate?.hire_date)) || ''
									}
									label={LabelUtils.translateField('hire_date')}
									onChange={handleInputChange}
									disabled={!formDate?.position}
									title={`Selecione o ${LabelUtils.translateField(
										'position'
									)} para habilitar este campo`}
								/>
								<Input
									type="date"
									id="contract_end_date"
									name="contract_end_date"
									value={
										(formDate?.contract_end_date &&
											DateUtils.getDate(formDate.contract_end_date)) ||
										''
									}
									label={LabelUtils.translateField('contract_end_date')}
									onChange={handleInputChange}
									disabled={!formDate?.position}
									title={`Selecione o ${LabelUtils.translateField(
										'position'
									)} para habilitar este campo`}
								/>
							</fieldset>
							<fieldset className="grid gap-1">
								<legend>Dados bancário</legend>
								<div className="grid grid-cols-2 gap-1">
									<Select
										id="bank_name"
										name="bank_name"
										value={formDate?.bank_name || ''}
										label={LabelUtils.translateField('bank_name')}
										data={[
											{ text: 'BAI' },
											{ text: 'BCI' },
											{ text: 'BIC' },
											{ text: 'BFA' },
											{ text: 'BNI' },
											{ text: 'BPC' },
											{ text: 'Millennium Atlantico' },
											{ text: 'SOL' },
											{ text: 'Standard Bank' }
										]}
										defaultText="Selecione"
										onChange={handleInputChange}
									/>
									<Input
										type="text"
										id="account_number"
										name="account_number"
										value={formDate?.account_number || ''}
										label={LabelUtils.translateField('account_number')}
										onChange={handleInputChange}
										disabled={!formDate?.bank_name}
										title={!formDate?.document_type ? 'Selecione 1º o nome do banco' : ''}
									/>
								</div>

								<InputIBAN
									id="iban"
									name="iban"
									value={formDate?.iban || ''}
									label={LabelUtils.translateField('iban')}
									onChange={handleInputChange}
									disabled={!formDate?.bank_name}
									title={!formDate?.document_type ? 'Selecione 1º o nome do banco' : ''}
								/>
							</fieldset>
							<fieldset className="flex flex-col gap-1">
								<legend>Acesso ao sistema</legend>
								<div>
									<div className="inline-flex">
										<Input
											type="checkbox"
											name="can_login"
											label="Pode iniciar sessão"
											checked={formDate.can_login}
											onChange={handleInputChange}
										/>
									</div>
								</div>
								{formDate.can_login && (
									<div className="flex flex-col gap-1">
										<Select
											name="role"
											label="Perfil"
											value={formDate?.role || ''}
											defaultText="Selecione"
											data={[
												{ text: 'Admin (acesso total)', value: 'Admin' },
												{ text: 'Normal (Venda)', value: 'Normal' }
											]}
											onChange={handleInputChange}
										/>
										<div className="flex gap-1">
											<Input
												type="password"
												name="password"
												label="Senha"
												value={formDate.password || ''}
												onChange={handleInputChange}
											/>
											<Input
												type="password"
												name="password_confirmation"
												label="Confirme a senha"
												value={formDate.password_confirmation || ''}
												onChange={handleInputChange}
											/>
										</div>
									</div>
								)}
							</fieldset>
						</div>
					</div>
					<ModalFooter>
						<ButtonSubmit type="submit" disabled={isLoading} isLoading={isLoading} />
						<ButtonCancel onClick={onClose} />
					</ModalFooter>
				</form>
			</ModalBody>
		</Modal>
	)
}
