import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { ProductModel } from '@/domain/models'
import { AddProduct, UpdateProduct } from '@/domain/usecases'
import {
	ButtonCancel,
	ButtonSubmit,
	CategoryLabel,
	IconProduct,
	ImagePreview,
	Input,
	InputPrice,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	Select,
	SupplierLabel
} from '..'
import { ColorUtils, FileUtils, LabelUtils } from '@/utils'
import { useCategories, useSuppliers } from '@/presentation/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { makeRemoteLoadCategories } from '@/main/factories/usecases'
import {
	addProductStore,
	loadCategoryStore,
	updateProductStore
} from '@/presentation/redux'
import { toast } from 'react-hot-toast'

type ProductEditorProps = {
	data?: ProductModel
	show: boolean
	onClose: () => void
	addProduct: AddProduct
	updateProduct: UpdateProduct
}

export function ProductEditor({
	addProduct,
	onClose,
	show,
	updateProduct,
	data
}: ProductEditorProps) {
	const dispatch = useDispatch()
	const categories = useSelector(useCategories())
	const suppliers = useSelector(useSuppliers())
	const [formData, setFormData] = useState<ProductModel>(data || ({} as ProductModel))
	const [isLoading, setIsLoading] = useState(false)
	const [imagePreview, setImagePreview] = useState('')

	const fetchCategories = async () => {
		try {
			const httpResponse = await makeRemoteLoadCategories().load()
			dispatch(loadCategoryStore(httpResponse))
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	useEffect(() => {
		if (categories.length < 1) {
			fetchCategories()
		}
		if (data?.photo) setImagePreview(data.photo)
	}, [])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: ProductModel = { ...formData, [name]: value }

		if (name == 'photo') {
			const file = await FileUtils.toBase64((e.target as any)?.files[0])
			data = { ...formData, [name]: file }
		}
		setFormData(data)
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)
		try {
			const httpResponse = (
				formData.id
					? await updateProduct.update(formData)
					: await addProduct.add(formData)
			) as ProductModel

			if (formData.id) {
				dispatch(updateProductStore(httpResponse))
			} else {
				dispatch(addProductStore(httpResponse))
			}
			toast.success(`Produto ${formData.id ? 'actualizado' : 'cadastrado'} com sucesso`)
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
				<IconProduct /> {data?.id ? `Produto - ${data.name}` : 'Cadastrar produto'}
			</ModalTitle>
			<ModalBody>
				<form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
					<div className="flex gap-2">
						<ImagePreview
							photoPreview={imagePreview}
							onInputFileChange={handleInputChange}
						/>
						<div className="flex flex-col gap-1 w-full">
							<div className="flex gap-2">
								<Input
									type="number"
									id="bar_code"
									name="bar_code"
									value={formData?.bar_code || ''}
									label={LabelUtils.translateField('bar_code')}
									onChange={handleInputChange}
								/>
								<Select
									id="supplier_id"
									name="supplier_id"
									value={formData?.supplier_id || ''}
									label={<SupplierLabel />}
									data={suppliers.map(({ name, id }) => ({
										text: name,
										value: id
									}))}
									defaultText="Selecione"
									onChange={handleInputChange}
								/>
							</div>
							<div className="flex gap-2">
								<Select
									id="category_id"
									name="category_id"
									value={formData?.category_id || ''}
									label={<CategoryLabel />}
									data={categories.map((category) => ({
										text: category.name,
										value: category.id
									}))}
									defaultText="Selecione"
									onChange={handleInputChange}
								/>
								<Input
									type="text"
									id="name"
									name="name"
									value={formData?.name || ''}
									label={LabelUtils.translateField('name')}
									onChange={handleInputChange}
									autoFocus
								/>
							</div>
							<div className="flex gap-2">
								<Select
									id="color"
									name="color"
									value={formData?.color || ''}
									label={LabelUtils.translateField('color')}
									data={ColorUtils.colors.map((color) => ({
										text: color
									}))}
									defaultText="Selecione"
									onChange={handleInputChange}
								/>
								<Input
									id="size"
									name="size"
									value={formData?.size || ''}
									label={LabelUtils.translateField('size')}
									onChange={handleInputChange}
								/>
								<Input
									type="number"
									id="min_stock"
									name="min_stock"
									value={formData?.min_stock || ''}
									label={LabelUtils.translateField('min_stock')}
									onChange={handleInputChange}
								/>
								<Input
									type="number"
									id="max_stock"
									name="max_stock"
									value={formData?.max_stock || ''}
									label={LabelUtils.translateField('max_stock')}
									onChange={handleInputChange}
								/>
							</div>
							<div className="flex gap-2 ml-auto">
								<InputPrice
									id="purchase_price"
									name="purchase_price"
									value={formData?.purchase_price || ''}
									label={LabelUtils.translateField('purchase_price')}
									onChange={handleInputChange}
								/>
								<InputPrice
									id="selling_price"
									name="selling_price"
									value={formData?.selling_price || ''}
									label={LabelUtils.translateField('selling_price')}
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>
					<ModalFooter>
						<ButtonSubmit isLoading={isLoading} />
						<ButtonCancel onClick={onClose} />
					</ModalFooter>
				</form>
			</ModalBody>
		</Modal>
	)
}
