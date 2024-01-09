import { AthleteModel } from '@/domain/models'
import { AddAthlete, LoadEmployees, UpdateAthlete } from '@/domain/usecases'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Input, Select } from '../form-controls'
import { IconCheck, IconClose, IconEdit, IconTrash } from '../icons'
import { PdfViewer } from '../pdf-viewer'
import { useDispatch, useSelector } from 'react-redux'
import { useEmployees } from '@/presentation/hooks'
import toast from 'react-hot-toast'
import {
	addAthleteStore,
	loadEmployeeStore,
	updateAthleteStore
} from '@/presentation/redux'
import { DataUtils } from '@/utils'

type AthleteEditorProps = {
	addAthlete: AddAthlete
	updateAthlete: UpdateAthlete
	loadEmployees: LoadEmployees
	data?: AthleteModel
	onDelete: () => void
}

export function AthleteEditor({
	addAthlete,
	updateAthlete,
	loadEmployees,
	data,
	onDelete
}: AthleteEditorProps) {
	const dispatch = useDispatch()

	const [formData, setFormData] = useState<AthleteModel>({} as any)
	const [pdfUrl, setPdfUrl] = useState('')

	const employees = useSelector(useEmployees())

	useEffect(() => {
		if (data?.id) {
			setFormData(data as any)
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

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async (type: 'save' | 'update' = 'save') => {
		try {
			const update = type == 'update'
			if (update && !formData.id) {
				return toast.error('Selecione um registo na tabela abaixo para editar')
			}

			const httpResponse = await (update
				? updateAthlete.update(formData)
				: addAthlete.add(formData))

			if (update) {
				toast.success('Atleta actualizado com sucesso')
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
	return (
		<fieldset>
			<legend>Novo formulário de atleta</legend>
			<PdfViewer pdfUrl={pdfUrl} onClose={() => setPdfUrl('')} />

			<div className="flex gap-2">
				<div className="flex-1 flex flex-col gap-2">
					<div className="grid grid-cols-4 items-start">
						<Input name="name" label="Nome" value={formData?.name || ''} />
						<Select
							name="gender"
							label="Género"
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
							label="Data Nascimento"
							value={(formData?.date_of_birth as any) || ''}
						/>
						<Select
							name="marital_status"
							label="Estado Civil"
							data={DataUtils.maritalStatus.map((status) => status)}
							defaultText="Selecione"
							value={formData?.marital_status || ''}
							onChange={handleChangeInput}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<Button
						variant="green"
						text="Salvar"
						icon={IconCheck}
						onClick={() => handleSubmit('save')}
					/>
					<Button
						variant="gray-light"
						text="Editar"
						icon={IconEdit}
						onClick={() => handleSubmit('update')}
					/>
					<Button text="Limpar" icon={IconClose} onClick={handleClear} />
					<Button variant="red" text="Excluir" icon={IconTrash} onClick={onDelete} />
				</div>
			</div>
		</fieldset>
	)
}
