'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { Product, Purchase } from '@/app/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	IconClose,
	Input,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	Select
} from '..'

import { LabelUtils } from '@/app/utils'
import { addPurchaseStore, updatePurchaseStore } from '../../redux'
import { AddPurchase, UpdatePurchase } from '@/app/domain/usecases'
import { useCategories, useLocations, useProducts } from '../../hooks'

type PurchaseEditorProps = {
	data?: Purchase
	show: boolean
	onClose: () => void
	addPurchase: AddPurchase
	updatePurchase: UpdatePurchase
}

export function PurchaseEditor({
	data,
	show,
	onClose,
	addPurchase,
	updatePurchase
}: PurchaseEditorProps) {
	const dispatch = useDispatch()
	const { countries, municipalities } = useLocations()
	const categories = useCategories()
	const products = useProducts()

	const [productList, setProductList] = useState<Product[]>([])

	const [formDate, setFormData] = useState<Purchase>(data || ({} as Purchase))
	const [isLoading, setIsLoading] = useState(false)
	const [photoPreview, setPhotoPreview] = useState('')

	useEffect(() => {
		if (data) {
			setProductList(
				products.filter((category) => category.categoryId == data.categoryId)
			)
		}
	}, [])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: Purchase = { ...formDate, [name]: value }

		if (name == 'categoryId') {
			data = { ...data, productId: undefined as any }
			setProductList(products.filter((category) => category.categoryId == Number(value)))
		}
		if (name == 'photo') {
			const file = (e.target as any)?.files[0]
			data = { ...formDate, [name]: file }
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
					? await updatePurchase.update(formDate)
					: await addPurchase.add(formDate)
			) as Purchase

			if (formDate.id) {
				dispatch(updatePurchaseStore(httpResponse))
			} else {
				dispatch(addPurchaseStore(httpResponse))
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
			<ModalTitle>{data?.id ? 'Editar' : 'Cadastrar'} entrada</ModalTitle>
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
										accept="photo/*"
									/>
								</div>
								{photoPreview && (
									<div className="relative border rounded-md p-3">
										<Image
											src={photoPreview}
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
						<div>
							<Select
								id="categoryId"
								name="categoryId"
								value={formDate?.categoryId || ''}
								label={LabelUtils.translateField('categoryId')}
								data={categories.map(({ name, id }) => ({
									text: name,
									value: id
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Select
								id="productId"
								name="productId"
								value={formDate?.productId || ''}
								label={LabelUtils.translateField('productId')}
								data={productList.map(({ name, id }) => ({
									text: name,
									value: id
								}))}
								defaultText="Selecione"
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
