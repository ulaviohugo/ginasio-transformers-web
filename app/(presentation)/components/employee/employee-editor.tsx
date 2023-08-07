'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { Employee } from '@/app/domain/models'
import { Input, Modal, ModalBody, ModalTitle, Select, Spinner, TextArea } from '..'

import { DateUtils } from '@/app/utils'
import { addEmployeeStore, updateEmployeeStore } from '../../redux'
import { AddEmployee, UpdateEmployee } from '@/app/domain/usecases'

type EmployeeEditorProps = {
	employee?: Employee
	show: boolean
	onClose: () => void
	addEmployee: AddEmployee
	updateEmployee: UpdateEmployee
}

export function EmployeeEditor({
	employee,
	show,
	onClose,
	addEmployee,
	updateEmployee
}: EmployeeEditorProps) {
	const dispatch = useDispatch()
	const [formDate, setFormData] = useState<Employee>(employee || ({} as Employee))

	const [isLoading, setIsLoading] = useState(false)
	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)
		try {
			const httpResponse = (
				formDate.id
					? await updateEmployee.update(formDate)
					: await addEmployee.add(formDate)
			) as Employee

			if (formDate.id) {
				dispatch(updateEmployeeStore(httpResponse))
			} else {
				dispatch(addEmployeeStore(httpResponse))
			}
			toast.success(
				`Funcionário ${formDate.id ? 'actualizado' : 'cadastrado'} com sucesso`
			)
			onClose()
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<Modal show={show} onClose={onClose}>
			<ModalTitle>
				<h2 className="text-xl font-semibold mb-4">
					{employee?.id ? 'Editar' : 'Cadastrar'} funcionário
				</h2>
			</ModalTitle>
			<ModalBody>
				<div className="mx-auto bg-white p-1 rounded shadow-md">
					<form className="" onSubmit={handleSubmit}>
						<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
							<div className="md:col-span-2">
								<Input
									type="text"
									id="name"
									name="name"
									value={formDate?.name || ''}
									label="Nome"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Select
									id="gender"
									name="gender"
									value={formDate?.gender || ''}
									label="Género"
									data={[{ text: 'Masculino' }, { text: 'Feminino' }]}
									defaultText="Selecione"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="date"
									id="dateOfBirth"
									name="dateOfBirth"
									value={
										(formDate?.dateOfBirth && DateUtils.getDate(formDate?.dateOfBirth)) ||
										''
									}
									label="Data de Nascimento"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="date"
									id="hireDate"
									name="hireDate"
									value={
										(formDate?.hireDate && DateUtils.getDate(formDate?.hireDate)) || ''
									}
									label="Data de Contratação"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Select
									id="maritalStatus"
									name="maritalStatus"
									value={formDate?.maritalStatus || ''}
									label="Estado Civil"
									data={[
										{ value: 'single', text: 'Solteiro(a)' },
										{ value: 'married', text: 'Casado(a)' },
										{ value: 'divorced', text: 'Divorciado(a)' },
										{ value: 'widowed', text: 'Viúvo(a)' }
									]}
									defaultText="Selecione"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="text"
									id="educationDegree"
									name="educationDegree"
									value={formDate?.educationDegree || ''}
									label="Grau de Educação"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="tel"
									id="phone1"
									name="phone1"
									value={formDate?.phone1 || ''}
									label="Telefone 1"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="tel"
									id="phone2"
									name="phone2"
									value={formDate?.phone2 || ''}
									label="Telefone 2"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="email"
									id="email"
									name="email"
									value={formDate?.email || ''}
									label="Email"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div className="xl:col-span-4 lg:col-span-3 md:col-span-2">
								<TextArea
									id="residentialAddress"
									name="residentialAddress"
									value={formDate?.residentialAddress || ''}
									label="Endereço Residencial"
									rows={2}
									className="w-full"
									onChange={handleInputChange}
								></TextArea>
							</div>
							<div>
								<Select
									id="documentType"
									name="documentType"
									value={formDate?.documentType || ''}
									label="Tipo de Documento"
									data={[
										{ text: 'Bilhete de identidade' },
										{ text: 'Passaporte' },
										{ text: 'Cartão de residência' }
									]}
									defaultText="Selecione"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="text"
									id="documentNumber"
									name="documentNumber"
									value={formDate?.documentNumber || ''}
									label="Número do Documento"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="text"
									id="nif"
									name="nif"
									value={formDate?.nif || ''}
									label="NIF"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="number"
									id="dependents"
									name="dependents"
									value={formDate?.dependents || ''}
									label="Número de Dependentes"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="text"
									id="socialSecurity"
									name="socialSecurity"
									value={formDate?.socialSecurity || ''}
									label="Segurança Social"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="text"
									id="position"
									name="position"
									value={formDate?.position || ''}
									label="Cargo"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="text"
									id="baseSalary"
									name="baseSalary"
									value={formDate?.baseSalary || ''}
									label="Salário Base"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="date"
									id="contractEndDate"
									name="contractEndDate"
									value={
										(formDate?.contractEndDate &&
											DateUtils.getDate(formDate.contractEndDate)) ||
										''
									}
									label="Data de Fim de Contrato"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="text"
									id="workTime"
									name="workTime"
									value={formDate?.workTime || ''}
									label="Horário de Trabalho"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="text"
									id="iban"
									name="iban"
									value={formDate?.iban || ''}
									label="IBAN"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Input
									type="text"
									id="accountNumber"
									name="accountNumber"
									value={formDate?.accountNumber || ''}
									label="Número de conta bancária"
									className="w-full"
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<button
							type="submit"
							disabled={isLoading}
							className="flex items-center gap-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
						>
							Enviar {isLoading && <Spinner />}
						</button>
					</form>
				</div>
			</ModalBody>
		</Modal>
	)
}
