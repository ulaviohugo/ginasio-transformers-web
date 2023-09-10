'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { EmployeeModel } from '@/domain/models'
import {
	CalendarPresence,
	Layout,
	LayoutBody,
	Select,
	SubMenu,
	Title
} from '@/(presentation)/components'
import { SubmenuUtils } from '@/utils'
import { toast } from 'react-hot-toast'
import { makeRemoteLoadEmployees } from '@/main/factories/usecases/remote'
import { loadEmployeeStore } from '@/(presentation)/redux'
import { useDispatch } from 'react-redux'
import { useEmployees } from '@/(presentation)/hooks'

export default function Employees() {
	const [selectedEmployee, setSelectedEmployee] = useState<EmployeeModel>(
		{} as EmployeeModel
	)
	const [isLoading, setIsLoading] = useState(true)
	const [showEditor, setShowEditor] = useState(false)
	const [showFormDelete, setShowFormDelete] = useState(false)
	const employees = useEmployees()
	const dispatch = useDispatch()

	const fetchData = async () => {
		try {
			const httpResponse = await makeRemoteLoadEmployees().load()
			dispatch(loadEmployeeStore(httpResponse))
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const handleSelectEmployee = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target
		const id = Number(value)
		const emp = employees.find((employee) => employee.id == id) || ({} as EmployeeModel)
		setSelectedEmployee(emp)
	}

	return (
		<Layout>
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={SubmenuUtils.hr} />
					<Title title={`Presença`} />
					<div className="flex flex-col gap-2">
						<div className="inline-flex">
							<div>
								<Select
									defaultText="Selecionar funcionário"
									data={employees.map((employee) => ({
										text: employee.name,
										value: employee.id
									}))}
									onChange={handleSelectEmployee}
								/>
							</div>
						</div>
						{employees.length < 1 ? (
							<div>Selecione um funcionário</div>
						) : (
							<CalendarPresence employees={employees} />
						)}
					</div>
				</div>
			</LayoutBody>
		</Layout>
	)
}
