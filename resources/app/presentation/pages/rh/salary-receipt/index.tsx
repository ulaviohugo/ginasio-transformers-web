import React, { ChangeEvent, useEffect, useState } from 'react'
import {
	Button,
	IconCheck,
	IconClose,
	Input,
	Layout,
	LayoutBody,
	Select,
	SubMenu,
	TextArea,
	Title
} from '@/presentation/components'
import {
	ReceiptDataProps,
	SalaryReceiptTemplate
} from '@/presentation/components/templates-pdf'
import { useAuth, useEmployees } from '@/presentation/hooks'
import { loadEmployeeStore } from '@/presentation/redux'
import { EmployeeModel } from '@/domain/models'
import { makeRemoteLoadEmployees } from '@/main/factories/usecases'
import { NotFound } from '@/presentation/pages'
import { DateUtils, MenuUtils } from '@/utils'
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
				<div className="flex flex-col gap-2">
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
const initialData = {
	month: date.getUTCMonth(),
	year: date.getFullYear(),
	workedDays: 26
}

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

	const [receiptData, setReceiptDate] = useState<ReceiptDataProps>({} as any)

	useEffect(() => {
		setReceiptDate(initialData)
	}, [])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setReceiptDate((prev) => ({ ...prev, [name]: value }))
	}

	const handleSave = async () => {
		const { month, workedDays, year, observation } = receiptData
		const httpResponse = makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl(`/admin-docs/salary-receipt/${employee.id}`),
			method: 'post',
			body: {
				work_days: workedDays,
				month,
				year,
				observation
			}
		})

		console.log({ httpResponse })
	}

	const handleClear = () => {
		setReceiptDate({} as any)
		onClear()
	}

	return (
		<div className="flex flex-col gap-3">
			<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
				<Input
					type="number"
					name="workedDays"
					label="Dias trabalhado"
					value={receiptData.workedDays || ''}
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
			<div className="max-w-[80%]">
				<TextArea
					name="observation"
					label="Observação"
					onChange={handleChange}
					value={receiptData.observation}
				/>
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
				currentUser={user}
			/>
		</div>
	)
}
