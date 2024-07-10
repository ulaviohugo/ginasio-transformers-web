import React, { ChangeEvent, useEffect, useState } from 'react'
import {
	Button,
	IconLesson,
	Input,
	Layout,
	LayoutBody,
	ListContainer,
	ModalDelete,
	NoData,
	Select,
	Title
} from '../components'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import toast from 'react-hot-toast'
import { DateUtils } from '@/utils'
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks'
import { NotFound } from './notfound'
import { FilterDataProps, FilterLesson } from '../components/filter-Lesson'
import { GymModel } from '@/domain/models/gym'
import { LessonModel } from '@/domain/models/lesson'
import { AthleteModel, EmployeeModel } from '@/domain/models'
import { SelectCheckBox } from '../components/form-controls/selectChekbox.'

type FormDataProps = {
	name: string
	tipo: string
	data: string
	horario: string
	gym_id: number
	personal_trainer_id: number
	athlete_id: number
}

type LessonProps = {
	id: number
	name: string
	data: string
	tipo: string
	horario: string
	gym_id: string
	personal_trainer_id: number
	athlete_id: number
	created_at: Date
	updated_at: Date
}

type AthleteToPersonalTrainer = {
	athleteId: number
	personalTrainerId: number
}

export function Lessons() {
	const [aulas, setAulas] = useState<LessonProps[]>([])
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [gyms, setGyms] = useState<GymModel[]>([])
	const [personalTrainers, setPersonalTrainers] = useState<EmployeeModel[]>([])
	const [athletes, setAthletes] = useState<AthleteModel[]>([])
	const [ahletes, setAhletes] = useState<AthleteModel[]>([])

	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'
	const isAdminBool = user.gym_id != null
	const isNormal = user.role == 'Normal'
	const isRecepcionista = user?.position == 'Recepcionista'
	const [selectedAulas, setSelectAulas] = useState<LessonProps>()
	const [formData, setFormData] = useState<FormDataProps>({
		name: '',
		tipo: '',
		gym_id: '' as any,
		data: '',
		horario: '',
		personal_trainer_id: '' as any,
		athlete_id: '' as any
	})
	const [filtered, setFiltered] = useState<FilterDataProps>({
		name: '',
		created_at: '',
		id: '' as any,
		gym_id: '' as any
	})
	const [loading, setLoading] = useState(true)

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })

		if (name == 'personal_trainer_id') {
			fetchDataAthletesByPersonal_trainer_id(value)
		}
	}

	const fetchData = async (queryParams?: string) => {
		setLoading(true)
		try {
			const httpResponse = await makeAuthorizeHttpClientDecorator().request({
				url: makeApiUrl('/aulas' + (queryParams || '')),
				method: 'get'
			})
			if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
				setAulas(httpResponse.body)
			} else {
				toast.error(httpResponse.body)
			}
		} catch (error) {
			toast.error('Ocorreu um erro ao carregar os dados.')
		} finally {
			setLoading(false) // Define o estado de carregamento como falso após a conclusão da requisição (seja sucesso ou falha)
		}
	}

	useEffect(() => {
		fetchData('?gym_id=' + (user.gym_id || ''))
	}, [])

	const fetchDataAthletesByPersonal_trainer_id = async (personal_trainer_id: number) => {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/athletes-by-personal-trainer/' + personal_trainer_id),
			method: 'get'
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			setAhletes(httpResponse.body)
		} else {
			toast.error(httpResponse.body)
		}
	}

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
		if (user.gym_id) {
			setFormData({ ...formData, gym_id: user.gym_id })
		}
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

	const fetchDataAthletes = async (queryParams?: string) => {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/athletes' + (queryParams || '')),
			method: 'get'
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			setAthletes(httpResponse.body)
		} else {
			toast.error(httpResponse.body)
		}
	}

	useEffect(() => {
		fetchDataAthletes()
	}, [])

	const handleCloseDeleteModal = () => {
		setShowDeleteModal(false)
	}

	const handleOpenDeleteModal = () => {
		if (!selectedAulas?.id) {
			toast.error('Selecione a aula que deseja excluir')
		} else {
			setShowDeleteModal(true)
		}
	}

	const handleClear = () => {
		setSelectAulas({} as any)
		setFormData({} as any)
	}

	async function handleSubmit() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/aulas'),
			method: 'post',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Aula cadastrada com sucesso')
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleDelete() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/aulas/' + selectedAulas?.id),
			method: 'delete',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Aula Excluida com sucesso')
			handleCloseDeleteModal()
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleUpdate() {
		if (!selectedAulas?.id) {
			return toast.error('Selecione a aula que deseja editar')
		}

		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/aulas/' + selectedAulas?.id),
			method: 'put',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('As alterações da aula foram salvas com sucesso')
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleFilter(filterData: FilterDataProps) {
		setFiltered(filterData)
		fetchData(
			`?id=${filterData.id}&name=${filterData.name}&gym_id=${filterData.gym_id}&created_at=${filterData.created_at}`
		)
	}

	const handleOpenPdf = () => {
		const queryParams = `?id=${filtered.id}&name=${filtered.name}&gym_id=${filtered.gym_id}&created_at=${filtered.created_at}`
		window.open(`/pdf/aulas${queryParams}`)
	}

	const selectedGymId = formData?.gym_id;

	const personalTrainersOptions = personalTrainers
  	.filter((pt) => (selectedGymId ? pt.gym_id == selectedGymId : false) && pt.position === 'Personal Trainer')
  	.map((pt) => ({ text: pt.name, value: pt.id }));
	const athletesOptions = athletes
  	.filter((at) => (selectedGymId ? at.gym_id == selectedGymId : false))
  	.map((at) => ({ text: at.name, value: at.id }));


	if (isNormal && (!isRecepcionista)) {
		return <NotFound />
	}

	return (
		<Layout>
			{showDeleteModal && (
				<ModalDelete
					description="Deseja realmente Excluir a Aula"
					onClose={handleCloseDeleteModal}
					onSubmit={handleDelete}
					show
				/>
			)}
			<LayoutBody>
				<div className="flex items-start gap-3">
					<div className="flex-1">
						<Title title="Aulas" icon={IconLesson} />
						<form className="grid grid-cols-3 gap-4">
							<Input
								name="name"
								onChange={handleInput}
								label="Nome"
								required
								type="text"
								placeholder="Informe o nome da Aula"
								value={formData.name || ''}
							/>
							<Input
								name="tipo"
								onChange={handleInput}
								label="Tipo de Aula"
								required
								type="text"
								placeholder="Informe o tipo de aula"
								value={formData.tipo || ''}
							/>
							<Input
								name="data"
								onChange={handleInput}
								label="Data"
								required
								type="date"
								placeholder="Informe o data da Aula"
								value={formData.data || ''}
							/>
							<Input
								name="horario"
								onChange={handleInput}
								label="Horário"
								required
								type="text"
								placeholder="HH:MM:SS"
								value={formData.horario || ''}
							/>
							<Select
								name="gym_id"
								onChange={handleInput}
								label="Selecione a Filial"
								required
								data={gyms.map((gym) => ({ text: gym.name, value: gym.id }))}
								value={selectedGymId}
								defaultText="Selecione"
								disabled={!isAdmin}
							/>
							<Select
								name="personal_trainer_id"
								onChange={handleInput}
								label="Selecione o Personal Trainer"
								data={personalTrainersOptions}
								value={formData?.personal_trainer_id}
								defaultText="Selecione"
							/>
							<SelectCheckBox
								name="athlete_id"
								onChange={handleInput}
								label="Selecione os Atletas"
								data={ahletes.map((athlete) => ({ text: athlete.name, value: athlete.id }))}
								value={formData?.athlete_id}
								defaultText="Selecione"
								multiple
							/>
						</form>
					</div>
					<div className="flex flex-col gap-2">
						<Button
							onClick={handleSubmit}
							variant="green"
							text="Cadastrar"
							type="button"
						/>
						<Button
							onClick={handleUpdate}
							variant="gray-light"
							text="Salvar"
							type="button"
						/>
						<Button
							onClick={() => {
								setSelectAulas(selectedAulas)
								handleOpenDeleteModal()
							}}
							variant="red"
							text="Excluir"
							type="button"
						/>
						<Button
							onClick={() => {
								handleClear()
							}}
							variant="default"
							text="Limpar"
							type="button"
						/>
						<Button
							onClick={handleOpenPdf}
							variant="default"
							text="Gerar Pdf"
							type="button"
						/>
					</div>
				</div>
				<div>
					<fieldset>
						<legend>Filtro</legend>
						<FilterLesson onFilter={handleFilter} />
						<ListContainer>
						<table className="w-full">
							<thead>
								<tr className="gap-10">
									<td>Nome</td>
									<td>Tipo</td>
									<td>Horário</td>
									<td>Data do Treino</td>
									<td>Filial</td>
									<td>Personal Trainer</td>
									<td>Data</td>
								</tr>
							</thead>
							<tbody>
								{aulas.map((aula) => {
									return (
										<tr
											key={aula.id}
											className="cursor-pointer hover:bg-gray-100"
											onClick={() => {
												setFormData(aula)
												setSelectAulas(aula)
											}}
										>
											<td>{aula.name}</td>
											<td>{aula.tipo}</td>
											<td>{aula.horario}</td>
											<td>{aula.data}</td>
											<td>{aula.gym_id}</td>
											<td>{aula.personal_trainer_id}</td>
											<td>{DateUtils.getDatePt(aula.created_at).toString()}</td>
										</tr>
									)
								})}
							</tbody>
						</table>
						</ListContainer>
						{!loading && aulas.length < 1 && <NoData />}
					</fieldset>
				</div>
			</LayoutBody>
		</Layout>
	)
}
