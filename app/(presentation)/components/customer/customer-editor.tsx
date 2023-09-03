'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { CustomerModel } from '@/app/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	IconClose,
	Input,
	InputEmail,
	InputPhone,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	Select
} from '..'

import { DateUtils, LabelUtils, MunicipalityProps, ProvinceProps } from '@/app/utils'
import { addCustomerStore, updateCustomerStore } from '../../redux'
import { AddCustomer, UpdateCustomer } from '@/app/domain/usecases'
import { useLocations } from '../../hooks'

type CustomerEditorProps = {
	customer?: CustomerModel
	show: boolean
	onClose: () => void
	addCustomer: AddCustomer
	updateCustomer: UpdateCustomer
}

export function CustomerEditor({
	customer,
	show,
	onClose,
	addCustomer,
	updateCustomer
}: CustomerEditorProps) {
	const dispatch = useDispatch()
	const { countries, provinces, municipalities } = useLocations()

	const [provinceList, setProvinceList] = useState<ProvinceProps[]>([])
	const [municipalityList, setMunicipalityList] = useState<MunicipalityProps[]>([])

	const [formDate, setFormData] = useState<CustomerModel>(
		customer || ({} as CustomerModel)
	)
	const [isLoading, setIsLoading] = useState(false)
	const [imagePreview, setImagePreview] = useState('')

	useEffect(() => {
		if (customer) {
			setProvinceList(
				provinces.filter((province) => province.countryId == customer.countryId)
			)
			setMunicipalityList(
				municipalities.filter(
					(municipality) => municipality.provinceId == customer.provinceId
				)
			)
		}
	}, [])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: CustomerModel = { ...formDate, [name]: value }

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
					? await updateCustomer.update(formDate)
					: await addCustomer.add(formDate)
			) as CustomerModel

			if (formDate.id) {
				dispatch(updateCustomerStore(httpResponse))
			} else {
				dispatch(addCustomerStore(httpResponse))
			}
			toast.success(`Cliente ${formDate.id ? 'actualizado' : 'cadastrado'} com sucesso`)
			onClose()
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<Modal show={show} onClose={onClose}>
			<ModalTitle>{customer?.id ? 'Editar' : 'Cadastrar'} cliente</ModalTitle>
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
						<Divisor label="Contactos" />
						<div>
							<InputPhone
								id="phone"
								name="phone"
								value={formDate?.phone || ''}
								label={LabelUtils.translateField('phone')}
								onChange={handleInputChange}
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
