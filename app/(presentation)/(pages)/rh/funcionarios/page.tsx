'use client'

import { useEffect, useState } from 'react'
import { Employee } from '@/app/domain/models'
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
} from '@/app/(presentation)/components'
import { DateUtils, NumberUtils, SubmenuUtils } from '@/app/utils'
import { toast } from 'react-hot-toast'
import {
	makeRemoteDeleteEmployee,
	makeRemoteUpdateEmployee,
	makeRemoteAddEmployee,
	makeRemoteLoadEmployees
} from '@/app/main/factories/usecases/remote'
import { loadEmployeeStore, removeEmployeeStore } from '../../../redux'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { useEmployees } from '../../../hooks'

export default function Employees() {
	const [selectedEmployee, setSelectedEmployee] = useState<Employee>({} as Employee)
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

	const clearSelectedEmployee = () => {
		setSelectedEmployee({} as Employee)
	}

	const handleCloseDetail = () => {
		clearSelectedEmployee()
		setShowEditor(false)
	}

	const handleOpenDetalhe = (employee?: Employee) => {
		if (employee) setSelectedEmployee(employee)
		setShowEditor(true)
	}

	const handleOpenFormDelete = (employee: Employee) => {
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
					<SubMenu submenus={SubmenuUtils.hr} />
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
										{employee.image ? (
											<Image
												src={employee.image}
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
												<IconPhone /> {NumberUtils.format(employee.phone1)}
											</div>
										</div>
									</div>
									<div className="flex items-center gap-1 text-sm">
										<IconClock /> Início de contrato:{' '}
										{DateUtils.getDatePt(employee.hireDate, '/')}
									</div>
									{employee.contractEndDate && (
										<div className="flex items-center gap-1 text-sm">
											<IconClock /> Fim de contrato:{' '}
											{DateUtils.getDatePt(employee.contractEndDate, '/')}
										</div>
									)}
									<div className="flex items-center gap-1 text-sm">
										<IconPhone /> Telefone: {NumberUtils.format(employee.phone1)}
									</div>
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