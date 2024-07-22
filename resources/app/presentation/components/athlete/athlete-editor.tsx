import { AthleteModel, EmployeeModel } from '@/domain/models'
import { AddAthlete, LoadEmployees, UpdateAthlete } from '@/domain/usecases'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
	Button,
	Input,
	InputEmail,
	InputName,
	InputNumber,
	InputPhone,
	Select
} from '../form-controls'
import { IconCheck, IconClose, IconEdit, IconTrash, IconWeight, Iconcard } from '../icons'
import { PdfViewer } from '../pdf-viewer'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth, useEmployees, useLocations } from '@/presentation/hooks'
import toast from 'react-hot-toast'
import {
	addAthleteStore,
	loadEmployeeStore,
	updateAthleteStore
} from '@/presentation/redux'
import { DataUtils, FileUtils } from '@/utils'
import { ImagePreview } from '../image-preview'
import { FilterDataProps } from './athlete-list'
import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { NotFound } from '@/presentation/pages'
import { GymModel } from '@/domain/models/gym'

type AthleteEditorProps = {
	addAthlete: AddAthlete
	updateAthlete: UpdateAthlete
	loadEmployees: LoadEmployees
	data?: AthleteModel
	onDelete: () => void
	handleOpenDetalhe: () => void
	handleOpenDetalheIMC: () => void
}

export function AthleteEditor({
	addAthlete,
	updateAthlete,
	loadEmployees,
	data,
	onDelete,
	handleOpenDetalhe,
	handleOpenDetalheIMC
}: AthleteEditorProps) {
	const dispatch = useDispatch()

	const [formData, setFormData] = useState<AthleteModel>({
		status: 'active'
	} as AthleteModel)
	const [pdfUrl, setPdfUrl] = useState('')

	const user = useSelector(useAuth())
	const isAdmin = user.gym_id == null

	const [gyms, setGyms] = useState<GymModel[]>([])
	const [personalTrainers, setPersonalTrainers] = useState<EmployeeModel[]>([])

	const employees = useSelector(useEmployees())
	const { countries, provinces, municipalities } = useSelector(useLocations())

	const provinceList = useMemo(() => {
		return formData.country_id
			? provinces.filter((province) => province.country_id == formData.country_id)
			: provinces
	}, [formData.country_id, provinces])

	const municipalityList = useMemo(() => {
		return formData.province_id
			? municipalities.filter((province) => province.province_id == formData.province_id)
			: []
	}, [formData.province_id, municipalities])

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

	const fetchDataEmployees = async (queryParams?: string) => {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/employees' + (queryParams || '')),
			method: 'get'
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			setPersonalTrainers(httpResponse.body)
		} else {
			toast.error(httpResponse.body)
		}
	}

	useEffect(() => {
		fetchDataEmployees()
	}, [])

	useEffect(() => {
		if (data?.id) {
			setFormData(data as any)
			if (data?.photo) setPhotoPreview(data.photo)
		}
	}, [data])

	useEffect(() => {
		if (employees.length < 1) {
			loadEmployees
				.load()
				.then((response) => dispatch(loadEmployeeStore(response)))
				.catch(({ message }) => toast.error(message))
		}
	}, [])

	useEffect(() => {
		if (user.gym_id) {
			setFormData({ ...formData, gym_id: user.gym_id })
		}
	}, [])

  const handleChangeInput = async (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		let data = { ...formData, [name]: value }

		if (name == 'country_id') {
			data = { ...data, province_id: undefined, municipality_id: undefined }
		}
		if (name == 'province_id') {
			data = { ...data, municipality_id: undefined }
		}
		if (name == 'photo') {
			const file = await FileUtils.toBase64((e.target as any)?.files[0])
			data = { ...data, [name]: file }
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

	const handleEmailValidation = (email: string) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		return emailRegex.test(email)
	}

	const handleSubmit = async (type: 'save' | 'update' = 'save') => {
		try {
			const update = type == 'update'
			if (update && !formData.id) {
				return toast.error('Selecione um registro na tabela abaixo para editar')
			}

			if (!handleEmailValidation(formData.email || '')) {
				return toast.error('Por favor, insira um email válido')
			}

			const httpResponse = await (update
				? updateAthlete.update(formData)
				: addAthlete.add(formData))

			if (update) {
				toast.success('Atleta atualizado com sucesso')
				dispatch(updateAthleteStore(httpResponse))
			} else {
				toast.success('Atleta criado com sucesso')
				dispatch(addAthleteStore(httpResponse))
			}
		} catch ({ message }: any) {
			toast.error(message)
		}
	}

	const handleClear = () => {
		setFormData({} as any)
	}

	const clearInputFile = () => {
		setFormData((prev) => ({ ...prev, photo: '' }))
		setPhotoPreview('')
	}

	const selectedGymId = formData?.gym_id
	const personalTrainersOptions = personalTrainers
		.filter(
			(pt) =>
				(selectedGymId ? pt.gym_id == selectedGymId : false) &&
				pt.position === 'Personal Trainer'
		)
		.map((pt) => ({ text: pt.name, value: pt.id }))

	return (
		<fieldset className="p-4">
			<legend>Novo atleta</legend>
			<PdfViewer pdfUrl={pdfUrl} onClose={() => setPdfUrl('')} />

			<div className="flex gap-2">
				<div className="flex-1 flex flex-col gap-2">
				<fieldset className="flex flex-col gap-4">
    <legend className="text-lg font-semibold">Dados Pessoais</legend>
    <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="flex-shrink-0 w-full md:w-1/3">
            <ImagePreview
                photoPreview={photoPreview}
                onInputFileChange={handleChangeInput}
                clearInputFile={clearInputFile}
            />
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputName
                name="name"
                label="Nome"
                required
                value={formData?.name || ''}
                onChange={handleChangeInput}
            />
            <Select
                name="gender"
                label="Género"
                required
                data={['Masculino', 'Feminino'].map((text) => ({
                    text
                }))}
                defaultText="Selecione"
                value={formData?.gender || ''}
                onChange={handleChangeInput}
            />
            <Input
                name="date_of_birth"
                type="date"
                required
                label="Data Nascimento"
                value={(formData?.date_of_birth as any) || ''}
                onChange={handleChangeInputBirth}
            />
            <Select
                name="marital_status"
                label="Estado Civil"
                required
                data={DataUtils.maritalStatus.map((status) => status)}
                defaultText="Selecione"
                value={formData?.marital_status || ''}
                onChange={handleChangeInput}
            />
            <Select
                name="document_type"
                label="Documento"
                required
                data={DataUtils.docs.map((text) => ({ text }))}
                defaultText="Selecione"
                value={formData?.document_type || ''}
                onChange={handleChangeInput}
            />
            <Input
                name="document_number"
                label="Nº Documento"
                required
                value={formData?.document_number || ''}
                disabled={!formData.document_type}
                title={
                    !formData.document_type
                        ? 'Selecione o tipo de documento para habilitar este campo'
                        : ''
                }
                onChange={handleChangeInput}
            />
            <Select
                name="education_degree"
                label="Nível académico"
                required
                data={DataUtils.educationDegrees.map((text) => ({ text }))}
                defaultText="Selecione"
                value={formData?.education_degree || ''}
                onChange={handleChangeInput}
            />
            <Select
                name="status"
                label="Estado"
                required
                data={[
                    { text: 'Activo', value: 'active' },
                    { text: 'Inactivo', value: 'inactive' }
                ].map((text) => text)}
                defaultText="Selecione"
                value={formData?.status || ''}
                onChange={handleChangeInput}
            />
            <Select
                name="gym_id"
                onChange={handleChangeInput}
                label="Selecione a Filial"
                required
                data={gyms.map((gym) => ({ text: gym.name, value: gym.id }))}
                value={selectedGymId}
                defaultText="Selecione"
                disabled={!isAdmin}
            />
            <Select
                name="personal_trainer_id"
                onChange={handleChangeInput}
                label="Selecione o Personal Trainer"
                data={personalTrainersOptions}
                value={formData?.personal_trainer_id}
                defaultText="Selecione"
            />
            <Input
                name="height"
                type="number"
                label="Altura"
                required
                value={(formData?.height as any) || ''}
                onChange={handleChangeInput}
            />
        </div>
    </div>
</fieldset>

					<div className="grid xl:grid-cols-2 gap-4">
					<fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
    <legend className="col-span-full text-lg font-semibold">Contactos</legend>
    <div>
        <InputPhone
            name="phone"
            label="Telefone"
            required
            value={formData.phone}
            onChange={handleChangeInput}
        />
    </div>
    <div>
        <InputPhone
            name="phone2"
            label="Telefone Alternativo"
            value={formData.phone2}
            onChange={handleChangeInput}
        />
    </div>
    <div className="col-span-full md:col-span-3">
        <InputEmail
            name="email"
            label="E-mail"
            value={formData?.email || ''}
            onChange={handleChangeInput}
            isValid={handleEmailValidation(formData?.email || '')}
        />
    </div>
</fieldset>

						<fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
    <legend className="col-span-full text-lg font-semibold">Peso (KG)</legend>
    <div>
        <InputNumber
            name="starting_weight"
            label="Peso Inicial"
            required
            value={formData?.starting_weight || ''}
            onChange={handleChangeInput}
        />
    </div>
    <div>
        <InputNumber
            name="current_weight"
            label="Peso Actual"
            required
            value={formData?.current_weight || ''}
            onChange={handleChangeInput}
        />
    </div>
    <div>
        <InputNumber
            name="goal_weight"
            label="Peso Meta"
            value={formData?.goal_weight || ''}
            onChange={handleChangeInput}
        />
    </div>
</fieldset>

					</div>
					<fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-start">
    <legend className="col-span-full">Endereço</legend>
    <Select
        name="country_id"
        label="País"
        data={countries.map(({ id, name }) => ({ text: name, value: id }))}
        defaultText="Selecione"
        value={formData?.country_id || ''}
        onChange={handleChangeInput}
    />
    <Select
        name="province_id"
        label="Província"
        data={provinceList.map(({ id, name }) => ({ text: name, value: id }))}
        defaultText="Selecione"
        value={formData?.province_id || ''}
        onChange={handleChangeInput}
    />
    <Select
        name="municipality_id"
        label="Município"
        data={municipalityList.map(({ id, name }) => ({ text: name, value: id }))}
        defaultText="Selecione"
        value={formData?.municipality_id || ''}
        onChange={handleChangeInput}
    />
    <div className="col-span-full sm:col-span-2">
        <Input
            name="address"
            label="Endereço"
            required
            value={formData?.address || ''}
            onChange={handleChangeInput}
        />
    </div>
</fieldset>

				</div>
				<div className="flex flex-col gap-2">
					<Button
						variant="green"
						text="Cadastrar"
						icon={IconCheck}
						onClick={() => handleSubmit('save')}
					/>
					<Button
						variant="gray-light"
						text="Salvar"
						icon={IconEdit}
						onClick={() => handleSubmit('update')}
					/>
					<Button text="Limpar" icon={IconClose} onClick={handleClear} />
					<Button variant="red" text="Excluir" icon={IconTrash} onClick={onDelete} />
					<Button
						variant="rose"
						text="Cartão"
						icon={Iconcard}
						onClick={handleOpenDetalhe}
					/>
					<Button
						variant="orange"
						text="IMC"
						icon={IconWeight}
						onClick={handleOpenDetalheIMC}
					/>
				</div>
			</div>
		</fieldset>
	)
}
