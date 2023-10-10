import React, { ChangeEvent, useEffect, useState } from 'react'
import {
	Input,
	Layout,
	LayoutBody,
	Select,
	SubMenu,
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
					<SubMenu submenus={MenuUtils.hrMenuItens()} />
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
								value={''}
							/>
						</div>
					</div>
					{selectedEmployee?.id ? (
						<FolhaSalarialCard key={selectedEmployee.id} employee={selectedEmployee} />
					) : (
						<div>Selecione um funcionário</div>
					)}
				</div>
			</LayoutBody>
		</Layout>
	)
}

const FolhaSalarialCard = ({ employee }: { employee: EmployeeModel }) => {
	const user = useSelector(useAuth())
	const date = new Date()
	const years = [
		date.getUTCFullYear() + 1,
		date.getUTCFullYear(),
		date.getUTCFullYear() - 1
	]
	const currentMonth = date.getUTCMonth()

	const [receiptData, setReceiptDate] = useState<ReceiptDataProps>({} as any)

	useEffect(() => {
		setReceiptDate({
			month: DateUtils.getMonthExt(currentMonth),
			year: years[1],
			workedDays: 22
		})
	}, [])

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setReceiptDate((prev) => ({ ...prev, [name]: value }))
	}

	return (
		<div>
			<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mb-5">
				<Input
					type="number"
					name="workedDays"
					label="Dias trabalhado"
					value={receiptData.workedDays}
					onChange={handleChange}
				/>
				<Select
					name="year"
					label="Ano"
					value={receiptData.year}
					data={years.map((year) => ({
						text: year.toString()
					}))}
					defaultText="Selecione"
					onChange={handleChange}
				/>
				<Select
					name="month"
					label="Mês"
					value={receiptData.month}
					data={DateUtils.getMonthListExt().map((month) => ({
						text: month
					}))}
					defaultText="Selecione"
					onChange={handleChange}
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
