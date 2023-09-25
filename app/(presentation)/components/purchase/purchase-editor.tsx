'use client'

import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { CategoryModel, ProductModel, PurchaseModel } from '@/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	ImagePreview,
	Input,
	InputPrice,
	ModalFooter,
	Select,
	StokeList
} from '..'

import { ColorUtils, DateUtils, LabelUtils, NumberUtils, PaymentUtils } from '@/utils'
import {
	addPurchaseStore,
	loadCategoryStore,
	loadProductStore,
	loadSupplierStore,
	updatePurchaseStore
} from '@/(presentation)/redux'
import { AddPurchase, UpdatePurchase } from '@/domain/usecases'
import { useAuth, useCategories, useProducts, useSuppliers } from '@/(presentation)/hooks'
import {
	makeRemoteDeletePurchase,
	makeRemoteLoadCategories,
	makeRemoteLoadProduct,
	makeRemoteLoadPurchases,
	makeRemoteLoadSuppliers
} from '@/main/factories/usecases/remote'

type PurchaseEditorProps = {
	data?: PurchaseModel
	onClose: () => void
	addPurchase: AddPurchase
	updatePurchase: UpdatePurchase
	stockListComponent: ReactNode
}

export function PurchaseEditor({
	data,
	onClose,
	addPurchase,
	updatePurchase,
	stockListComponent
}: PurchaseEditorProps) {
	const dispatch = useDispatch()
	const categories = useCategories()
	const products = useProducts()
	const suppliers = useSuppliers()
	const user = useAuth()

	const [productList, setProductList] = useState<ProductModel[]>([])
	const [categoryList, setCategoryList] = useState<CategoryModel[]>([])

	const [formData, setFormData] = useState<PurchaseModel>(
		(data?.id && data) ||
			({
				paid: true,
				purchaseDate: DateUtils.getDate(new Date()) as any
			} as PurchaseModel)
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
			setCategoryList(
				categories.filter(
					(category) =>
						suppliers
							.find((sup) => sup.id == Number(data.supplierId))
							?.supplierProducts?.map((sup) => sup.categoryId)
							.includes(category.id)
				)
			)
			setProductList(
				products.filter(
					(product) =>
						product.categoryId == Number(data.categoryId) &&
						suppliers
							.find((sup) => sup.id == data.supplierId)
							?.supplierProducts?.map((sup) => sup.productId)
							.includes(product.id)
				)
			)
			if (data?.photo) setPhotoPreview(data?.photo)
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

		let data: PurchaseModel = { ...formData, [name]: value }

		if (name == 'supplierId') {
			data = { ...data, categoryId: undefined as any, productId: undefined as any }
			setCategoryList(
				categories.filter(
					(category) =>
						suppliers
							.find((sup) => sup.id == Number(value))
							?.supplierProducts?.map((sup) => sup.categoryId)
							.includes(category.id)
				)
			)
		}
		if (name == 'categoryId') {
			data = { ...data, productId: undefined as any }
			setProductList(
				products.filter(
					(product) =>
						product.categoryId == Number(value) &&
						suppliers
							.find((sup) => sup.id == formData.supplierId)
							?.supplierProducts?.map((sup) => sup.productId)
							.includes(product.id)
				)
			)
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
			const quantity = NumberUtils.convertToNumber(formData.quantity)
			data = {
				...data,
				totalValue,
				unitPrice: quantity > 0 ? totalValue / quantity : 0
			}
		}
		if (name == 'unitPrice') {
			const unitPrice = NumberUtils.convertToNumber(value)
			const quantity = NumberUtils.convertToNumber(formData.quantity)
			data = {
				...data,
				unitPrice,
				totalValue: quantity > 0 ? unitPrice * quantity : unitPrice
			}
		}
		if (name == 'quantity') {
			const quantity = Number(value)
			data = {
				...data,
				quantity,
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
			) as PurchaseModel

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
		<div className="">
			<form onSubmit={handleSubmit} className="">
				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-3">
						<ImagePreview
							photoPreview={photoPreview}
							onInputFileChange={handleInputChange}
						/>
						<div className="flex flex-col gap-2">
							<InputPrice
								id="unitPrice"
								name="unitPrice"
								value={formData?.unitPrice || ''}
								label={LabelUtils.translateField('unitPrice')}
								onChange={handleInputChange}
							/>
							<Input
								type="number"
								id="quantity"
								name="quantity"
								value={formData?.quantity || ''}
								label={LabelUtils.translateField('quantity')}
								onChange={handleInputChange}
							/>
							<InputPrice
								id="totalValue"
								name="totalValue"
								value={formData?.totalValue || ''}
								label={LabelUtils.translateField('totalValue')}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="col-span-9 flex flex-col gap-4">
						<div className="grid grid-cols-4 gap-2">
							<Input
								id="lot"
								name="lot"
								value={formData?.lot || ''}
								label={LabelUtils.translateField('lot')}
								onChange={handleInputChange}
							/>
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
						<div className="grid grid-cols-4 gap-2">
							<Input
								id="barCode"
								name="barCode"
								value={formData?.barCode || ''}
								label={LabelUtils.translateField('barCode')}
								onChange={handleInputChange}
							/>
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
							<div className="flex">
								<div>
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
						</div>
						<div className="grid grid-cols-4 gap-2">
							<Select
								id="paymentMethod"
								name="paymentMethod"
								value={formData?.paymentMethod || ''}
								label={LabelUtils.translateField('paymentMethod')}
								data={PaymentUtils.getMethods().map((paymentType) => ({
									text: paymentType
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
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
							<Input
								type="date"
								id="dueDate"
								name="dueDate"
								value={(formData?.dueDate && DateUtils.getDate(formData.dueDate)) || ''}
								label={LabelUtils.translateField('dueDate')}
								onChange={handleInputChange}
							/>
							<InputPrice
								id="sellingPriceUnit"
								name="sellingPriceUnit"
								value={formData?.sellingPriceUnit || ''}
								label={LabelUtils.translateField('sellingPriceUnit')}
								onChange={handleInputChange}
							/>
						</div>
						<div className="grid grid-cols-4 gap-2">
							<Input label="Funcionário" value={user.name} disabled />
						</div>
					</div>
				</div>
				<div className="flex gap-2 mt-2 pt-2 border-t">
					<ButtonSubmit type="submit" disabled={isLoading} isLoading={isLoading} />
					<ButtonCancel onClick={onClose} text="Limpar" />
				</div>
			</form>
			<div className="mt-2">{stockListComponent}</div>
		</div>
	)
}
