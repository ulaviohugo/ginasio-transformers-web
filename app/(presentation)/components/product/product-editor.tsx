'use client'

import { Product } from '@/app/domain/models'
import { AddProduct, UpdateProduct } from '@/app/domain/usecases'
import { IconClose, Input, Modal, ModalBody, ModalTitle, Select } from '..'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { LabelUtils } from '@/app/utils'
import { useCategories } from '../../hooks'
import { useDispatch } from 'react-redux'
import { makeRemoteLoadCategories } from '@/app/main/factories/usecases/remote'
import { addProductStore, loadCategoryStore, updateProductStore } from '../../redux'
import { toast } from 'react-hot-toast'

type ProductEditorProps = {
	data?: Product
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
	const categories = useCategories()
	const [formDate, setFormData] = useState<Product>(data || ({} as Product))
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
	}, [])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: Product = { ...formDate, [name]: value }

		if (name == 'image') {
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
			) as Product

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
			<ModalTitle>{data?.id ? 'Editar' : 'Cadastrar'} produto</ModalTitle>
			<ModalBody>
				<form onSubmit={handleSubmit} className="flex flex-col gap-2">
					<div className="flex flex-row xl:col-span-4 lg:col-span-3 md:col-span-2">
						<div className="flex">
							<div className="mr-auto">
								<Input
									type="file"
									id="image"
									name="image"
									// value={formDate?.image || ''}
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
										// onClick={clearInputFile}
									/>
								</div>
							)}
						</div>
					</div>
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
						id="categoryId"
						name="categoryId"
						value={formDate.categoryId}
						label={LabelUtils.translateField('categoryId')}
						data={categories.map((category) => ({
							text: category.name,
							value: category.id
						}))}
						defaultText="Selecione"
						onChange={handleInputChange}
					/>
				</form>
			</ModalBody>
		</Modal>
	)
}
