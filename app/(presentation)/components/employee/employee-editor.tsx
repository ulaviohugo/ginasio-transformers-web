'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { Employee } from '@/app/domain/models'
import {
	Input,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	Select,
	Spinner,
	TextArea
} from '..'

import { DateUtils, LabelUtils } from '@/app/utils'
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
			<ModalTitle>{employee?.id ? 'Editar' : 'Cadastrar'} funcionário</ModalTitle>
			<ModalBody>
				<form onSubmit={handleSubmit}>
					<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
						<div className="md:col-span-2">
							<Input
								type="text"
								id="name"
								name="name"
								value={formDate?.name || ''}
								label={LabelUtils.translateField<Employee>('name')}
								className="w-full"
								onChange={handleInputChange}
								autoFocus
							/>
						</div>
						<div>
							<Select
								id="gender"
								name="gender"
								value={formDate?.gender || ''}
								label={LabelUtils.translateField<Employee>('gender')}
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
								label={LabelUtils.translateField<Employee>('dateOfBirth')}
								className="w-full"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Select
								id="maritalStatus"
								name="maritalStatus"
								value={formDate?.maritalStatus || ''}
								label={LabelUtils.translateField<Employee>('maritalStatus')}
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
								label={LabelUtils.translateField<Employee>('educationDegree')}
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
								label={LabelUtils.translateField<Employee>('phone1')}
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
								label={LabelUtils.translateField<Employee>('phone2')}
								className="w-full"
								onChange={handleInputChange}
							/>
						</div>
						<div className="md:col-span-2">
							<Input
								type="email"
								id="email"
								name="email"
								value={formDate?.email || ''}
								label={LabelUtils.translateField<Employee>('email')}
								className="w-full"
								onChange={handleInputChange}
							/>
						</div>
						<div className="xl:col-span-4 lg:col-span-3 md:col-span-2">
							<TextArea
								id="residentialAddress"
								name="residentialAddress"
								value={formDate?.residentialAddress || ''}
								label={LabelUtils.translateField<Employee>('residentialAddress')}
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
								label={LabelUtils.translateField<Employee>('documentType')}
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
								label={LabelUtils.translateField<Employee>('documentNumber')}
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
								label={LabelUtils.translateField<Employee>('nif')}
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
								label={LabelUtils.translateField<Employee>('dependents')}
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
								label={LabelUtils.translateField<Employee>('socialSecurity')}
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
								label={LabelUtils.translateField<Employee>('position')}
								className="w-full"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								type="number"
								id="baseSalary"
								name="baseSalary"
								value={formDate?.baseSalary || ''}
								label={LabelUtils.translateField<Employee>('baseSalary')}
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
								label={LabelUtils.translateField<Employee>('hireDate')}
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
								label={LabelUtils.translateField<Employee>('contractEndDate')}
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
								label={LabelUtils.translateField<Employee>('workTime')}
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
								label={LabelUtils.translateField<Employee>('iban')}
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
								label={LabelUtils.translateField<Employee>('accountNumber')}
								className="w-full"
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<ModalFooter>
						<button type="submit" disabled={isLoading} className="btn-primary">
							Salvar {isLoading && <Spinner />}
						</button>
					</ModalFooter>
				</form>
			</ModalBody>
		</Modal>
	)
}
