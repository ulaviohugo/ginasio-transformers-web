import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, IconDepartment, Input, Layout, LayoutBody, ModalDelete, Title } from '../components'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import toast from 'react-hot-toast'
import { DateUtils } from '@/utils'
import { FilterDataProps, FilterGym } from '../components/fiter-Gym'
import { NotFound } from './notfound'
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks'
import { ModalEdit } from '../components/modal/modal-edit'

type FormDataProps = {
	name: string
	location: string
}

type GymProps = {
	id: number
	name: string
	location: string
	created_at: Date
	updated_at: Date
}

export function Gyms() {
	const [gyms, setGym] = useState<GymProps[]>([])
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedGym, setSelectGym] = useState<GymProps>()
	const [showEditModal, setShowEditModal] = useState(false)
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'
	const isAdminGlobal = user.gym_id === null
	const [formData, setFormData] = useState<FormDataProps>({ name: '', location: '' })
	const [filtered, setFiltered] = useState<FilterDataProps>({
		name: '',
		created_at: '',
		id: '' as any
	})

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const fetchData = async (queryParams?: string) => {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/gym' + (queryParams || '')),
			method: 'get'
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			setGym(httpResponse.body)
		} else {
			toast.error(httpResponse.body)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const handleCloseDeleteModal = () => {
		setShowDeleteModal(false)
	}

	const handleCloseEditModal = () => {
		setShowEditModal(false)
	}

	const handleOpenDeleteModal = () => {
		if (!selectedGym?.id) {
			toast.error('Selecione o ginásio que deseja excluir')
		} else {
			setShowDeleteModal(true)
		}
	}
	const handleOpenUpdateModal = () => {
		if (!selectedGym?.id) {
			toast.error('Selecione o ginásio que deseja Editar')
		} else {
			setShowEditModal(true)
		}
	}

	const handleClear = () => {
		setSelectGym({} as any)
		setFormData({} as any)
	}

	async function handleSubmit() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/gym'),
			method: 'post',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Ginásio cadastrado com sucesso')
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleDelete() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/gym/' + selectedGym?.id),
			method: 'delete',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Ginásio Excluido com sucesso')
			handleCloseDeleteModal()
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleUpdate() {
		if (!selectedGym?.id) {
			return toast.error('Selecione o ginásio que deseja editar')
		}

		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/gym/' + selectedGym?.id),
			method: 'put',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('As alterações foram salvas com sucesso')
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
			`?id=${filterData.id}&name=${filterData.name}&created_at=${filterData.created_at}`
		)
	}
	
	const handleOpenPdf = () => {
		const queryParams = `?id=${filtered.id}&name=${filtered.name}&created_at=${filtered.created_at}`
		window.open(`/pdf/gyms${queryParams}`)
	}

	if (!(isAdmin && isAdminGlobal)) return <NotFound />
	return (
		<Layout title="Ginásios">
			{showDeleteModal && (
				<ModalDelete
					description="Deseja realmente Excluir o ginásio"
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
					<Title title="Filial" icon={IconDepartment} />
					<form className="flex flex-col md:grid md:grid-cols-2 md:gap-4 gap-4">
	<div className="flex flex-col">
		<Input
			name="name"
			onChange={handleInput}
			label="Nome"
			required
			type="text"
			placeholder="Informe o nome do departamento do ginásio"
			value={formData.name || ''}
		/>
	</div>
	<div className="flex flex-col">
		<Input
			name="location"
			onChange={handleInput}
			label="Localização"
			required
			type="text"
			placeholder="Qual é a localização do ginásio"
			value={formData.location || ''}
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
								setSelectGym(selectedGym)
								handleOpenUpdateModal()
							}}
							variant="gray-light"
							text="Salvar"
							type="button"
						/>
						<Button
							onClick={() => {
								setSelectGym(selectedGym)
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
						<FilterGym onFilter={handleFilter} />
						<table className="w-full">
							<thead>
								<tr className="gap-10">
									<td>Código</td>
									<td>Nome</td>
									<td>Localização</td>
									<td>Data</td>
								</tr>
							</thead>
							<tbody>
								{gyms.map((gym) => {
									return (
										<tr
											key={gym.id}
											className="cursor-pointer hover:bg-gray-100"
											onClick={() => {
												setFormData(gym)
												setSelectGym(gym)
											}}
										>
											<td>{gym.id}</td>
											<td>{gym.name}</td>
											<td>{gym.location}</td>
											<td>{DateUtils.getDatePt(gym.created_at).toString()}</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</fieldset>
				</div>
			</LayoutBody>
		</Layout>
	)
}