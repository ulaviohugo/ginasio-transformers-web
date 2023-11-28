import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { CategoryModel, ProductModel, PurchaseModel } from '@/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	CategoryLabel,
	IconEdit,
	IconTrash,
	ImagePreview,
	Input,
	InputPrice,
	ProductLabel,
	Select,
	SupplierLabel
} from '..'

import {
	ColorUtils,
	DateUtils,
	FileUtils,
	LabelUtils,
	NumberUtils,
	PaymentUtils
} from '@/utils'
import {
	addPurchaseStore,
	loadCategoryStore,
	loadProductStore,
	loadSupplierStore,
	updatePurchaseStore
} from '@/presentation/redux'
import { AddPurchase, UpdatePurchase } from '@/domain/usecases'
import { useAuth, useCategories, useProducts, useSuppliers } from '@/presentation/hooks'
import {
	makeRemoteLoadCategories,
	makeRemoteLoadProduct,
	makeRemoteLoadSuppliers
} from '@/main/factories/usecases'

type PurchaseEditorProps = {
	data?: PurchaseModel
	onClose: () => void
	addPurchase: AddPurchase
	updatePurchase: UpdatePurchase
	onDelete: () => void
}

export function ProductionStockEditor({
	data,
	onClose,
	addPurchase,
	updatePurchase,
	onDelete
}: PurchaseEditorProps) {
	const dispatch = useDispatch()
	const categories = useSelector(useCategories())
	const products = useSelector(useProducts())
	const suppliers = useSelector(useSuppliers())
	const user = useSelector(useAuth())

	const [productList, setProductList] = useState<ProductModel[]>([])
	const [categoryList, setCategoryList] = useState<CategoryModel[]>(categories)

	const [formData, setFormData] = useState<PurchaseModel>(
		(data?.id && data) ||
			({
				paid: true,
				purchase_date: DateUtils.getDate(new Date()) as any
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
			.catch(() => {
				toast.error('Error ao consultar dados')
			})
	}

	const clearFields = () => {
		onClose()
		setFormData({
			paid: true,
			purchase_date: DateUtils.getDate(new Date()) as any
		} as PurchaseModel)
	}

	useEffect(() => {
		if (data?.id) {
			setCategoryList(
				/* categories.filter(
					(category) =>
						suppliers
							.find((sup) => sup.id == Number(data.supplier_id))
							?.supplier_products?.map((sup) => sup.category_id)
							.includes(category.id)
				) */
				categories
			)
			setProductList(
				/* products.filter(
					(product) =>
						product.category_id == Number(data.category_id) &&
						suppliers
							.find((sup) => sup.id == data.supplier_id)
							?.supplier_products?.map((sup) => sup.product_id)
							.includes(product.id)
				) */
				products.filter((product) => product.category_id == Number(data.category_id))
			)
			if (data?.photo) setPhotoPreview(data?.photo)
			setFormData(data)
		} else {
			setCategoryList(categories)
			setProductList(
				formData?.category_id
					? products.filter(
							(product) => product.category_id == Number(formData.category_id)
					  )
					: products
			)
		}
		setPhotoPreview(data?.photo || '')
	}, [categories, data, products, suppliers])

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

		// if (name == 'supplier_id') {
		// 	const supplierId = NumberUtils.convertToNumber(value)
		// 	data = { ...data, category_id: undefined as any, product_id: undefined as any }
		// 	setCategoryList(
		// 		supplierId > 0
		// 			? categories.filter(
		// 					(category) =>
		// 						suppliers
		// 							.find((sup) => sup.id == supplierId)
		// 							?.supplier_products?.map((sup) => sup.category_id)
		// 							.includes(category.id)
		// 			  )
		// 			: categories
		// 	)
		// }
		if (name == 'category_id') {
			const categoryId = NumberUtils.convertToNumber(value)
			data = { ...data, product_id: undefined as any }

			setProductList(
				categoryId
					? products.filter((product) => product.category_id == categoryId)
					: products
			)
		}
		if (name == 'photo') {
			const file = await FileUtils.toBase64((e.target as any)?.files[0])
			data = { ...data, [name]: file }
		}
		if (name == 'paid') {
			const checked = (e.target as any).checked
			data = { ...data, [name]: checked }
		}
		if (name == 'total_value') {
			const total_value = NumberUtils.convertToNumber(value)
			const quantity = NumberUtils.convertToNumber(formData.quantity)
			data = {
				...data,
				total_value,
				unit_price: quantity > 0 ? total_value / quantity : 0
			}
		}
		if (name == 'unit_price') {
			const unit_price = NumberUtils.convertToNumber(value)
			const quantity = NumberUtils.convertToNumber(formData.quantity)
			data = {
				...data,
				unit_price,
				total_value: quantity > 0 ? unit_price * quantity : unit_price
			}
		}
		if (name == 'quantity') {
			const quantity = Number(value)
			data = {
				...data,
				quantity,
				unit_price:
					quantity > 0 ? NumberUtils.convertToNumber(formData.total_value) / quantity : 0
			}
		}
		setFormData(data)
	}

	const handleSubmit = async (type: 'save' | 'update' = 'save') => {
		setIsLoading(true)
		try {
			const update = type == 'update'
			const httpResponse = (
				update ? await updatePurchase.update(formData) : await addPurchase.add(formData)
			) as PurchaseModel

			if (update) {
				dispatch(updatePurchaseStore(httpResponse))
			} else {
				dispatch(addPurchaseStore(httpResponse))
			}
			toast.success(`Compra ${update ? 'actualizada' : 'cadastrada'} com sucesso`)
			onClose()
			clearFields()
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleDelete = () => {
		if (!formData.id) return toast.error('Selecione um registo para excluir')
		onDelete()
	}

	return (
		<div className="">
			<div className="flex gap-1">
				<div className="flex-1 grid grid-cols-12 gap-4">
					<div className="col-span-3">
						<ImagePreview
							photoPreview={photoPreview}
							onInputFileChange={handleInputChange}
						/>
						<div className="flex flex-col gap-2">
							<InputPrice
								id="unit_price"
								name="unit_price"
								value={formData?.unit_price || ''}
								label={LabelUtils.translateField('unit_price')}
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
								id="total_value"
								name="total_value"
								value={formData?.total_value || ''}
								label={LabelUtils.translateField('total_value')}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="col-span-9 flex flex-col gap-4">
						<div className="grid grid-cols-4 gap-2">
							<Input
								id="lot"
								name="lot"
								value={formData?.id || ''}
								label={LabelUtils.translateField('lot')}
								onChange={handleInputChange}
								disabled
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
							<Select
								id="category_id"
								name="category_id"
								value={formData?.category_id || ''}
								label={<CategoryLabel />}
								data={categoryList.map(({ name, id }) => ({
									text: name,
									value: id
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
							<Select
								id="product_id"
								name="product_id"
								value={formData?.product_id || ''}
								label={<ProductLabel />}
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
								id="bar_code"
								name="bar_code"
								value={formData?.bar_code || ''}
								label={LabelUtils.translateField('bar_code')}
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
								id="payment_method"
								name="payment_method"
								value={formData?.payment_method || ''}
								label={LabelUtils.translateField('payment_method')}
								data={PaymentUtils.getMethods().map((paymentType) => ({
									text: paymentType
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
							<Input
								type="date"
								id="purchase_date"
								name="purchase_date"
								value={
									(formData?.purchase_date &&
										DateUtils.getDate(formData.purchase_date)) ||
									''
								}
								label={LabelUtils.translateField('purchase_date')}
								onChange={handleInputChange}
							/>
							<Input
								type="date"
								id="due_date"
								name="due_date"
								value={(formData?.due_date && DateUtils.getDate(formData.due_date)) || ''}
								label={LabelUtils.translateField('due_date')}
								onChange={handleInputChange}
							/>
							<Input label="Funcionário" value={user.name} disabled />
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
						disabled={isLoading}
						isLoading={isLoading}
						onClick={() => handleSubmit('update')}
					/>
					<ButtonCancel onClick={clearFields} text="Limpar" />
					<ButtonCancel onClick={handleDelete} text="Excluir" icon={IconTrash} />
				</div>
			</div>
		</div>
	)
}