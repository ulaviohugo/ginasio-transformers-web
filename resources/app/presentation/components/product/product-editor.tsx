import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { ProductModel } from '@/domain/models'
import { AddProduct, UpdateProduct } from '@/domain/usecases'
import {
	ButtonCancel,
	ButtonSubmit,
	IconProduct,
	ImagePreview,
	Input,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	Select
} from '..'
import { LabelUtils } from '@/utils'
import { useCategories } from '@/presentation/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { makeRemoteLoadCategories } from '@/main/factories/usecases/remote'
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
	const [formDate, setFormData] = useState<ProductModel>(data || ({} as ProductModel))
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

		let data: ProductModel = { ...formDate, [name]: value }

		if (name == 'photo') {
			const file = (e.target as any)?.files[0]
			data = { ...formDate, [name]: file }
			// handleInputFile(file)
		}
		setFormData(data)
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)
		try {
			const httpResponse = (
				formDate.id
					? await updateProduct.update(formDate)
					: await addProduct.add(formDate)
			) as ProductModel

			if (formDate.id) {
				dispatch(updateProductStore(httpResponse))
			} else {
				dispatch(addProductStore(httpResponse))
			}
			toast.success(`Produto ${formDate.id ? 'actualizado' : 'cadastrado'} com sucesso`)
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
				<IconProduct /> {data?.id ? `Produto - ${data.name}` : 'Cadastrar produto'}
			</ModalTitle>
			<ModalBody>
				<form onSubmit={handleSubmit} className="flex flex-col gap-2">
					<div className="flex gap-2">
						<ImagePreview
							photoPreview={imagePreview}
							onInputFileChange={handleInputChange}
						/>
						<div className="flex flex-col gap-1">
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
								type="number"
								id="price"
								name="price"
								value={formDate?.price || ''}
								label={LabelUtils.translateField('price')}
								onChange={handleInputChange}
							/>
							<Select
								id="categoryId"
								name="categoryId"
								value={formDate?.categoryId || ''}
								label={LabelUtils.translateField('categoryId')}
								data={categories.map((category) => ({
									text: category.name,
									value: category.id
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
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
