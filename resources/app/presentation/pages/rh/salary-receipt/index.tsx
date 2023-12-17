import React, { ChangeEvent, useEffect, useState } from 'react'
import {
	Layout,
	LayoutBody,
	SalaryReceiptCard,
	SalaryReceiptList,
	Select,
	SubMenu,
	Title
} from '@/presentation/components'
import { useAuth, useEmployees } from '@/presentation/hooks'
import { loadEmployeeStore } from '@/presentation/redux'
import { EmployeeModel, SalaryReceiptModel } from '@/domain/models'
import { makeRemoteLoadEmployees } from '@/main/factories/usecases'
import { NotFound } from '@/presentation/pages'
import { MenuUtils } from '@/utils'
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

	const [selectedSalaryReceipt, setSelectedSalaryReceipt] = useState<SalaryReceiptModel>(
		{} as SalaryReceiptModel
	)

	const handleSelectSalaryReceipt = (salaryReceipt: SalaryReceiptModel) => {
		console.log({ salaryReceipt })

		setSelectedSalaryReceipt(salaryReceipt)
		setSelectedEmployee(salaryReceipt.employee as any)
	}

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
				<div className="flex flex-col gap-1 mb-3">
					<SubMenu submenus={MenuUtils.hrMenuItens({ role: user.role })} />
					<Title title="Folha salarial" />
					<fieldset>
						<legend>Cadastrar processamento</legend>
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
							<SalaryReceiptCard
								employee={selectedEmployee}
								onClear={() => setSelectedEmployee({} as any)}
								data={selectedSalaryReceipt}
							/>
						) : (
							<div>Selecione um funcionário</div>
						)}
					</fieldset>
				</div>
				<SalaryReceiptList onSelect={handleSelectSalaryReceipt} />
			</LayoutBody>
		</Layout>
	)
}
