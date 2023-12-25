import { AbsenceJustificationModel } from '@/domain/models'
import {
	AddAbsenceJustification,
	LoadEmployees,
	UpdateAbsenceJustification
} from '@/domain/usecases'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Button, Input, Select, TextArea } from '../../form-controls'
import { IconCheck, IconClose, IconEdit, IconTrash } from '../../icons'
import { PdfViewer } from '../../pdf-viewer'
import { useDispatch, useSelector } from 'react-redux'
import { useEmployees } from '@/presentation/hooks'
import toast from 'react-hot-toast'
import {
	addAbsenceJustificationStore,
	loadEmployeeStore,
	updateAbsenceJustificationStore
} from '@/presentation/redux'
import { DateUtils } from '@/utils'

const initialAbsentReasons = [
	{ text: 'Injustificada' },
	{ text: 'Estudo' },
	{ text: 'Acidente de Trabalho' },
	{ text: 'Casamento' },
	{ text: 'Doença' },
	{ text: 'Falecimento Familiar' },
	{ text: 'Maternidade' },
	{ text: 'Outro', value: -1 }
]

type FormDataProps = AbsenceJustificationModel & { absence_reason_2: string }

type AbsenceJustificationEditorProps = {
	addAbsenceJustification: AddAbsenceJustification
	updateAbsenceJustification: UpdateAbsenceJustification
	loadEmployees: LoadEmployees
	data?: AbsenceJustificationModel
	onDelete: () => void
}

export function AbsenceJustificationEditor({
	addAbsenceJustification,
	updateAbsenceJustification,
	loadEmployees,
	data,
	onDelete
}: AbsenceJustificationEditorProps) {
	const dispatch = useDispatch()

	const [formData, setFormData] = useState<FormDataProps>({} as any)
	const [absentReasons, setAbsentReasons] = useState(initialAbsentReasons)
	const absentDays = useMemo(() => {
		let days = 0
		if (formData.starts_at && formData.ends_at) {
			days =
				DateUtils.convertToDate(formData.ends_at).getTime() -
				DateUtils.convertToDate(formData.starts_at).getTime()

			days = days / (1000 * 60 * 60 * 24)
		}
		return days
	}, [formData.ends_at, formData.starts_at])

	const showPurposeInput = formData?.absence_reason == '-1'

	const [pdfUrl, setPdfUrl] = useState('')

	const employees = useSelector(useEmployees())

	useEffect(() => {
		if (data?.id) {
			setFormData(data as any)
			if (!initialAbsentReasons.find(({ text }) => text == data.absence_reason)) {
				setAbsentReasons([...initialAbsentReasons, { text: data.absence_reason }])
			}
		} else {
			setFormData({} as any)
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

	const handleChangeInput = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		let data = { ...formData, [name]: value }
		if (name == 'absence_reason') {
			data = { ...data, absence_reason_2: undefined as any }
		}
		setFormData(data)
	}

	const handleSubmit = async (type: 'save' | 'update' = 'save') => {
		try {
			const update = type == 'update'
			if (update && !formData.id) {
				return toast.error('Selecione um registo na tabela abaixo para editar')
			}
			const data: FormDataProps = {
				...formData,
				absence_reason: formData.absence_reason_2 || formData.absence_reason
			}
			const httpResponse = await (update
				? updateAbsenceJustification.update(data)
				: addAbsenceJustification.add(data))

			setPdfUrl(httpResponse.file_path)
			toast.success('Admissão processada com sucesso')
			if (update) {
				dispatch(updateAbsenceJustificationStore(httpResponse))
			} else {
				dispatch(addAbsenceJustificationStore(httpResponse))
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
			<legend>Novo formulário de admissão</legend>
			<PdfViewer pdfUrl={pdfUrl} onClose={() => setPdfUrl('')} />

			<div className="flex gap-2">
				<div className="flex-1 flex flex-col gap-2">
					<div className="grid grid-cols-4 items-start gap-2">
						<Select
							name="employee_id"
							label="Funcionário"
							data={employees.map(({ name, id }) => ({ text: name, value: id }))}
							defaultText="Selecione"
							value={formData?.employee_id || ''}
							onChange={handleChangeInput}
						/>
						<Select
							name="absence_reason"
							label="Motivo de ausência"
							data={absentReasons.map(({ text, value }) => ({
								text,
								value
							}))}
							value={formData.absence_reason || ''}
							defaultText="Selecione"
							onChange={handleChangeInput}
						/>
						{showPurposeInput && (
							<Input
								name="absence_reason_2"
								label="Digite o motivo de ausência"
								value={formData.absence_reason_2 || ''}
								onChange={handleChangeInput}
							/>
						)}
						<Input
							name="starts_at"
							type="date"
							label="Data Início"
							value={(formData.starts_at as any) || ''}
							onChange={handleChangeInput}
						/>
						<Input
							name="ends_at"
							type="date"
							label="Data Fim"
							value={(formData.ends_at as any) || ''}
							onChange={handleChangeInput}
						/>
						<Input
							label="Dias Ausentes"
							value={absentDays}
							onChange={handleChangeInput}
							disabled
						/>
					</div>
					<div className="grid grid-cols-2">
						<TextArea
							name="absence_description"
							label="Nota de ausência"
							value={(formData.absence_description as any) || ''}
							onChange={handleChangeInput}
						/>
						<TextArea
							name="adicional_information"
							label="Informação complementar"
							value={(formData.adicional_information as any) || ''}
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
