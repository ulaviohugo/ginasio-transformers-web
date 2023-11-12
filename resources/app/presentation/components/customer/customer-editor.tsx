import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { CustomerModel } from '@/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	IconEdit,
	IconTrash,
	ImagePreview,
	Input,
	InputEmail,
	InputPhone,
	Select
} from '..'

import { DateUtils, FileUtils, LabelUtils, MunicipalityProps } from '@/utils'
import { addCustomerStore, updateCustomerStore } from '@/presentation/redux'
import { AddCustomer, UpdateCustomer } from '@/domain/usecases'
import { useLocations } from '@/presentation/hooks'

type CustomerEditorProps = {
	customer?: CustomerModel
	addCustomer: AddCustomer
	updateCustomer: UpdateCustomer
	onDelete: () => void
}

export function CustomerEditor({
	customer,
	addCustomer,
	updateCustomer,
	onDelete
}: CustomerEditorProps) {
	const dispatch = useDispatch()
	const { provinces, municipalities } = useSelector(useLocations())

	const [municipalityList, setMunicipalityList] = useState<MunicipalityProps[]>([])

	const [formDate, setFormData] = useState<CustomerModel>(
		customer || ({} as CustomerModel)
	)
	const [isLoading, setIsLoading] = useState(false)
	const [photoPreview, setPhotoPreview] = useState('')

	useEffect(() => {
		if (customer) {
			setMunicipalityList(
				municipalities.filter(
					(municipality) => municipality.province_id == customer.province_id
				)
			)
			setFormData(customer)
		}
		setPhotoPreview(customer?.photo || '')
	}, [customer, municipalities, provinces])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: CustomerModel = { ...formDate, [name]: value }

		if (name == 'province_id') {
			data = { ...data, municipality_id: undefined }
			setMunicipalityList(
				municipalities.filter((municipality) => municipality.province_id == Number(value))
			)
		}
		if (name == 'photo') {
			const file = await FileUtils.toBase64((e.target as any)?.files[0])
			data = { ...data, [name]: file }
			setPhotoPreview(file)
		}
		setFormData(data)
	}

	const clearInputFile = () => {
		setFormData((prev) => ({ ...prev, photo: '' }))
		setPhotoPreview('')
	}

	const handleSubmit = async (type: 'save' | 'update' = 'save') => {
		const update = type == 'update'

		if (update && !formDate.id) {
			setIsLoading(false)
			return toast.error('Selecione um registo para editar')
		}
		setIsLoading(true)
		try {
			const httpResponse = (
				update
					? await updateCustomer.update(formDate)
					: await addCustomer.add({ ...formDate, id: undefined as any })
			) as CustomerModel

			if (update) {
				dispatch(updateCustomerStore(httpResponse))
			} else {
				dispatch(addCustomerStore(httpResponse))
			}
			toast.success(`Cliente ${update ? 'actualizado' : 'cadastrado'} com sucesso`)
			handleClear()
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleClear = () => {
		setFormData({} as any)
		clearInputFile()
	}

	const handleOpenDelete = () => {
		if (!formDate.id) return toast.error('Selecione um registo para excluir')
		onDelete()
	}

	return (
		<fieldset>
			<legend>Cadastro de clientes</legend>
			<div className="flex gap-2">
				<div className="flex-1 flex gap-1">
					<div className="">
						<ImagePreview
							photoPreview={photoPreview}
							onInputFileChange={handleInputChange}
							clearInputFile={clearInputFile}
						/>
					</div>
					<div className="flex-1 flex flex-col gap-1">
						<div className="grid grid-cols-4 gap-1">
							<Input
								type="text"
								id="name"
								name="name"
								value={formDate?.name || ''}
								label={LabelUtils.translateField('name')}
								onChange={handleInputChange}
								autoFocus
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
							<Input
								value={
									formDate?.date_of_birth
										? DateUtils.getMonthExt(formDate?.date_of_birth)
										: ''
								}
								label={'Mês aniversário'}
								onChange={handleInputChange}
							/>
							<InputPhone
								id="phone"
								name="phone"
								value={formDate?.phone || ''}
								label={LabelUtils.translateField('phone')}
								onChange={handleInputChange}
							/>
						</div>
						<div className="grid grid-cols-3 gap-1">
							<Select
								id="province_id"
								name="province_id"
								value={formDate?.province_id || ''}
								label={LabelUtils.translateField('province_id')}
								data={provinces.map(({ name, id }) => ({
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
							<Input
								type="text"
								id="address"
								name="address"
								value={formDate?.address || ''}
								label={'Endereço residencial'}
								onChange={handleInputChange}
							/>
						</div>
						<div className="grid grid-cols-2 gap-1">
							<InputEmail
								id="email"
								name="email"
								value={formDate?.email || ''}
								label={'Correio eletrónico'}
								onChange={handleInputChange}
							/>
							<Select
								id="customer_type"
								name="customer_type"
								value={formDate?.customer_type || ''}
								label={LabelUtils.translateField('customer_type')}
								data={[{ text: 'Padrão' }, { text: 'VIP' }]}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<ButtonSubmit
						disabled={isLoading}
						isLoading={isLoading}
						onClick={() => handleSubmit('save')}
					/>
					<ButtonSubmit
						text="Editar"
						icon={IconEdit}
						onClick={() => handleSubmit('update')}
						disabled={isLoading}
						isLoading={isLoading}
					/>
					<ButtonCancel onClick={handleClear} text="Limpar" />
					<ButtonCancel onClick={handleOpenDelete} text="Excluir" icon={IconTrash} />
				</div>
			</div>
		</fieldset>
	)
}
