'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

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
import { addEmployeeStore, updateEmployeeStore } from '@/(presentation)/redux'
import { AddEmployee, UpdateEmployee } from '@/domain/usecases'
import { useLocations } from '@/(presentation)/hooks'

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
	const { countries, provinces, municipalities } = useLocations()

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
				provinces.filter((province) => province.countryId == employee.countryId)
			)
			setMunicipalityList(
				municipalities.filter(
					(municipality) => municipality.provinceId == employee.provinceId
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

		if (name == 'countryId') {
			data = { ...data, provinceId: undefined, municipalityId: undefined }
			setProvinceList(provinces.filter((province) => province.countryId == Number(value)))
		}
		if (name == 'provinceId') {
			data = { ...data, municipalityId: undefined }
			setMunicipalityList(
				municipalities.filter((municipality) => municipality.provinceId == Number(value))
			)
		}
		if (name == 'photo') {
			const file = (e.target as any)?.files[0]
			data = { ...data, [name]: file }
			handleInputFile(file)
		}
		if (name == 'phone1' && !value) {
			data = { ...data, phone2: '' }
		}

		if (name == 'canLogin') {
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
										id="dateOfBirth"
										name="dateOfBirth"
										value={
											(formDate?.dateOfBirth &&
												DateUtils.getDate(formDate?.dateOfBirth)) ||
											''
										}
										label={LabelUtils.translateField('dateOfBirth')}
										onChange={handleInputChange}
									/>
									<Select
										id="maritalStatus"
										name="maritalStatus"
										value={formDate?.maritalStatus || ''}
										label={LabelUtils.translateField('maritalStatus')}
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
										id="documentType"
										name="documentType"
										value={formDate?.documentType || ''}
										label={LabelUtils.translateField('documentType')}
										data={DocumentUtils.docs.map((doc) => ({ text: doc }))}
										defaultText="Selecione"
										onChange={handleInputChange}
									/>
									<Input
										type="text"
										id="documentNumber"
										name="documentNumber"
										value={formDate?.documentNumber || ''}
										label={LabelUtils.translateField('documentNumber')}
										onChange={handleInputChange}
										disabled={!formDate?.documentType}
										title={
											!formDate?.documentType ? 'Selecione 1º o tipo de documento' : ''
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
										id="socialSecurity"
										name="socialSecurity"
										value={formDate?.socialSecurity || ''}
										label={LabelUtils.translateField('socialSecurity')}
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
										id="educationDegree"
										name="educationDegree"
										value={formDate?.educationDegree || ''}
										label={LabelUtils.translateField('educationDegree')}
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
										id="phone1"
										name="phone1"
										value={formDate?.phone1 || ''}
										label={LabelUtils.translateField('phone1')}
										onChange={handleInputChange}
									/>
									<InputPhone
										id="phone2"
										name="phone2"
										value={!formDate?.phone1 ? '' : formDate?.phone2 || ''}
										label={LabelUtils.translateField('phone2')}
										onChange={handleInputChange}
										disabled={!formDate?.phone1}
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
										id="countryId"
										name="countryId"
										value={formDate?.countryId || ''}
										label={LabelUtils.translateField('countryId')}
										data={countries.map(({ name, id }) => ({
											text: name,
											value: id
										}))}
										defaultText="Selecione"
										onChange={handleInputChange}
									/>
									<Select
										id="provinceId"
										name="provinceId"
										value={formDate?.provinceId || ''}
										label={LabelUtils.translateField('provinceId')}
										data={provinceList.map(({ name, id }) => ({
											text: name,
											value: id
										}))}
										defaultText="Selecione"
										onChange={handleInputChange}
									/>
									<Select
										id="municipalityId"
										name="municipalityId"
										value={formDate?.municipalityId || ''}
										label={LabelUtils.translateField('municipalityId')}
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
										id="residentialAddress"
										name="residentialAddress"
										value={formDate?.residentialAddress || ''}
										label={LabelUtils.translateField('residentialAddress')}
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
									id="baseSalary"
									name="baseSalary"
									value={formDate?.baseSalary || ''}
									label={LabelUtils.translateField('baseSalary')}
									onChange={handleInputChange}
									disabled={!formDate?.position}
									title={`Selecione o ${LabelUtils.translateField(
										'position'
									)} para habilitar este campo`}
								/>
								<Input
									type="date"
									id="hireDate"
									name="hireDate"
									value={
										(formDate?.hireDate && DateUtils.getDate(formDate?.hireDate)) || ''
									}
									label={LabelUtils.translateField('hireDate')}
									onChange={handleInputChange}
									disabled={!formDate?.position}
									title={`Selecione o ${LabelUtils.translateField(
										'position'
									)} para habilitar este campo`}
								/>
								<Input
									type="date"
									id="contractEndDate"
									name="contractEndDate"
									value={
										(formDate?.contractEndDate &&
											DateUtils.getDate(formDate.contractEndDate)) ||
										''
									}
									label={LabelUtils.translateField('contractEndDate')}
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
										id="bankName"
										name="bankName"
										value={formDate?.bankName || ''}
										label={LabelUtils.translateField('bankName')}
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
										id="accountNumber"
										name="accountNumber"
										value={formDate?.accountNumber || ''}
										label={LabelUtils.translateField('accountNumber')}
										onChange={handleInputChange}
										disabled={!formDate?.bankName}
										title={!formDate?.documentType ? 'Selecione 1º o nome do banco' : ''}
									/>
								</div>

								<InputIBAN
									id="iban"
									name="iban"
									value={formDate?.iban || ''}
									label={LabelUtils.translateField('iban')}
									onChange={handleInputChange}
									disabled={!formDate?.bankName}
									title={!formDate?.documentType ? 'Selecione 1º o nome do banco' : ''}
								/>
							</fieldset>
							<fieldset className="flex flex-col gap-1">
								<legend>Acesso ao sistema</legend>
								<div>
									<div className="inline-flex">
										<Input
											type="checkbox"
											name="canLogin"
											label="Pode iniciar sessão"
											checked={formDate.canLogin}
											onChange={handleInputChange}
										/>
									</div>
								</div>
								{formDate.canLogin && (
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
											name="passwordConfirmation"
											label="Confirme a senha"
											value={formDate.passwordConfirmation || ''}
											onChange={handleInputChange}
										/>
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
