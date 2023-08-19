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

import { ColorUtils, DateUtils, LabelUtils } from '@/app/utils'
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

	const [formDate, setFormData] = useState<Purchase>(data || ({} as Purchase))
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
		if (data) {
			setProductList(
				products.filter((category) => category.categoryId == data.categoryId)
			)
		}
	}, [data, products])

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
		if (name == 'paid') {
			const checked = (e.target as any).checked
			data = { ...formDate, [name]: checked }
		}
		if (name == 'totalValue') {
			const totalValue = Number(value)
			data = {
				...formDate,
				[name]: totalValue,
				unitPrice: formDate.quantity > 0 ? totalValue / formDate.quantity : 0
			}
		}
		if (name == 'quantity') {
			const quantity = Number(value)
			data = {
				...formDate,
				[name]: quantity,
				unitPrice: quantity > 0 ? formDate.totalValue / quantity : 0
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
								id="supplierId"
								name="supplierId"
								value={formDate?.supplierId || ''}
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
						<div>
							<Select
								id="color"
								name="color"
								value={formDate?.color || ''}
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
								value={formDate?.size || ''}
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
									(formDate?.purchaseDate && DateUtils.getDate(formDate.purchaseDate)) ||
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
								value={(formDate?.dueDate && DateUtils.getDate(formDate.dueDate)) || ''}
								label={LabelUtils.translateField('dueDate')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								type="number"
								id="totalValue"
								name="totalValue"
								value={formDate?.totalValue || ''}
								label={LabelUtils.translateField('totalValue')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								type="number"
								id="quantity"
								name="quantity"
								value={formDate?.quantity || ''}
								label={LabelUtils.translateField('quantity')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								type="number"
								id="unitPrice"
								name="unitPrice"
								value={formDate?.unitPrice || ''}
								label={LabelUtils.translateField('unitPrice')}
								onChange={handleInputChange}
								disabled
							/>
						</div>
						<div>
							<Select
								id="paymentMethod"
								name="paymentMethod"
								value={formDate?.paymentMethod || ''}
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
									checked={formDate?.paid}
									label={LabelUtils.translateField('paid')}
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
	<div className="xl:col-span-4 lg:col-span-3 md:col-span-2 uppercase">{label || ''}</div>
)
