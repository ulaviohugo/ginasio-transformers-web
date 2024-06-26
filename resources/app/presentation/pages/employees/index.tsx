import React, { useEffect, useState } from 'react'
import { EmployeeModel } from '@/domain/models'
import {
	CardActions,
	EmployeeEditor,
	IconClock,
	IconPhone,
	IconPlus,
	IconSearch,
	IconUser,
	Input,
	Layout,
	LayoutBody,
	ModalDelete,
	Spinner,
	SubMenu,
	Title
} from '@/presentation/components'
import { DateUtils, NumberUtils, MenuUtils } from '@/utils'
import { toast } from 'react-hot-toast'
import {
	makeRemoteDeleteEmployee,
	makeRemoteUpdateEmployee,
	makeRemoteAddEmployee,
	makeRemoteLoadEmployees
} from '@/main/factories/usecases'
import { loadEmployeeStore, removeEmployeeStore } from '@/presentation/redux'
import { useDispatch, useSelector } from 'react-redux'

import { useAuth, useEmployees } from '@/presentation/hooks'
import { NotFound } from '@/presentation/pages'

export function Employees() {
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	const [selectedEmployee, setSelectedEmployee] = useState<EmployeeModel>(
		{} as EmployeeModel
	)
	const [isLoading, setIsLoading] = useState(true)
	const [showEditor, setShowEditor] = useState(false)
	const [showFormDelete, setShowFormDelete] = useState(false)
	const employees = useSelector(useEmployees())
	const dispatch = useDispatch()

	const fetchData = async () => {
		if (!isAdmin) return setIsLoading(false)
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

	const clearSelectedEmployee = () => {
		setSelectedEmployee({} as EmployeeModel)
	}

	const handleCloseDetail = () => {
		clearSelectedEmployee()
		setShowEditor(false)
	}

	const handleOpenDetalhe = (employee?: EmployeeModel) => {
		if (employee) setSelectedEmployee(employee)
		setShowEditor(true)
	}

	const handleOpenFormDelete = (employee: EmployeeModel) => {
		setSelectedEmployee(employee)
		setShowFormDelete(true)
	}

	const handleCloseFormDelete = () => {
		clearSelectedEmployee()
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeleteEmployee().delete(selectedEmployee.id)
			dispatch(removeEmployeeStore(selectedEmployee.id))
			toast.success(`Funcionário(a) ${selectedEmployee.name} foi excluído`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	if (!isAdmin) return <NotFound />
	return (
		<Layout>
			{showEditor && (
				<EmployeeEditor
					employee={selectedEmployee}
					show={showEditor}
					onClose={handleCloseDetail}
					addEmployee={makeRemoteAddEmployee()}
					updateEmployee={makeRemoteUpdateEmployee()}
				/>
			)}
			{showFormDelete && (
				<ModalDelete
					entity="funcionário"
					description={`Deseja realmente excluir ${selectedEmployee.name}?`}
					show={showFormDelete}
					onClose={handleCloseFormDelete}
					onSubmit={handleDelete}
				/>
			)}
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={MenuUtils.hrMenuItens({ role: user.role })} />
					<Title
						title={`Funcionários ${isLoading ? '' : `(${employees?.length})`}`}
						icon={IconUser}
					/>
					<div className="flex items-center gap-2">
						<button
							className="bg-primary px-2 py-1 rounded-md text-gray-200"
							title="Novo funcionário"
							onClick={() => handleOpenDetalhe()}
						>
							<IconPlus />
						</button>
						<div className="w-full max-w-xs">
							<Input placeholder="Pesquisar por ID, nome e e-mail" icon={IconSearch} />
						</div>
					</div>
					{isLoading ? (
						<Spinner data="Carregando funcionários..." />
					) : employees?.length < 1 ? (
						<div>Nenhum funcionário de momento.</div>
					) : (
						<ul className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
							{employees.map((employee) => (
								<li key={employee.id} className="p-4 shadow">
									<div className="flex items-center gap-1 mb-3">
										{employee.photo ? (
											<img
												src={employee.photo}
												alt={`Foto de perfil`}
												width={50}
												height={50}
												className="rounded-full object-cover aspect-square"
											/>
										) : (
											<IconUser size={50} />
										)}
										<div>
											<div className="font-semibold">{employee.name}</div>
											<div className="flex items-center gap-1 text-sm font-normal">
												<IconPhone /> {NumberUtils.format(employee.phone)}
											</div>
										</div>
									</div>
									<div className="flex items-center gap-1 text-sm">
										<IconClock /> Início de contrato:{' '}
										{DateUtils.getDatePt(employee.hire_date, '/')}
									</div>
									{employee.contract_end_date && (
										<div className="flex items-center gap-1 text-sm">
											<IconClock /> Fim de contrato:{' '}
											{DateUtils.getDatePt(employee.contract_end_date, '/')}
										</div>
									)}
									<CardActions
										onClickDelete={() => handleOpenFormDelete(employee)}
										onClickEdit={() => handleOpenDetalhe(employee)}
									/>
								</li>
							))}
						</ul>
					)}
				</div>
			</LayoutBody>
		</Layout>
	)
}
