import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Input, Layout, LayoutBody, ModalDelete } from '../components'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import toast from 'react-hot-toast'
import { DateUtils } from '@/utils'
import { FilterDataProps, FilterEquipment } from '../components/filter-Equipment'

type FormDataProps = {
	name: string
	description: string
}

type MaterialProps = {
	id: number
	name: string
	description: string
	created_at: Date
	updated_at: Date
}

export function Equipments() {
	const [materiais, setMateriais] = useState<MaterialProps[]>([])
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedMaterial, setSelectMaterial] = useState<MaterialProps>()
	const [formData, setFormData] = useState<FormDataProps>({ name: '', description: '' })

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const fetchData = async (queryParams?: string) => {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/materiais' + (queryParams || '')),
			method: 'get'
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			setMateriais(httpResponse.body)
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

	const handleOpenDeleteModal = () => {
		if (!selectedMaterial?.id) {
			toast.error('Selecione a lista do material que deseja excluir')
		} else {
			setShowDeleteModal(true)
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
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/materiais/' + selectedMaterial?.id),
			method: 'put',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Material Editado com sucesso')
			fetchData()
			handleClear()
		}
		if (!selectedMaterial?.id) {
			toast.error('Selecione a lista do material que deseja editar')
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleFilter(filterData: FilterDataProps) {
		fetchData(
			`?id=${filterData.id}&name=${filterData.name}&created_at=${filterData.created_at}`
		)
	}

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
			<LayoutBody>
				<div className="flex items-start gap-3">
					<div className="flex-1">
						Equipamentos
						<form className="flex flex-col gap-4">
							<Input
								name="name"
								onChange={handleInput}
								label="Nome"
								type="text"
								placeholder="Informe o nome do Equipamento"
								value={formData.name || ''}
							/>
							<Input
								name="description"
								onChange={handleInput}
								label="Descrição"
								type="text"
								placeholder="Qual é a descrição do equipamento"
								value={formData.description || ''}
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
							text="Editar"
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
					</div>
				</div>
				<div>
					<fieldset>
						<legend>Filtro</legend>
						<FilterEquipment onFilter={handleFilter} />
						<table className="w-full">
							<tr className="gap-10">
								<td>Código</td>
								<td>Nome</td>
								<td>Descrição</td>
								<td>Data</td>
							</tr>
							{materiais.map((material) => {
								return (
									<tr
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
						</table>
					</fieldset>
				</div>
			</LayoutBody>
		</Layout>
	)
}
