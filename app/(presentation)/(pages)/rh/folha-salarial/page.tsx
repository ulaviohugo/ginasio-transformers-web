'use client'
import {
	Layout,
	LayoutBody,
	Select,
	SubMenu,
	Title
} from '@/app/(presentation)/components'
import { SalaryReceiptTemplate } from '@/app/(presentation)/components/templates-pdf'
import { RootState } from '@/app/(presentation)/redux'
import { Employee } from '@/app/domain/models'
import { SubmenuUtils } from '@/app/utils'
import React, { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux'

export default function FolhaSalarial() {
	const employees = useSelector((state: RootState) => state.employees.employees)
	const [selectedEmployee, setSelectedEmployee] = useState<Employee>({} as Employee)

	const handleSelectEmployee = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target
		const id = Number(value)
		const emp = employees.find((employee) => employee.id == id) || ({} as Employee)
		setSelectedEmployee(emp)
	}
	return (
		<Layout>
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={SubmenuUtils.hr} />
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
							/>
						</div>
					</div>
					{selectedEmployee?.id ? (
						<SalaryReceiptTemplate employee={selectedEmployee} />
					) : (
						<div>Selecione um funcionário</div>
					)}
				</div>
			</LayoutBody>
		</Layout>
	)
}
