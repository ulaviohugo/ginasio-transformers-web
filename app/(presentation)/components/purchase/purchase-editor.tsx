'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { Category, Product, Purchase } from '@/app/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	IconClose,
	Input,
	InputPrice,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	Select
} from '..'

import { ColorUtils, DateUtils, LabelUtils, NumberUtils } from '@/app/utils'
import {
	addPurchaseStore,
	loadCategoryStore,
	loadProductStore,
	loadSupplierStore,
	updatePurchaseStore
} from '../../redux'
import { AddPurchase, UpdatePurchase } from '@/app/domain/usecases'
import { useCategories, useProducts, useSuppliers } from '../../hooks'
import {
	makeRemoteLoadCategories,
	makeRemoteLoadProduct,
	makeRemoteLoadSuppliers
} from '@/app/main/factories/usecases/remote'

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
	const categories = useCategories()
	const products = useProducts()
	const suppliers = useSuppliers()

	const [productList, setProductList] = useState<Product[]>([])
	const [categoryList, setCategoryList] = useState<Category[]>([])

	const [formData, setFormData] = useState<Purchase>(
		(data?.id && data) ||
			({ paid: true, purchaseDate: DateUtils.getDate(new Date()) as any } as Purchase)
	)
	const [isLoading, setIsLoading] = useState(false)
	const [photoPreview, setPhotoPreview] = useState('')

	const fetchData = (
		remoteResource: { load: () => Promise<any> },
		callback: (response: any) => void
	) => {
		remoteResource
			.load()
			.then((response) => {
				callback(response)
			})
			.catch((_error) => {
				toast.error('Error ao consultar dados')
			})
	}

	useEffect(() => {
		if (data?.id) {
			setCategoryList(categories.filter((category) => category.id == data.supplierId))
			setProductList(products.filter((product) => product.categoryId == data.categoryId))
		}
	}, [categories, data, products])

	useEffect(() => {
		if (categories.length < 1) {
			fetchData(makeRemoteLoadCategories(), (response) => {
				dispatch(loadCategoryStore(response))
			})
		}
		if (products.length < 1) {
			fetchData(makeRemoteLoadProduct(), (response) => {
				dispatch(loadProductStore(response))
			})
		}
		if (suppliers.length < 1) {
			fetchData(makeRemoteLoadSuppliers(), (response) => {
				dispatch(loadSupplierStore(response))
			})
		}
	}, [])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: Purchase = { ...formData, [name]: value }

		if (name == 'supplierId') {
			data = { ...data, categoryId: undefined as any, productId: undefined as any }
			setCategoryList(categories.filter((category) => category.id == Number(value)))
		}
		if (name == 'categoryId') {
			data = { ...data, productId: undefined as any }
			setProductList(products.filter((product) => product.categoryId == Number(value)))
		}
		if (name == 'photo') {
			const file = (e.target as any)?.files[0]
			data = { ...data, [name]: file }
			handleInputFile(file)
		}
		if (name == 'paid') {
			const checked = (e.target as any).checked
			data = { ...data, [name]: checked }
		}
		if (name == 'totalValue') {
			const totalValue = NumberUtils.convertToNumber(value)
			data = {
				...data,
				unitPrice: formData.quantity > 0 ? totalValue / formData.quantity : 0
			}
		}
		if (name == 'quantity') {
			const quantity = Number(value)
			data = {
				...data,
				unitPrice:
					quantity > 0 ? NumberUtils.convertToNumber(formData.totalValue) / quantity : 0
			}
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
				formData.id
					? await updatePurchase.update(formData)
					: await addPurchase.add(formData)
			) as Purchase

			if (formData.id) {
				dispatch(updatePurchaseStore(httpResponse))
			} else {
				dispatch(addPurchaseStore(httpResponse))
			}
			toast.success(
				`Funcionário ${formData.id ? 'actualizado' : 'cadastrado'} com sucesso`
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
								id="supplierId"
								name="supplierId"
								value={formData?.supplierId || ''}
								label={LabelUtils.translateField('supplierId')}
								data={suppliers.map(({ name, id }) => ({
									text: name,
									value: id
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Select
								id="categoryId"
								name="categoryId"
								value={formData?.categoryId || ''}
								label={LabelUtils.translateField('categoryId')}
								data={categoryList.map(({ name, id }) => ({
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
								value={formData?.productId || ''}
								label={LabelUtils.translateField('productId')}
								data={productList.map(({ name, id }) => ({
									text: name,
									value: id
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<div>
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
						</div>
						<div>
							<Input
								id="size"
								name="size"
								value={formData?.size || ''}
								label={LabelUtils.translateField('size')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								type="date"
								id="purchaseDate"
								name="purchaseDate"
								value={
									(formData?.purchaseDate && DateUtils.getDate(formData.purchaseDate)) ||
									''
								}
								label={LabelUtils.translateField('purchaseDate')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								type="date"
								id="dueDate"
								name="dueDate"
								value={(formData?.dueDate && DateUtils.getDate(formData.dueDate)) || ''}
								label={LabelUtils.translateField('dueDate')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<InputPrice
								id="totalValue"
								name="totalValue"
								value={formData?.totalValue || ''}
								label={LabelUtils.translateField('totalValue')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								type="number"
								id="quantity"
								name="quantity"
								value={formData?.quantity || ''}
								label={LabelUtils.translateField('quantity')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<InputPrice
								id="unitPrice"
								name="unitPrice"
								value={formData?.unitPrice || ''}
								label={LabelUtils.translateField('unitPrice')}
								onChange={handleInputChange}
								disabled
							/>
						</div>
						<div>
							<Select
								id="paymentMethod"
								name="paymentMethod"
								value={formData?.paymentMethod || ''}
								label={LabelUtils.translateField('paymentMethod')}
								data={['Dinheiro', 'TPA', 'Transferência'].map((paymentType) => ({
									text: paymentType
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<div className="inline-flex">
								<Input
									type="checkbox"
									id="paid"
									name="paid"
									checked={formData?.paid}
									label={LabelUtils.translateField('paid')}
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<div>
							<InputPrice
								id="sellingPriceUnit"
								name="sellingPriceUnit"
								value={formData?.sellingPriceUnit || ''}
								label={LabelUtils.translateField('sellingPriceUnit')}
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
