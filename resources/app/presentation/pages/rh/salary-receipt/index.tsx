import React, { ChangeEvent, useEffect, useState } from 'react'
import {
	Button,
	IconCheck,
	IconClose,
	Input,
	InputPrice,
	Layout,
	LayoutBody,
	Select,
	SubMenu,
	TextArea,
	Title
} from '@/presentation/components'
import { SalaryReceiptTemplate } from '@/presentation/components/templates-pdf'
import { useAuth, useEmployees } from '@/presentation/hooks'
import { loadEmployeeStore } from '@/presentation/redux'
import { EmployeeModel, SalaryReceiptModel } from '@/domain/models'
import { makeRemoteLoadEmployees } from '@/main/factories/usecases'
import { NotFound } from '@/presentation/pages'
import { DateUtils, MenuUtils, NumberUtils } from '@/utils'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export function EmployeeSalaryReceipt() {
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	const dispatch = useDispatch()

	const employees = useSelector(useEmployees())

	const [selectedEmployee, setSelectedEmployee] = useState<EmployeeModel>(
		{} as EmployeeModel
	)

	const fetchData = async () => {
		if (!isAdmin) return
		try {
			const httpResponse = await makeRemoteLoadEmployees().load()
			dispatch(loadEmployeeStore(httpResponse))
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	useEffect(() => {
		if (employees.length < 1) {
			fetchData()
		}
	}, [])

	const handleSelectEmployee = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target
		const id = Number(value)
		const emp = employees.find((employee) => employee.id == id) || ({} as EmployeeModel)
		setSelectedEmployee(emp)
	}
	if (!isAdmin) return <NotFound />
	return (
		<Layout>
			<LayoutBody>
				<div className="flex flex-col gap-1">
					<SubMenu submenus={MenuUtils.hrMenuItens({ role: user.role })} />
					<Title title="Folha salarial" />
					<div className="flex">
						<div className="">
							<Select
								defaultText="Selecionar funcionário"
								data={employees.map((employee) => ({
									text: employee.name,
									value: employee.id
								}))}
								onChange={handleSelectEmployee}
								value={selectedEmployee?.id || ''}
							/>
						</div>
					</div>
					{selectedEmployee?.id ? (
						<FolhaSalarialCard
							key={selectedEmployee.id}
							employee={selectedEmployee}
							onClear={() => setSelectedEmployee({} as any)}
						/>
					) : (
						<div>Selecione um funcionário</div>
					)}
				</div>
			</LayoutBody>
		</Layout>
	)
}

const date = new Date()
const initialData: SalaryReceiptModel = {
	month: date.getUTCMonth() + 1,
	year: date.getFullYear(),
	work_days: 26,
	meal_allowance: 5_000,
	transportation_allowance: 10_000,
	productivity_allowance: 10_000
} as SalaryReceiptModel

const FolhaSalarialCard = ({
	employee,
	onClear
}: {
	employee: EmployeeModel
	onClear: () => void
}) => {
	const user = useSelector(useAuth())
	const years = [
		date.getUTCFullYear() + 1,
		date.getUTCFullYear(),
		date.getUTCFullYear() - 1
	]

	const [receiptData, setReceiptDate] = useState<SalaryReceiptModel>({} as any)

	useEffect(() => {
		setReceiptDate({ ...initialData, employee_id: employee.id })
	}, [employee.id])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setReceiptDate((prev) => ({ ...prev, [name]: value }))
	}

	const handleSave = async () => {
		const body: SalaryReceiptModel = {
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
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl(`salary-receipts`),
			method: 'post',
			body
		})

		console.log({ httpResponse })
	}

	const handleClear = () => {
		setReceiptDate({} as any)
		onClear()
	}

	return (
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
						value={receiptData.observation}
					/>
				</div>
			</div>

			<div className="flex gap-2">
				<Button variant="green" text="Processar" icon={IconCheck} onClick={handleSave} />
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
	)
}
