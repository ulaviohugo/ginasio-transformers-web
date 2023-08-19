'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { Employee } from '@/app/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	IconClose,
	Input,
	InputEmail,
	InputIBAN,
	InputPhone,
	InputPrice,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	Select
} from '..'

import { DateUtils, LabelUtils, MunicipalityProps, ProvinceProps } from '@/app/utils'
import { addEmployeeStore, updateEmployeeStore } from '../../redux'
import { AddEmployee, UpdateEmployee } from '@/app/domain/usecases'
import { useLocations } from '../../hooks'

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
	const { countries, provinces, municipalities } = useLocations()

	const [provinceList, setProvinceList] = useState<ProvinceProps[]>([])
	const [municipalityList, setMunicipalityList] = useState<MunicipalityProps[]>([])

	const [formDate, setFormData] = useState<Employee>(employee || ({} as Employee))
	const [isLoading, setIsLoading] = useState(false)
	const [imagePreview, setImagePreview] = useState('')

	useEffect(() => {
		if (employee) {
			setProvinceList(
				provinces.filter((province) => province.countryId == employee.countryId)
			)
			setMunicipalityList(
				municipalities.filter(
					(municipality) => municipality.provinceId == employee.provinceId
				)
			)
		}
	}, [])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: Employee = { ...formDate, [name]: value }

		if (name == 'countryId') {
			data = { ...data, provinceId: undefined, municipalityId: undefined }
			setProvinceList(provinces.filter((province) => province.countryId == Number(value)))
		}
		if (name == 'provinceId') {
			data = { ...data, municipalityId: undefined }
			setMunicipalityList(
				municipalities.filter((municipality) => municipality.provinceId == Number(value))
			)
		}
		if (name == 'photo') {
			const file = (e.target as any)?.files[0]
			data = { ...data, [name]: file }
			handleInputFile(file)
		}
		if (name == 'phone1' && !value) {
			data = { ...data, phone2: '' }
		}
		setFormData(data)
	}

	const handleInputFile = (file: File) => {
		if (file) {
			const reader = new FileReader()

			reader.onload = function (e) {
				setImagePreview(String(e.target?.result))
			}

			reader.readAsDataURL(file)
		}
	}

	const clearInputFile = () => {
		setFormData((prev) => ({ ...prev, photo: '' }))
		setImagePreview('')
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
						<div className="flex flex-row xl:col-span-4 lg:col-span-3 md:col-span-2">
							<div className="flex">
								<div className="mr-auto">
									<Input
										type="file"
										id="photo"
										name="photo"
										// value={formDate?.photo || ''}
										label={'Imagem'}
										onChange={handleInputChange}
										accept="image/*"
									/>
								</div>
								{imagePreview && (
									<div className="relative border rounded-md p-3">
										<Image
											src={imagePreview}
											width={120}
											height={100}
											alt="Pre-visualização"
											className="object-cover aspect-square"
										/>
										<IconClose
											className="absolute top-1 right-1 bg-red-600 text-white rounded-full"
											onClick={clearInputFile}
										/>
									</div>
								)}
							</div>
						</div>
						<div className="md:col-span-2">
							<Input
								type="text"
								id="name"
								name="name"
								value={formDate?.name || ''}
								label={LabelUtils.translateField('name')}
								onChange={handleInputChange}
								autoFocus
							/>
						</div>
						<div>
							<Select
								id="gender"
								name="gender"
								value={formDate?.gender || ''}
								label={LabelUtils.translateField('gender')}
								data={[{ text: 'Masculino' }, { text: 'Feminino' }]}
								defaultText="Selecione"
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
								label={LabelUtils.translateField('dateOfBirth')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Select
								id="maritalStatus"
								name="maritalStatus"
								value={formDate?.maritalStatus || ''}
								label={LabelUtils.translateField('maritalStatus')}
								data={[
									{ text: 'Solteiro(a)' },
									{ text: 'Casado(a)' },
									{ text: 'Divorciado(a)' },
									{ text: 'Viúvo(a)' }
								]}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Select
								id="documentType"
								name="documentType"
								value={formDate?.documentType || ''}
								label={LabelUtils.translateField('documentType')}
								data={[
									{ text: 'Bilhete de identidade' },
									{ text: 'Passaporte' },
									{ text: 'Cartão de residência' }
								]}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								type="text"
								id="documentNumber"
								name="documentNumber"
								value={formDate?.documentNumber || ''}
								label={LabelUtils.translateField('documentNumber')}
								onChange={handleInputChange}
								disabled={!formDate?.documentType}
							/>
						</div>
						<div>
							<Input
								type="text"
								id="nif"
								name="nif"
								value={formDate?.nif || ''}
								label={LabelUtils.translateField('nif')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								type="text"
								id="socialSecurity"
								name="socialSecurity"
								value={formDate?.socialSecurity || ''}
								label={LabelUtils.translateField('socialSecurity')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								type="number"
								id="dependents"
								name="dependents"
								value={formDate?.dependents || ''}
								label={LabelUtils.translateField('dependents')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Select
								id="educationDegree"
								name="educationDegree"
								value={formDate?.educationDegree || ''}
								label={LabelUtils.translateField('educationDegree')}
								data={[
									{ text: 'Ensino primário' },
									{ text: 'Ensino secundário' },
									{ text: 'Ensino médio' },
									{ text: 'Ensino superior' }
								]}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<Divisor label="Contactos" />
						<div>
							<InputPhone
								id="phone1"
								name="phone1"
								value={formDate?.phone1 || ''}
								label={LabelUtils.translateField('phone1')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<InputPhone
								id="phone2"
								name="phone2"
								value={!formDate?.phone1 ? '' : formDate?.phone2 || ''}
								label={LabelUtils.translateField('phone2')}
								onChange={handleInputChange}
								disabled={!formDate?.phone1}
							/>
						</div>
						<div className="md:col-span-2">
							<InputEmail
								id="email"
								name="email"
								value={formDate?.email || ''}
								label={LabelUtils.translateField('email')}
								onChange={handleInputChange}
							/>
						</div>
						<Divisor />
						<div>
							<Select
								id="countryId"
								name="countryId"
								value={formDate?.countryId || ''}
								label={LabelUtils.translateField('countryId')}
								data={countries.map(({ name, id }) => ({
									text: name,
									value: id
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Select
								id="provinceId"
								name="provinceId"
								value={formDate?.provinceId || ''}
								label={LabelUtils.translateField('provinceId')}
								data={provinceList.map(({ name, id }) => ({
									text: name,
									value: id
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Select
								id="municipalityId"
								name="municipalityId"
								value={formDate?.municipalityId || ''}
								label={LabelUtils.translateField('municipalityId')}
								data={municipalityList.map(({ name, id }) => ({
									text: name,
									value: id
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								type="text"
								id="residentialAddress"
								name="residentialAddress"
								value={formDate?.residentialAddress || ''}
								label={LabelUtils.translateField('residentialAddress')}
								onChange={handleInputChange}
							/>
						</div>
						<Divisor label="Empresa" />
						<div>
							<Select
								id="position"
								name="position"
								value={formDate?.position || ''}
								label={LabelUtils.translateField('position')}
								data={[
									{ text: 'Assistente administrativo' },
									{ text: 'Costureiro' },
									{ text: 'Coordenador de operações' },
									{ text: 'Mestre de costura' }
								]}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<InputPrice
								id="baseSalary"
								name="baseSalary"
								value={formDate?.baseSalary || ''}
								label={LabelUtils.translateField('baseSalary')}
								onChange={handleInputChange}
								disabled={!formDate?.position}
								title={`Selecione o ${LabelUtils.translateField(
									'position'
								)} para habilitar este campo`}
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
								label={LabelUtils.translateField('hireDate')}
								onChange={handleInputChange}
								disabled={!formDate?.position}
								title={`Selecione o ${LabelUtils.translateField(
									'position'
								)} para habilitar este campo`}
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
								label={LabelUtils.translateField('contractEndDate')}
								onChange={handleInputChange}
								disabled={!formDate?.position}
								title={`Selecione o ${LabelUtils.translateField(
									'position'
								)} para habilitar este campo`}
							/>
						</div>
						<div>
							<Select
								id="bankName"
								name="bankName"
								value={formDate?.bankName || ''}
								label={LabelUtils.translateField('bankName')}
								data={[
									{ text: 'BAI' },
									{ text: 'BCI' },
									{ text: 'BIC' },
									{ text: 'BFA' },
									{ text: 'BNI' },
									{ text: 'BPC' },
									{ text: 'Millenium' },
									{ text: 'SOL' },
									{ text: 'Standard Bank' }
								]}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<InputIBAN
								id="iban"
								name="iban"
								value={formDate?.iban || ''}
								label={LabelUtils.translateField('iban')}
								onChange={handleInputChange}
								disabled={!formDate?.bankName}
							/>
						</div>
						<div>
							<Input
								type="text"
								id="accountNumber"
								name="accountNumber"
								value={formDate?.accountNumber || ''}
								label={LabelUtils.translateField('accountNumber')}
								onChange={handleInputChange}
								disabled={!formDate?.bankName}
							/>
						</div>
					</div>
					<ModalFooter>
						<ButtonSubmit type="submit" disabled={isLoading} isLoading={isLoading} />
						<ButtonCancel onClick={onClose} />
					</ModalFooter>
				</form>
			</ModalBody>
		</Modal>
	)
}

const Divisor = ({ label }: { label?: string }) => (
	<div className="xl:col-span-4 lg:col-span-3 md:col-span-2 uppercase">{label || ''}</div>
)
