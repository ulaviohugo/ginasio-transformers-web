import React from 'react'
import { EmployeeModel, SalaryReceiptModel } from '@/domain/models'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { useAuth } from '@/presentation/hooks'
import { DateUtils, NumberUtils } from '@/utils'
import { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { PdfViewer } from '../pdf-viewer'
import { Button, Input, InputPrice, Select, TextArea } from '../form-controls'
import { IconCheck, IconClose } from '../icons'
import { SalaryReceiptTemplate } from '../templates-pdf'

const date = new Date()
const initialData: SalaryReceiptModel = {
	month: date.getUTCMonth() + 1,
	year: date.getFullYear(),
	work_days: 26,
	meal_allowance: 5_000,
	transportation_allowance: 10_000,
	productivity_allowance: 10_000
} as SalaryReceiptModel

type SalaryReceiptCardProps = {
	employee: EmployeeModel
	onClear: () => void
	data?: SalaryReceiptModel
}

export const SalaryReceiptCard = ({
	employee,
	onClear,
	data
}: SalaryReceiptCardProps) => {
	const user = useSelector(useAuth())
	const years = [
		date.getUTCFullYear() + 1,
		date.getUTCFullYear(),
		date.getUTCFullYear() - 1
	]

	const [receiptData, setReceiptDate] = useState<SalaryReceiptModel>({} as any)
	const [pdfUrl, setPdfUrl] = useState('')

	useEffect(() => {
		setReceiptDate({ ...initialData, employee_id: employee.id, ...data })
	}, [employee.id, data])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setReceiptDate((prev) => ({ ...prev, [name]: value }))
	}

	const handleSave = async () => {
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
		const { statusCode, body } = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/salary-receipts'),
			method: 'post',
			body: data
		})

		if (statusCode != 200) {
			toast.error(body)
		} else {
			const salaryReceipt: SalaryReceiptModel = body
			setPdfUrl(salaryReceipt.file_path)
			toast.success('Recibo processado com sucesso')
		}
	}

	const handleClear = () => {
		setReceiptDate({} as any)
		onClear()
	}

	return (
		<>
			<PdfViewer pdfUrl={pdfUrl} onClose={() => setPdfUrl('')} />
			<div className="flex flex-col gap-3">
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

				<div className="flex gap-2">
					<Button
						variant="green"
						text="Processar"
						icon={IconCheck}
						onClick={handleSave}
					/>
					<Button
						variant="gray-light"
						text="Limpar"
						icon={IconClose}
						onClick={handleClear}
					/>
				</div>
				<SalaryReceiptTemplate
					employee={employee}
					receiptData={receiptData}
					setReceiptDate={setReceiptDate}
					currentUser={user}
				/>
			</div>
		</>
	)
}
