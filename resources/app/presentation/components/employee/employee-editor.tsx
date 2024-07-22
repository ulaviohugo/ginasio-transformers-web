import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { EmployeeModel } from '@/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	IconEdit,
	IconTrash,
	IconUser,
	ImagePreview,
	Input,
	InputEmail,
	InputIBAN,
	InputName,
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
	DataUtils,
	FileUtils,
	MunicipalityProps,
	ProvinceProps
} from '@/utils'
import { addEmployeeStore, updateEmployeeStore } from '@/presentation/redux'
import { AddEmployee, UpdateEmployee } from '@/domain/usecases'
import { useLocations } from '@/presentation/hooks'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

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

	const [formData, setFormData] = useState<EmployeeModel>(
		employee || ({} as EmployeeModel)
	)
	const [gyms, setGyms] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [photoPreview, setPhotoPreview] = useState('')

	const fetchDataGym = async (queryParams?: string) => {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/gym' + (queryParams || '')),
			method: 'get'
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			setGyms(httpResponse.body)
		} else {
			toast.error(httpResponse.body)
		}
	}

	useEffect(() => {
		fetchDataGym()
	}, [])

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

		let data: EmployeeModel = { ...formData, [name]: value }

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
			const file = await FileUtils.toBase64((e.target as any)?.files[0])
			data = { ...data, [name]: file }
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

	const handleChangeInputBirth = async (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		let data = { ...formData, [name]: value }

		const selectedDate = new Date(value)
		const currentDate = new Date()
		const minDate = new Date(currentDate)
		minDate.setFullYear(currentDate.getFullYear() - 60) // Data mínima para 60 anos atrás
		const maxDate = new Date(currentDate)
		maxDate.setFullYear(currentDate.getFullYear() - 18) // Data máxima para 18 anos atrás

		if (selectedDate > currentDate || selectedDate < minDate || selectedDate > maxDate) {
			// Se a data selecionada for inválida, não atualize o estado
			// Pode emitir um alerta, exibir uma mensagem de erro, etc.
			toast.error('Data Invalida')
			return
		}

		// Atualizar o estado se a data for válida
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}))

		setFormData(data)
	}

	const handleInputChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		const today = new Date()
		today.setHours(0, 0, 0, 0) // Zera as horas para comparar apenas as datas

		if (name === 'hire_date') {
			const hireDate = new Date(value)
			if (hireDate < today) {
				toast.error('A Data de Contratação deve ser igual ou posterior à data corrente.')
				setFormData((prevState) => ({
					...prevState,
					hire_date: null
				}))
				return
			}
		}

		if (name === 'contract_end_date' && formData.hire_date) {
			const hireDate = new Date(formData.hire_date)
			const contractEndDate = new Date(value)
			if (contractEndDate <= hireDate) {
				toast.error('A Data Fim de Contrato deve ser posterior à Data de Contratação.')
				setFormData((prevState) => ({
					...prevState,
					contract_end_date: null // Usando null para valores inválidos
				}))
				return
			}
		}

		setFormData((prevState) => ({
			...prevState,
			[name]: value
		}))
	}

	const clearInputFile = () => {
		setFormData((prev) => ({ ...prev, photo: '' }))
		setPhotoPreview('')
	}

	const handleEmailValidation = (email: string) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		return emailRegex.test(email)
	}

	const handleSubmit = async (type: 'save' | 'update') => {
		const update = type == 'update'

		setIsLoading(true)
		try {
			const httpResponse = (
				update ? await updateEmployee.update(formData) : await addEmployee.add(formData)
			) as EmployeeModel

			if (!handleEmailValidation(formData.email || '')) {
				return toast.error('Por favor, insira um email válido')
			}

			if (update) {
				dispatch(updateEmployeeStore(httpResponse))
			} else {
				dispatch(addEmployeeStore(httpResponse))
			}
			toast.success(`Funcionário ${update ? 'actualizado' : 'cadastrado'} com sucesso`)
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
				<div className="flex flex-col w-full">
					<div className="flex gap-1 ">
						<div className="">
							<ImagePreview
								photoPreview={photoPreview}
								onInputFileChange={handleInputChange}
								clearInputFile={clearInputFile}
							/>
						</div>
						<div className="flex-1 flex flex-col gap-2">
							<fieldset className="w-full">
								<legend>Dados pessoais</legend>
								<div className="flex gap-1">
									<InputName
										type="text"
										id="name"
										name="name"
										required
										value={formData?.name || ''}
										label={'*Nome'}
										onChange={handleInputChange}
										autoFocus
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <Select
        id="gender"
        name="gender"
        required
        value={formData?.gender || ''}
        label={'Género'}
        data={[{ text: 'Masculino' }, { text: 'Feminino' }]}
        defaultText="Selecione"
        onChange={handleInputChange}
    />
    <Input
        type="date"
        id="date_of_birth"
        required
        name="date_of_birth"
        value={
            (formData?.date_of_birth &&
                DateUtils.getDate(formData?.date_of_birth)) ||
            ''
        }
        label={'Data Nascimento'}
        onChange={handleChangeInputBirth}
    />
    <Select
        id="marital_status"
        name="marital_status"
        value={formData?.marital_status || ''}
        label={'Estado Civil'}
        data={DataUtils.maritalStatus}
        defaultText="Selecione"
        onChange={handleInputChange}
    />
    <Select
        id="document_type"
        name="document_type"
        required
        value={formData?.document_type || ''}
        label={'Tipo Documento'}
        data={DataUtils.docs.map((doc) => ({ text: doc }))}
        defaultText="Selecione"
        onChange={handleInputChange}
    />
    <Input
        type="text"
        id="document_number"
        name="document_number"
        required
        value={formData?.document_number || ''}
        label={'Nº Documento'}
        onChange={handleInputChange}
        disabled={!formData?.document_type}
        title={
            !formData?.document_type ? 'Selecione 1º o tipo de documento' : ''
        }
    />
    <Input
        type="text"
        id="nif"
        name="nif"
        required
        value={formData?.nif || ''}
        label={'NIF'}
        onChange={handleInputChange}
    />
    <Input
        type="text"
        id="social_security"
        name="social_security"
        value={formData?.social_security || ''}
        label={'INSS'}
        onChange={handleInputChange}
    />
    <Input
        type="number"
        id="dependents"
        name="dependents"
        value={formData?.dependents || ''}
        label={'Dependentes'}
        onChange={handleInputChange}
    />
    <Select
        id="education_degree"
        name="education_degree"
        required
        value={formData?.education_degree || ''}
        label={'Nível Académico'}
        data={DataUtils.educationDegrees.map((text) => ({ text }))}
        defaultText="Selecione"
        onChange={handleInputChange}
    />
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <InputPhone
        id="phone"
        name="phone"
        required
        value={formData?.phone || ''}
        label={'Telefone'}
        onChange={handleInputChange}
    />
    <InputPhone
        id="phone2"
        name="phone2"
        value={!formData?.phone ? '' : formData?.phone2 || ''}
        label={'Telefone 2'}
        onChange={handleInputChange}
        disabled={!formData?.phone}
    />
    <InputEmail
        name="email"
        label="E-mail"
        value={formData?.email || ''}
        onChange={handleInputChange}
        isValid={handleEmailValidation(formData?.email || '')}
    />
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <Select
        id="country_id"
        name="country_id"
        value={formData?.country_id || ''}
        label={'País'}
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
        value={formData?.province_id || ''}
        label={'Província'}
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
        value={formData?.municipality_id || ''}
        label={'Município'}
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
										required
										name="address"
										value={formData?.address || ''}
										label={'Endereço'}
										onChange={handleInputChange}
									/>
								</div>
							</fieldset>
							<fieldset className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <legend>Dados profissionais</legend>

    <Select
        id="department"
        name="department"
        required
        value={formData?.department || ''}
        label="Departamento"
        data={[{ text: 'Administrativo' }, { text: 'Operações' }]}
        defaultText="Selecione"
        onChange={handleInputChange}
    />
    <Select
        id="position"
        name="position"
        required
        value={formData?.position || ''}
        label={'Cargo'}
        data={[
            { text: 'Director Geral' },
            { text: 'Assistente administrativo' },
            { text: 'Secretário' },
            { text: 'Personal Trainer' },
            { text: 'Recepcionista' }
        ]}
        defaultText="Selecione"
        onChange={handleInputChange}
    />
    <InputPrice
        id="base_salary"
        name="base_salary"
        value={formData?.base_salary || ''}
        label={'Salário Base'}
        onChange={handleInputChange}
        disabled={!formData?.position}
        title={`Selecione o cargo para habilitar este campo`}
    />
    <Input
        type="date"
        id="hire_date"
        name="hire_date"
        required
        value={
            (formData?.hire_date && DateUtils.getDate(formData?.hire_date)) || ''
        }
        label={'Data Contratação'}
        onChange={handleInputChangeDate}
        disabled={!formData?.position}
        title={`Selecione o cargo para habilitar este campo`}
    />
    <Input
        type="date"
        id="contract_end_date"
        required
        name="contract_end_date"
        value={
            (formData?.contract_end_date &&
                DateUtils.getDate(formData.contract_end_date)) ||
            ''
        }
        label={'Data Fim de Contracto'}
        onChange={handleInputChangeDate}
        disabled={!formData?.position || !formData?.hire_date}
        title={`Selecione o cargo para habilitar este campo`}
    />
    <InputPrice
        id="meal_allowance"
        name="meal_allowance"
        value={formData?.meal_allowance || ''}
        label={'Subsídio de alimentação'}
        onChange={handleInputChange}
    />
    <InputPrice
        id="productivity_allowance"
        name="productivity_allowance"
        value={formData?.productivity_allowance || ''}
        label={'Subsídio de produtividade'}
        onChange={handleInputChange}
    />
    <InputPrice
        id="transportation_allowance"
        name="transportation_allowance"
        value={formData?.transportation_allowance || ''}
        label={'Subsídio de transporte'}
        onChange={handleInputChange}
    />
    <InputPrice
        id="family_allowance"
        name="family_allowance"
        value={formData?.family_allowance || ''}
        label={'Abono familiar'}
        onChange={handleInputChange}
    />
    <Select
        name="gym_id"
        onChange={handleInputChange}
        label="Selecione Ginásio"
        data={gyms.map((gym) => ({ text: gym.name, value: gym.id }))}
        value={formData?.gym_id || ''}
        defaultText="Selecione"
    />
</fieldset>

<fieldset className="grid gap-4">
    <legend>Dados bancário</legend>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
            id="bank_name"
            name="bank_name"
            value={formData?.bank_name || ''}
            label={'Nome do Banco'}
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
            value={formData?.account_number || ''}
            label={'Nº Conta Bancária'}
            onChange={handleInputChange}
            disabled={!formData?.bank_name}
            title={!formData?.bank_name ? 'Selecione 1º o nome do banco' : ''}
        />
    </div>

    <InputIBAN
        id="iban"
        name="iban"
        value={formData?.iban || ''}
        label="IBAN"
        onChange={handleInputChange}
        disabled={!formData?.bank_name}
        title={!formData?.bank_name ? 'Selecione 1º o nome do banco' : ''}
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
											checked={formData.can_login}
											onChange={handleInputChange}
										/>
									</div>
								</div>
								{formData.can_login && (
									<div className="flex flex-col gap-4">
									<Select
										name="role"
										label="Perfil"
										required
										value={formData?.role || ''}
										defaultText="Selecione"
										data={[
											{ text: 'Admin (acesso total)', value: 'Admin' },
											{ text: 'Normal (Venda)', value: 'Normal' }
										]}
										onChange={handleInputChange}
									/>
									<div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
										<Input
											type="password"
											name="password"
											required
											label="Senha"
											value={formData.password || ''}
											onChange={handleInputChange}
										/>
										<Input
											type="password"
											name="password_confirmation"
											label="Confirme a senha"
											value={formData.password_confirmation || ''}
											onChange={handleInputChange}
										/>
									</div>
								</div>
								
								)}
							</fieldset>
						</div>
					</div>
					<ModalFooter>
						<ButtonSubmit
							type="submit"
							disabled={isLoading}
							isLoading={isLoading}
							className="!bg-green-700"
							onClick={() => handleSubmit('save')}
						/>
						<ButtonCancel
							text="Salvar"
							icon={IconEdit}
							className="!bg-primary !bg-opacity-70 !text-white"
							onClick={() => handleSubmit('update')}
						/>
						<ButtonCancel
							text="Excluir"
							icon={IconTrash}
							onClick={onClose}
							className="!bg-red-700 !text-white"
						/>
						<ButtonCancel text="Limpar" onClick={onClose} />
					</ModalFooter>
				</div>
			</ModalBody>
		</Modal>
	)
}
