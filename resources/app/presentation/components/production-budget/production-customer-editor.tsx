import React, { ChangeEvent, useEffect, useState } from 'react'
import { ImagePreview } from '../image-preview'
import { Input, Select } from '../form-controls'
import { useSelector } from 'react-redux'
import { useCustomers } from '@/presentation/hooks'
import { DateUtils, ProductionBudgetUtils } from '@/utils'
import { ProductionBudgetModel } from '@/domain/models'

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
	const customers = useSelector(useCustomers())

	useEffect(() => {
		setPhotoPreview(formData.photo)
	}, [formData.photo])

	return (
		<fieldset>
			<legend>Cliente</legend>
			<div className="flex gap-1 items-start">
				<ImagePreview
					photoPreview={photoPreview}
					onInputFileChange={handleInputChange}
					clearInputFile={() => setFormData({ ...formData, photo: undefined as any })}
				/>
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
		</fieldset>
	)
}
