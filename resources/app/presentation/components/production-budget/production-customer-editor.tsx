import React, { ChangeEvent, useEffect, useState } from 'react'
import { ImagePreview } from '../image-preview'
import { Button, Input, Select } from '../form-controls'
import { useSelector } from 'react-redux'
import { useCustomers } from '@/presentation/hooks'
import { DateUtils, ProductionBudgetUtils } from '@/utils'
import {
	CustomerMeasurementProps,
	CustomerModel,
	ProductionBudgetModel
} from '@/domain/models'
import { Modal, ModalBody, ModalTitle } from '../modal'
import { CustomerMeasurements } from '../customer'
import toast from 'react-hot-toast'

type ProductionCustomerEditorProps = {
	formData: ProductionBudgetModel
	setFormData: (formData: ProductionBudgetModel) => void
	handleInputChange: (e: ChangeEvent) => void
}

export function ProductionCustomerEditor({
	formData,
	setFormData,
	handleInputChange
}: ProductionCustomerEditorProps) {
	const [photoPreview, setPhotoPreview] = useState(formData.photo)
	const [selectedCustomer, setSelectedCustomer] = useState<CustomerModel>(
		{} as CustomerModel
	)
	const customers = useSelector(useCustomers())

	const [showCustomerMeasurement, setShowCustomerMeasurement] = useState(false)

	useEffect(() => {
		setPhotoPreview(formData.photo)
	}, [formData.photo])

	const handleOpenCustomerMeasurement = () => {
		if (!formData.customer_id) return toast.error('Selecione um cliente')
		if (!formData.end_product) return toast.error('Selecione o produto final')

		setSelectedCustomer(customers.find(({ id }) => id == formData.customer_id) as any)
		setShowCustomerMeasurement(true)
	}

	const handleGetMeasurements = (measurement: CustomerMeasurementProps) => {
		setFormData({ ...formData, measurement })
	}

	return (
		<fieldset>
			<legend>Cliente</legend>
			{showCustomerMeasurement && (
				<Modal onClose={() => setShowCustomerMeasurement(false)} show size="lg">
					<ModalTitle>Medidas do cliente</ModalTitle>
					<ModalBody>
						<CustomerMeasurements
							customer={selectedCustomer}
							endProduct={formData.end_product}
							onSave={handleGetMeasurements}
							onClose={() => setShowCustomerMeasurement(false)}
						/>
					</ModalBody>
				</Modal>
			)}

			<div className="flex gap-2 items-start">
				<ImagePreview
					photoPreview={photoPreview}
					onInputFileChange={handleInputChange}
					clearInputFile={() => setFormData({ ...formData, photo: undefined as any })}
				/>
				<div className="flex-1 flex flex-col gap-2">
					<div className="flex">
						<Select
							name="customer_id"
							label="Nome do cliente"
							value={formData.customer_id || ''}
							defaultText="Selecione"
							data={customers.map(({ id: value, name: text }) => ({
								text,
								value
							}))}
							onChange={handleInputChange}
						/>
						<Select
							name="end_product"
							label="Produto final"
							value={formData.end_product || ''}
							defaultText="Selecione"
							data={ProductionBudgetUtils.endProducts.map((endProduct) => ({
								text: endProduct
							}))}
							onChange={handleInputChange}
						/>
						<Input
							type="date"
							name="date"
							label="Data"
							value={formData.date ? DateUtils.getDate(formData.date) : ''}
							onChange={handleInputChange}
						/>
						<Select
							name="customer_rating"
							label="Avaliação"
							value={formData.customer_rating || ''}
							defaultText="Selecione"
							data={[
								{ text: 'Insatisfeito' },
								{ text: 'Melhor' },
								{ text: 'Satisfeito' },
								{ text: 'Muito Satisfeito' }
							]}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<Button
							variant="gray-light"
							text="Adicionar medida do cliente"
							onClick={handleOpenCustomerMeasurement}
						/>
					</div>
				</div>
			</div>
		</fieldset>
	)
}
