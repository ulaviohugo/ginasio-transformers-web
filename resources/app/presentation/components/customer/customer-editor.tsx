import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { CustomerModel } from '@/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	ImagePreview,
	Input,
	InputEmail,
	InputPhone,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	Select
} from '..'

import {
	DateUtils,
	FileUtils,
	LabelUtils,
	MunicipalityProps,
	ProvinceProps
} from '@/utils'
import { addCustomerStore, updateCustomerStore } from '@/presentation/redux'
import { AddCustomer, UpdateCustomer } from '@/domain/usecases'
import { useLocations } from '@/presentation/hooks'

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
	const { countries, provinces, municipalities } = useSelector(useLocations())

	const [provinceList, setProvinceList] = useState<ProvinceProps[]>([])
	const [municipalityList, setMunicipalityList] = useState<MunicipalityProps[]>([])

	const [formDate, setFormData] = useState<CustomerModel>(
		customer || ({} as CustomerModel)
	)
	const [isLoading, setIsLoading] = useState(false)
	const [photoPreview, setPhotoPreview] = useState('')

	useEffect(() => {
		if (customer) {
			setProvinceList(
				provinces.filter((province) => province.country_id == customer.country_id)
			)
			setMunicipalityList(
				municipalities.filter(
					(municipality) => municipality.province_id == customer.province_id
				)
			)
			if (customer?.photo) setPhotoPreview(customer.photo)
		}
	}, [])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: CustomerModel = { ...formDate, [name]: value }

		if (name == 'country_id') {
			data = { ...data, province_id: undefined, municipality_id: undefined }
			setProvinceList(
				provinces.filter((province) => province.country_id == Number(value))
			)
		}
		if (name == 'province_id') {
			data = { ...data, municipality_id: undefined }
			setMunicipalityList(
				municipalities.filter((municipality) => municipality.province_id == Number(value))
			)
		}
		if (name == 'photo') {
			// const file = (e.target as any)?.files[0]
			const file = await FileUtils.toBase64((e.target as any)?.files[0])
			data = { ...data, [name]: file }
			setPhotoPreview(file)
			// handleInputFile(file)
		}
		setFormData(data)
	}

	// const handleInputFile = (file: File) => {
	// 	if (file) {
	// 		const reader = new FileReader()

	// 		reader.onload = function (e) {
	// 			setPhotoPreview(String(e.target?.result))
	// 		}

	// 		reader.readAsDataURL(file)
	// 	}
	// }

	const clearInputFile = () => {
		setFormData((prev) => ({ ...prev, photo: '' }))
		setPhotoPreview('')
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
		<Modal show={show} onClose={onClose} size="lg">
			<ModalTitle>
				{customer?.id ? `Cliente - ${customer.name}` : 'Cadastrar cliente'}
			</ModalTitle>
			<ModalBody>
				<form onSubmit={handleSubmit}>
					<div className="flex gap-1">
						<div className="">
							<ImagePreview
								photoPreview={photoPreview}
								onInputFileChange={handleInputChange}
								clearInputFile={clearInputFile}
							/>
						</div>
						<div className="flex-1 flex flex-col gap-1">
							<div className="grid grid-cols-3 gap-1">
								<Input
									type="text"
									id="name"
									name="name"
									value={formDate?.name || ''}
									label={LabelUtils.translateField('name')}
									onChange={handleInputChange}
									autoFocus
								/>
								<Select
									id="gender"
									name="gender"
									value={formDate?.gender || ''}
									label={LabelUtils.translateField('gender')}
									data={[{ text: 'Masculino' }, { text: 'Feminino' }]}
									defaultText="Selecione"
									onChange={handleInputChange}
								/>
								<Input
									type="date"
									id="date_of_birth"
									name="date_of_birth"
									value={
										(formDate?.date_of_birth &&
											DateUtils.getDate(formDate?.date_of_birth)) ||
										''
									}
									label={LabelUtils.translateField('date_of_birth')}
									onChange={handleInputChange}
								/>
							</div>
							<div className="grid grid-cols-2 gap-1">
								<InputPhone
									id="phone"
									name="phone"
									value={formDate?.phone || ''}
									label={LabelUtils.translateField('phone')}
									onChange={handleInputChange}
								/>
								<InputEmail
									id="email"
									name="email"
									value={formDate?.email || ''}
									label={LabelUtils.translateField('email')}
									onChange={handleInputChange}
								/>
							</div>
							<div className="grid grid-cols-3 gap-1">
								<Select
									id="country_id"
									name="country_id"
									value={formDate?.country_id || ''}
									label={LabelUtils.translateField('country_id')}
									data={countries.map(({ name, id }) => ({
										text: name,
										value: id
									}))}
									defaultText="Selecione"
									onChange={handleInputChange}
								/>
								<Select
									id="province_id"
									name="province_id"
									value={formDate?.province_id || ''}
									label={LabelUtils.translateField('province_id')}
									data={provinceList.map(({ name, id }) => ({
										text: name,
										value: id
									}))}
									defaultText="Selecione"
									onChange={handleInputChange}
								/>
								<Select
									id="municipality_id"
									name="municipality_id"
									value={formDate?.municipality_id || ''}
									label={LabelUtils.translateField('municipality_id')}
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
									id="address"
									name="address"
									value={formDate?.address || ''}
									label={LabelUtils.translateField('address')}
									onChange={handleInputChange}
								/>
							</div>
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
