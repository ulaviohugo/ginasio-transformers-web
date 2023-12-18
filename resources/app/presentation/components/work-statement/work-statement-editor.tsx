import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Input, Select } from '../form-controls'
import { WorkStatementModel } from '@/domain/models'
import { useDispatch, useSelector } from 'react-redux'
import { useEmployees } from '@/presentation/hooks'
import { IconCheck, IconClose, IconEdit, IconTrash } from '../icons'
import toast from 'react-hot-toast'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { PdfViewer } from '../pdf-viewer'
import {
	addWorkStatementStore,
	loadEmployeeStore,
	updateWorkStatementStore
} from '@/presentation/redux'
import { makeRemoteLoadEmployees } from '@/main/factories'

type WorkStatementEditorProps = {
	data?: WorkStatementModel
}

type FormDataProps = WorkStatementModel & { purpose_2: string }
export function WorkStatementEditor({ data }: WorkStatementEditorProps) {
	const dispatch = useDispatch()

	const [formData, setFormData] = useState<FormDataProps>({} as any)
	const [pdfUrl, setPdfUrl] = useState('')

	const showPurposeInput = formData?.purpose == '-1'
	const employees = useSelector(useEmployees())

	useEffect(() => {
		if (data?.id) setFormData(data as any)
	}, [data])

	useEffect(() => {
		if (employees.length < 1) {
			makeRemoteLoadEmployees()
				.load()
				.then((response) => dispatch(loadEmployeeStore(response)))
				.catch(({ message }) => toast.error(message))
		}
	}, [])

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		let data = { ...formData, [name]: value }
		if (name == 'purpose') {
			data = { ...data, purpose_2: undefined as any }
		}
		setFormData(data)
	}
	const handleSubmit = async (type: 'save' | 'update' = 'save') => {
		if (formData.purpose == '-1' && !formData.purpose_2)
			return toast.error('Informe o efeito')

		const update = type == 'update'
		if (update && !formData.id)
			return toast.error('Selecione um registo na tabela abaixo para editar')

		const body: FormDataProps = {
			...formData,
			purpose: formData.purpose_2 || formData.purpose
		}

		const method = update ? 'put' : 'post'
		const { statusCode, body: httpData } =
			await makeAuthorizeHttpClientDecorator().request({
				url: makeApiUrl(`/work-statements${update ? `/${formData.id}` : ''}`),
				method,
				body
			})

		if (statusCode != 200) {
			toast.error(httpData)
		} else {
			const salaryReceipt: WorkStatementModel = httpData
			setPdfUrl(salaryReceipt.file_path)
			toast.success('Recibo processado com sucesso')
			if (update) {
				dispatch(updateWorkStatementStore(httpData))
			} else {
				dispatch(addWorkStatementStore(httpData))
			}
		}
	}

	const handleClear = () => {
		setFormData({} as any)
	}
	return (
		<fieldset>
			<legend>Nova declaração de trabalho</legend>
			<PdfViewer pdfUrl={pdfUrl} onClose={() => setPdfUrl('')} />

			<div className="flex">
				<div className="flex-1 grid grid-cols-4 items-start">
					<Select
						name="employee_id"
						label="Funcionário"
						data={employees.map(({ name, id }) => ({ text: name, value: id }))}
						defaultText="Selecione"
						value={formData?.employee_id || ''}
						onChange={handleChangeInput}
					/>
					<Select
						name="purpose"
						label="Efeito"
						data={[
							{ text: 'Carta de Condução' },
							{ text: 'Passaporte' },
							{ text: 'Visto de Estudante' },
							{ text: 'Visto de Trabalho' },
							{ text: 'Outro', value: -1 }
						]}
						defaultText="Selecione"
						value={formData?.purpose || ''}
						onChange={handleChangeInput}
					/>
					{showPurposeInput && (
						<Input
							name="purpose_2"
							label="Digite o efeito"
							value={formData.purpose_2 || ''}
							onChange={handleChangeInput}
						/>
					)}
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
					<Button variant="red" text="Excluir" icon={IconTrash} />
				</div>
			</div>
		</fieldset>
	)
}
