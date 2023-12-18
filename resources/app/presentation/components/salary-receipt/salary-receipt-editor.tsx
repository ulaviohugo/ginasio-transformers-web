import React from 'react'
import { EmployeeModel, SalaryReceiptModel } from '@/domain/models'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { useAuth } from '@/presentation/hooks'
import { DateUtils, NumberUtils } from '@/utils'
import { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { PdfViewer } from '../pdf-viewer'
import { Button, Input, InputPrice, Select, TextArea } from '../form-controls'
import { IconCheck, IconClose, IconEdit, IconTrash } from '../icons'
import { SalaryReceiptPreview } from './salary-receipt-preview'
import { addSalaryReceiptStore, updateSalaryReceiptStore } from '@/presentation/redux'

const date = new Date()
const initialData: SalaryReceiptModel = {
	month: date.getUTCMonth() + 1,
	year: date.getFullYear(),
	work_days: 26
} as SalaryReceiptModel

type SalaryReceiptCardProps = {
	employee: EmployeeModel
	onClear: () => void
	data?: SalaryReceiptModel
	onDelete: () => void
}

export const SalaryReceiptEditor = ({
	employee,
	onClear,
	data,
	onDelete
}: SalaryReceiptCardProps) => {
	const dispatch = useDispatch()

	const user = useSelector(useAuth())
	const years = [
		date.getUTCFullYear() + 1,
		date.getUTCFullYear(),
		date.getUTCFullYear() - 1
	]

	const [receiptData, setReceiptDate] = useState<SalaryReceiptModel>({} as any)
	const [pdfUrl, setPdfUrl] = useState('')

	useEffect(() => {
		setReceiptDate({
			...initialData,
			employee_id: employee.id,
			meal_allowance: employee?.meal_allowance,
			transportation_allowance: employee?.transportation_allowance,
			productivity_allowance: employee?.productivity_allowance,
			family_allowance: employee?.family_allowance,
			inss_discount_percent: 3,
			base_salary_received: employee.base_salary,
			...data
		})
	}, [employee, data])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setReceiptDate((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (type: 'save' | 'update' = 'save') => {
		const update = type == 'update'
		if (update && !receiptData.id)
			return toast.error('Selecione um registo na tabela abaixo para editar')

		const data: SalaryReceiptModel = {
			...receiptData,
			meal_allowance: NumberUtils.convertToNumber(receiptData.meal_allowance, true),
			family_allowance: NumberUtils.convertToNumber(receiptData.family_allowance, true),
			holiday_allowance: NumberUtils.convertToNumber(receiptData.holiday_allowance, true),
			christmas_allowance: NumberUtils.convertToNumber(
				receiptData.christmas_allowance,
				true
			),
			transportation_allowance: NumberUtils.convertToNumber(
				receiptData.transportation_allowance,
				true
			),
			productivity_allowance: NumberUtils.convertToNumber(
				receiptData.productivity_allowance,
				true
			)
		}
		const method = update ? 'put' : 'post'
		const { statusCode, body: httpData } =
			await makeAuthorizeHttpClientDecorator().request({
				url: makeApiUrl(`/salary-receipts${update ? `/${receiptData.id}` : ''}`),
				method,
				body: data
			})

		if (statusCode != 200) {
			toast.error(httpData)
		} else {
			const salaryReceipt: SalaryReceiptModel = httpData
			setPdfUrl(salaryReceipt.file_path)
			toast.success('Recibo processado com sucesso')
			if (update) {
				dispatch(updateSalaryReceiptStore(httpData))
			} else {
				dispatch(addSalaryReceiptStore(httpData))
			}
		}
	}

	const handleClear = () => {
		setReceiptDate({} as any)
		onClear()
	}

	const handleDelete = () => {
		if (!receiptData.id) return toast.error('Selecione um registo para excluir')
		onDelete()
	}

	return (
		<>
			<PdfViewer pdfUrl={pdfUrl} onClose={() => setPdfUrl('')} />
			<div className="flex gap-2">
				<div className="flex-1 flex flex-col gap-3">
					<div className="grid grid-cols-5">
						<Input
							type="number"
							name="work_days"
							label="Dias trabalhados"
							value={receiptData.work_days || ''}
							onChange={handleChange}
						/>
						<Select
							name="year"
							label="Ano"
							value={receiptData.year || ''}
							data={years.map((year) => ({
								text: year.toString()
							}))}
							defaultText="Selecione"
							onChange={handleChange}
						/>
						<Select
							name="month"
							label="Mês"
							value={receiptData.month || ''}
							data={DateUtils.getMonthListExt().map((month, i) => ({
								text: month,
								value: i + 1
							}))}
							defaultText="Selecione"
							onChange={handleChange}
						/>
					</div>
					<div className="grid grid-cols-5 gap-2 items-start">
						<InputPrice
							name="meal_allowance"
							label="Subsídio de Alimentação"
							value={receiptData.meal_allowance || ''}
							onChange={handleChange}
						/>
						<InputPrice
							name="productivity_allowance"
							label="Subsídio de Produtividade"
							value={receiptData.productivity_allowance || ''}
							onChange={handleChange}
						/>
						<InputPrice
							name="transportation_allowance"
							label="Subsídio de Transporte"
							value={receiptData.transportation_allowance || ''}
							onChange={handleChange}
						/>
						<InputPrice
							name="family_allowance"
							label="Abono Familiar"
							value={receiptData.family_allowance || ''}
							onChange={handleChange}
						/>
						<InputPrice
							name="holiday_allowance"
							label="Subsídio de férias"
							value={receiptData.holiday_allowance || ''}
							onChange={handleChange}
						/>
						<InputPrice
							name="christmas_allowance"
							label="13º - Décimo terceiro"
							value={receiptData.christmas_allowance || ''}
							onChange={handleChange}
						/>
						<div className="col-span-2">
							<TextArea
								name="observation"
								label="Observação"
								onChange={handleChange}
								value={receiptData.observation || ''}
							/>
						</div>
					</div>
					<SalaryReceiptPreview
						employee={employee}
						receiptData={receiptData}
						setReceiptDate={setReceiptDate}
						currentUser={user}
					/>
				</div>
				<div className="flex flex-col gap-2 border-l pl-2">
					<Button
						variant="green"
						text="Processar"
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
					<Button variant="red" text="Excluir" icon={IconTrash} onClick={handleDelete} />
				</div>
			</div>
		</>
	)
}
