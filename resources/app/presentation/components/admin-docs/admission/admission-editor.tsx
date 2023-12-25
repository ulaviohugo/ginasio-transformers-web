import { AdmissionModel } from '@/domain/models'
import { AddAdmission, LoadEmployees, UpdateAdmission } from '@/domain/usecases'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Button, Input, Select } from '../../form-controls'
import { IconCheck, IconClose, IconEdit, IconPlus, IconTrash } from '../../icons'
import { PdfViewer } from '../../pdf-viewer'
import { useDispatch, useSelector } from 'react-redux'
import { useEmployees } from '@/presentation/hooks'
import toast from 'react-hot-toast'
import {
	addAdmissionStore,
	loadEmployeeStore,
	updateAdmissionStore
} from '@/presentation/redux'
import { ArrayUtils, NumberUtils, ObjectUtils } from '@/utils'

type OptionProps = { [key: number]: string }

const initialWorkTools: OptionProps = {
	0: 'Máquina de Costura',
	1: 'Tesoura',
	2: 'Fita Métrica',
	3: 'Alfinete',
	4: 'Cracha/Passe',
	5: 'Motorizada',
	6: 'Capacete',
	7: 'Material Escritório'
}

const initialTrainings: OptionProps = {
	0: 'Modelagem',
	1: 'Corte',
	2: 'Costura',
	3: 'Word',
	4: 'Excel',
	5: 'Internet'
}

type AdmissionEditorProps = {
	addAdmission: AddAdmission
	updateAdmission: UpdateAdmission
	loadEmployees: LoadEmployees
	data?: AdmissionModel
	onDelete: () => void
}

export function AdmissionEditor({
	addAdmission,
	updateAdmission,
	loadEmployees,
	data,
	onDelete
}: AdmissionEditorProps) {
	const dispatch = useDispatch()

	const [formData, setFormData] = useState<AdmissionModel>({} as any)
	const [pdfUrl, setPdfUrl] = useState('')

	const employees = useSelector(useEmployees())

	const [workToolItems, setWorkToolItems] = useState(initialWorkTools)
	const workToolList = useMemo(() => Object.keys(workToolItems), [workToolItems])

	const [trainingItems, setTrainingItems] = useState(initialTrainings)
	const trainingList = useMemo(() => Object.keys(trainingItems), [trainingItems])

	const [selectedTrainingItems, setSelectedTrainingItems] = useState<string[]>([])
	const [selectedWorkToolItems, setSelectedWorkToolItems] = useState<string[]>([])

	const [newWorkTool, setNewWorkTool] = useState('')
	const [newTraining, setNewTraining] = useState('')

	useEffect(() => {
		if (data?.id) {
			setFormData(data as any)
			setSelectedTrainingItems(data.clothes_production_training)
			setSelectedWorkToolItems(data.working_tools)

			const _workItems = new Set([...Object.values(workToolItems), ...data.working_tools])
			setWorkToolItems(ObjectUtils.convertToObject<any>(Array.from(_workItems)))

			const _trainingItems = new Set([
				...Object.values(trainingItems),
				...data.clothes_production_training
			])

			setTrainingItems(ObjectUtils.convertToObject<any>(Array.from(_trainingItems)))
		} else {
			setFormData({} as any)
			setSelectedTrainingItems([])
			setSelectedWorkToolItems([])
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

	const handleChangeTraining = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		let data: string[] = [...selectedTrainingItems] || []
		const oldValue = selectedTrainingItems.find((item) => item == value)
		if (oldValue) {
			data = selectedTrainingItems.filter((item) => item != value)
		} else {
			data.push(value)
		}
		setSelectedTrainingItems(data)
	}

	const handleChangeWorkTool = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		let data: string[] = [...selectedWorkToolItems] || []
		const oldValue = selectedWorkToolItems.find((item) => item == value)
		if (oldValue) {
			data = selectedWorkToolItems.filter((item) => item != value)
		} else {
			data.push(value)
		}
		setSelectedWorkToolItems(data)
	}

	const handleChangeNewWorkTool = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setNewWorkTool(value)
	}

	const handleAddNewWorkTool = () => {
		if (!newWorkTool?.trim()) return toast.error('Digite um item')

		const data = { ...workToolItems }
		const keys = Object.keys(data)

		const key =
			ArrayUtils.getGreaterValue(
				keys.map((keyItem) => NumberUtils.convertToNumber(keyItem))
			) + 1
		Object.assign(data, { [key]: newWorkTool })
		setWorkToolItems(data)
		setNewWorkTool('')
	}

	const handleChangeNewTraining = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setNewTraining(value)
	}

	const handleAddNewTraining = () => {
		if (!newTraining?.trim()) return toast.error('Digite um item')

		const data = { ...trainingItems }
		const keys = Object.keys(data)

		const key =
			ArrayUtils.getGreaterValue(
				keys.map((keyItem) => NumberUtils.convertToNumber(keyItem))
			) + 1
		Object.assign(data, { [key]: newTraining })
		setTrainingItems(data)
		setNewTraining('')
	}

	const handleSubmit = async (type: 'save' | 'update' = 'save') => {
		try {
			const update = type == 'update'
			if (update && !formData.id) {
				return toast.error('Selecione um registo na tabela abaixo para editar')
			}

			const data: AdmissionModel = {
				...formData,
				working_tools: selectedWorkToolItems,
				clothes_production_training: selectedTrainingItems
			}
			const httpResponse = await (update
				? updateAdmission.update(data)
				: addAdmission.add(data))

			setPdfUrl(httpResponse.file_path)
			toast.success('Admissão processada com sucesso')
			if (update) {
				dispatch(updateAdmissionStore(httpResponse))
			} else {
				dispatch(addAdmissionStore(httpResponse))
			}
		} catch ({ message }: any) {
			toast.error(message)
		}
	}

	const handleClear = () => {
		setFormData({} as any)
		setSelectedTrainingItems([])
		setSelectedWorkToolItems([])
	}
	return (
		<fieldset>
			<legend>Novo formulário de admissão</legend>
			<PdfViewer pdfUrl={pdfUrl} onClose={() => setPdfUrl('')} />

			<div className="flex gap-2">
				<div className="flex-1 flex flex-col gap-2">
					<div className="grid grid-cols-4 items-start">
						<Select
							name="employee_id"
							label="Funcionário"
							data={employees.map(({ name, id }) => ({ text: name, value: id }))}
							defaultText="Selecione"
							value={formData?.employee_id || ''}
							onChange={handleChangeInput}
						/>
					</div>
					<fieldset className="">
						<legend>Instrumentos e condições de trabalho</legend>
						{workToolList.map((key, i) => {
							const label = workToolItems[Number(key)]
							return (
								<label
									key={i}
									className="inline-flex items-center gap-1 ml-2 mt-2 border px-3 rounded-md cursor-pointer"
								>
									<span>{label}</span>{' '}
									<input
										type="checkbox"
										onChange={handleChangeWorkTool}
										value={label}
										checked={selectedWorkToolItems.includes(label)}
									/>
								</label>
							)
						})}
						<div className="flex mt-3">
							<div>
								<Input
									value={newWorkTool}
									placeholder="Digite um item novo"
									onChange={handleChangeNewWorkTool}
								/>
							</div>
							<Button
								variant="gray-light"
								text="Adicionar"
								icon={IconPlus}
								onClick={handleAddNewWorkTool}
							/>
						</div>
					</fieldset>
					<fieldset className="">
						<legend>Formação de produção de roupas</legend>
						{trainingList.map((key, i) => {
							const label = trainingItems[Number(key)]
							return (
								<label
									key={i}
									className="inline-flex items-center gap-1 ml-2 mt-2 border px-3 rounded-md cursor-pointer"
								>
									<span>{label}</span>{' '}
									<input
										type="checkbox"
										onChange={handleChangeTraining}
										value={label}
										checked={selectedTrainingItems.includes(label)}
									/>
								</label>
							)
						})}
						<div className="flex mt-3">
							<div>
								<Input
									value={newTraining}
									placeholder="Digite um item novo"
									onChange={handleChangeNewTraining}
								/>
							</div>
							<Button
								variant="gray-light"
								text="Adicionar"
								icon={IconPlus}
								onClick={handleAddNewTraining}
							/>
						</div>
					</fieldset>
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
