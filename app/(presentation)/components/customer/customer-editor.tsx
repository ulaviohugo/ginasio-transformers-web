'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

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

import { DateUtils, LabelUtils, MunicipalityProps, ProvinceProps } from '@/utils'
import { addCustomerStore, updateCustomerStore } from '../../redux'
import { AddCustomer, UpdateCustomer } from '@/domain/usecases'
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
	const [photoPreview, setPhotoPreview] = useState('')

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
			if (customer?.photo) setPhotoPreview(customer.photo)
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
				setPhotoPreview(String(e.target?.result))
			}

			reader.readAsDataURL(file)
		}
	}

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
		<Modal show={show} onClose={onClose}>
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
						<div className="flex flex-col gap-1">
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
	<div className="uppercase mt-2">{label || ''}</div>
)
