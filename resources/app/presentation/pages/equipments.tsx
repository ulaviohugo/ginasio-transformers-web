import React, { ChangeEvent, useEffect, useState } from 'react'
import {
	Button,
	IconDumbbell,
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
import { FilterDataProps, FilterEquipment } from '../components/filter-Equipment'
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks'
import { NotFound } from './notfound'
import { ModalEdit } from '../components/modal/modal-edit'
import { GymModel } from '@/domain/models/gym'

type FormDataProps = {
	name: string
	description: string
	gym_id: number
}

type MaterialProps = {
	id: number
	name: string
	description: string
	gym_id: number
	created_at: Date
	updated_at: Date
}

export function Equipments() {
	const [materiais, setMateriais] = useState<MaterialProps[]>([])
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [gyms, setGyms] = useState<GymModel[]>([])
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'
	const isAdminBool = user.gym_id != null
	const [selectedMaterial, setSelectMaterial] = useState<MaterialProps>()
	const [formData, setFormData] = useState<FormDataProps>({
		name: '',
		description: '',
		gym_id: '' as any
	})
	const [filtered, setFiltered] = useState<FilterDataProps>({
		created_at: '',
		id: '' as any,
		name: '',
		gym_id: '' as any	
	})
	const [loading, setLoading] = useState(true)

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
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

	const fetchData = async (queryParams?: string) => {
		setLoading(true) // Define o estado de carregamento como verdadeiro antes de fazer a requisição

		try {
			const httpResponse = await makeAuthorizeHttpClientDecorator().request({
				url: makeApiUrl('/materiais' + (queryParams || '')),
				method: 'get'
			})

			if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
				setMateriais(httpResponse.body)
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
			("?gym_id=" + (user.gym_id || ''))
	}, [])


	useEffect(() => {
		if (user.gym_id) {
			setFormData({...formData,gym_id:user.gym_id})
		}
	}, [])

	const handleCloseDeleteModal = () => {
		setShowDeleteModal(false)
	}

	const handleCloseEditModal = () => {
		setShowEditModal(false)
	}

	const handleOpenDeleteModal = () => {
		if (!selectedMaterial?.id) {
			toast.error('Selecione a lista do material que deseja excluir')
		} else {
			setShowDeleteModal(true)
		}
	}
	const handleOpenUpdateModal = () => {
		if (!selectedMaterial?.id) {
			toast.error('Selecione a lista do material que deseja Editar')
		} else {
			setShowEditModal(true)
		}
	}

	const handleClear = () => {
		setSelectMaterial({} as any)
		setFormData({} as any)
	}

	async function handleSubmit() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/materiais'),
			method: 'post',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Material cadastrado com sucesso')
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleDelete() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/materiais/' + selectedMaterial?.id),
			method: 'delete',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Material Excluido com sucesso')
			handleCloseDeleteModal()
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleUpdate() {
		if (!selectedMaterial?.id) {
			return toast.error('Selecione a lista do material que deseja editar')
		}

		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/materiais/' + selectedMaterial?.id),
			method: 'put',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Material Editado com sucesso')
			handleCloseEditModal()
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleFilter(filterData: FilterDataProps) {
		setFiltered(filterData)
		fetchData(
			`?id=${filterData.id}&name=${filterData.name}&created_at=${filterData.created_at}&gym_id=${filtered.gym_id}`
		)
	}

	const handleOpenPdf = () => {
		const queryParams = `?id=${filtered.id}&name=${filtered.name}&created_at=${filtered.created_at}&gym_id=${filtered.gym_id}`
		window.open(`/pdf/materiais${queryParams}`)
	}

	if (!isAdmin) return <NotFound />
	return (
		<Layout title="Equipamentos">
			{showDeleteModal && (
				<ModalDelete
					description="Deseja realmente Excluir o equipamento"
					onClose={handleCloseDeleteModal}
					onSubmit={handleDelete}
					show
				/>
			)}
			{showEditModal && (
				<ModalEdit
					description="Deseja salvar as alterações feitas no(a) equipamento"
					onClose={handleCloseEditModal}
					onSubmit={handleUpdate}
					show
				/>
			)}
			<LayoutBody>
				<div className="flex items-start gap-3">
					<div className="flex-1">
						<Title title="Equipamentos" icon={IconDumbbell} />
						<form className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
	<div className="flex flex-col">
		<Input
			name="name"
			onChange={handleInput}
			label="Nome"
			required
			type="text"
			placeholder="Informe o nome do Equipamento"
			value={formData.name || ''}
		/>
	</div>
	<div className="flex flex-col">
		<Input
			name="description"
			onChange={handleInput}
			label="Descrição"
			required
			type="text"
			placeholder="Qual é a descrição do equipamento"
			value={formData.description || ''}
		/>
	</div>
	<div className="flex flex-col md:col-span-2">
		<Select
			name="gym_id"
			onChange={handleInput}
			label="Selecione a Filial"
			required
			data={gyms.map((gym) => ({ text: gym.name, value: gym.id }))}
			value={isAdminBool ? user.gym_id : formData?.gym_id || ''}
			defaultText="Selecione"
			disabled={isAdminBool}
		/>
	</div>
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
							onClick={() => {
								setSelectMaterial(selectedMaterial)
								handleOpenUpdateModal()
							}}
							variant="gray-light"
							text="Salvar"
							type="button"
						/>
						<Button
							onClick={() => {
								setSelectMaterial(selectedMaterial)
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
						<FilterEquipment onFilter={handleFilter} />
						<ListContainer>
							<table className="w-full">
								<thead>
									<tr className="gap-10">
										<td>Código</td>
										<td>Nome</td>
										<td>Descrição</td>
										<td>Data</td>
									</tr>
								</thead>
								<tbody>
									{materiais.map((material) => {
										return (
											<tr
												key={material.id}
												className="cursor-pointer hover:bg-gray-100"
												onClick={() => {
													setFormData(material)
													setSelectMaterial(material)
												}}
											>
												<td>{material.id}</td>
												<td>{material.name}</td>
												<td>{material.description}</td>
												<td>{DateUtils.getDatePt(material.created_at).toString()}</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</ListContainer>
						{!loading && materiais.length < 1 && <NoData />}
					</fieldset>
				</div>
			</LayoutBody>
		</Layout>
	)
}
