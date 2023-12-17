import React, { ChangeEvent, useEffect, useState } from 'react'
import {
	Layout,
	LayoutBody,
	ModalDelete,
	SalaryReceiptCard,
	SalaryReceiptList,
	Select,
	SubMenu,
	Title
} from '@/presentation/components'
import { useAuth, useEmployees } from '@/presentation/hooks'
import { loadEmployeeStore, removeSalaryReceiptStore } from '@/presentation/redux'
import { EmployeeModel, SalaryReceiptModel } from '@/domain/models'
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

	const [showFormDelete, setShowFormDelete] = useState(false)

	const [selectedSalaryReceipt, setSelectedSalaryReceipt] = useState<SalaryReceiptModel>(
		{} as SalaryReceiptModel
	)

	const handleSelectSalaryReceipt = (salaryReceipt: SalaryReceiptModel) => {
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
		setSelectedSalaryReceipt({} as any)
	}

	const onDelete = async () => {
		setShowFormDelete(true)
	}

	const handleDelete = async () => {
		try {
			const { statusCode, body } = await makeAuthorizeHttpClientDecorator().request({
				url: makeApiUrl(`/salary-receipts/${selectedSalaryReceipt.id}`),
				method: 'delete'
			})
			if (statusCode != 200) {
				toast.error(body)
				return
			}
			toast.success('Recibo excluído com sucesso')
			setShowFormDelete(false)
			dispatch(removeSalaryReceiptStore(selectedSalaryReceipt.id))
		} catch ({ message }) {
			toast.error(message)
		}
	}

	if (!isAdmin) return <NotFound />
	return (
		<Layout>
			{showFormDelete && (
				<ModalDelete
					entity="recibo"
					description={`Deseja realmente excluir o recibo de
					${selectedSalaryReceipt.employee?.name}
						 de ${DateUtils.getMonthExt(selectedSalaryReceipt.month - 1)}/${
								selectedSalaryReceipt.year
							}?`}
					show={showFormDelete}
					onClose={() => setShowFormDelete(false)}
					onSubmit={handleDelete}
				/>
			)}
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
								onDelete={onDelete}
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
