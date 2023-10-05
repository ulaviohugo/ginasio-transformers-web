'use client'

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import {
	CategoryModel,
	ProductModel,
	ProductSaleModel,
	PurchaseModel,
	SaleModel
} from '@/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	IconMinus,
	IconPlus,
	IconProduct,
	IconSearch,
	IconStock,
	ImagePreview,
	Input,
	InputPrice,
	ModalFooter,
	Select
} from '..'

import {
	ArrayUtils,
	ColorUtils,
	LabelUtils,
	NumberUtils,
	PaymentUtils,
	StringUtils
} from '@/utils'
import {
	addSaleStore,
	loadCustomerStore,
	loadPurchaseStore,
	updateSaleStore
} from '@/(presentation)/redux'
import { AddSale, UpdateSale } from '@/domain/usecases'
import {
	useAuth,
	useCategories,
	useCustomers,
	useProducts,
	usePurchases
} from '@/(presentation)/hooks'
import {
	makeRemoteLoadCustomers,
	makeRemoteLoadPurchases
} from '@/main/factories/usecases/remote'

type ProductSaleProps = {
	categoryId: number
	productId: number
	barCode?: string
	color: string
	size: string
	lot?: string
	unitPrice: number
	quantity: number
	totalValue: number
	amountPaid: number
	discount: number
	paymentMethod: string

	product?: ProductModel
}

type SaleEditorProps = {
	data?: ProductSaleModel
	show: boolean
	onClose: () => void
	addSale: AddSale
	updateSale: UpdateSale
}

export function SaleEditor({
	data,
	show,
	onClose,
	addSale,
	updateSale
}: SaleEditorProps) {
	const dispatch = useDispatch()
	const stocks = useSelector(usePurchases())
	const customers = useSelector(useCustomers())
	const products = useSelector(useProducts())
	const user = useSelector(useAuth())

	const [formData, setFormData] = useState<ProductSaleModel>(
		data || ({} as ProductSaleModel)
	)

	const [cart, setCart] = useState<ProductSaleProps[]>([])

	const totalValue = useMemo(() => {
		return cart.reduce(
			(prev, current) =>
				prev +
				NumberUtils.convertToNumber(current.unitPrice) *
					NumberUtils.convertToNumber(current.quantity),
			0
		)
	}, [cart])

	const totalDiscount = useMemo(() => {
		return cart.reduce(
			(prev, current) => prev + NumberUtils.convertToNumber(current.discount),
			0
		)
	}, [cart])

	const qttCart = useMemo(() => {
		return cart.reduce(
			(prev, current) => prev + NumberUtils.convertToNumber(current.quantity),
			0
		)
	}, [cart])

	const [formProduct, setFormProduct] = useState<ProductSaleProps>(data || ({} as any))

	const categories: CategoryModel[] = useMemo(() => {
		const dataStocks = stocks.map((stock) => ({
			...stock.category,
			id: stock.categoryId
		})) as any

		const data = ArrayUtils.removeDuplicated<CategoryModel>(dataStocks, 'id')
		return data
	}, [stocks])

	const productList = useMemo(() => {
		if (!formProduct?.categoryId) return []

		const dataStocks = stocks
			.filter((stock) => stock.categoryId == formProduct.categoryId)
			.map((stock) => ({
				...stock.product,
				id: stock.productId
			})) as any

		const data = ArrayUtils.removeDuplicated<CategoryModel>(dataStocks, 'id')
		return data
	}, [formProduct?.categoryId])

	const [customerId, setCustomerId] = useState<number>()
	const [paymentMethod, setPaymentMethod] = useState('')

	const [isLoading, setIsLoading] = useState(false)
	const [photPreview, setPhotPreview] = useState('')
	const [selectedItem, setSelectedItem] = useState<PurchaseModel>({} as any)

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
		fetchData(makeRemoteLoadCustomers(), (response) => {
			dispatch(loadCustomerStore(response))
		})
		fetchData(makeRemoteLoadPurchases(), (response) => {
			dispatch(loadPurchaseStore(response))
		})
		// if (data?.purchase) {
		// 	setSelectedItem(data.purchase)
		// }
		// if (data?.purchase?.photo) {
		// 	setPhotPreview(data.purchase.photo)
		// }
	}, [])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: ProductSaleProps = { ...formProduct, [name]: value }

		if (name == 'totalValue') {
			const totalValue = NumberUtils.convertToNumber(value)
			data = {
				...data,
				unitPrice: formProduct.quantity > 0 ? totalValue / formProduct.quantity : 0
			}
		}
		if (name == 'quantity') {
			const quantity = NumberUtils.convertToNumber(value)
			const discount = NumberUtils.convertToNumber(formProduct.discount)
			const totalValue =
				quantity > 0
					? NumberUtils.convertToNumber(formProduct.unitPrice) * quantity - discount
					: 0
			data = {
				...data,
				totalValue,
				amountPaid: totalValue
			}
		}
		if (name == 'discount') {
			const discount = NumberUtils.convertToNumber(value)
			const quantity = NumberUtils.convertToNumber(formProduct.quantity)
			const unitPrice = NumberUtils.convertToNumber(formProduct.unitPrice)
			const totalValue = quantity > 0 ? quantity * unitPrice : 0

			data = {
				...data,
				amountPaid: discount > 0 ? totalValue - discount : totalValue
			}
		}

		if (name == 'categoryId') {
			data = { ...data, productId: undefined as any }
		}

		if (name == 'productId') {
			const stock: PurchaseModel = stocks.find(
				(stock) =>
					stock.categoryId == formProduct.categoryId && stock.productId == Number(value)
			) as any

			data = {
				...data,
				barCode: stock?.barCode,
				lot: stock?.lot,
				size: stock?.size,
				color: stock?.color,
				unitPrice: stock?.unitPrice
			}
		}
		setFormProduct(data)
	}

	const handleAddToCart = () => {
		const { amountPaid, categoryId, color, productId, quantity, size, unitPrice } =
			formProduct
		if (!categoryId) return toast.error('Selecione a categoria')
		if (!productId) return toast.error('Selecione o produto')
		if (!color) return toast.error('Selecione a cor')
		if (!size) return toast.error('Informe o tamanho')
		if (!unitPrice) return toast.error('Informe o preço unitário')
		if (!quantity) return toast.error('Informe a quantidade')
		if (!amountPaid) return toast.error('Informe o valor total a pagar')

		const stock: PurchaseModel = stocks.find(
			(stock) => stock.categoryId == categoryId && stock.productId == productId
		) as any

		setCart([...cart, { ...formProduct, product: { name: stock.product?.name } as any }])
		setFormProduct({} as any)
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (!paymentMethod) return toast.error('Selecione o método de pagamento')
		setIsLoading(true)
		try {
			const data = {
				productSales: cart,
				customerId,
				paymentMethod,
				totalValue,
				discount: totalDiscount,
				amountPaid: totalValue - totalDiscount
			} as any
			console.log({ data })

			const httpResponse = await addSale.add(data)

			if (formData.id) {
				dispatch(updateSaleStore(httpResponse))
			} else {
				dispatch(addSaleStore(httpResponse))
			}
			toast.success(`Venda ${formData.id ? 'actualizada' : 'cadastrada'} com sucesso`)
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div>
			<div className="flex gap-2">
				<div className="flex flex-col gap-2">
					<ImagePreview photoPreview={photPreview} disabled />
					<div className="bg-green-50 border border-green-200 p-2">
						<div>
							<InputPrice
								id="unitPrice"
								name="unitPrice"
								value={formProduct?.unitPrice || ''}
								label={LabelUtils.translateField('unitPrice')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								type="number"
								id="quantity"
								name="quantity"
								value={formProduct?.quantity || ''}
								label={LabelUtils.translateField('quantity')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<InputPrice
								id="discount"
								name="discount"
								value={formProduct?.discount || ''}
								label={'Desconto'}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<InputPrice
								id="amountPaid"
								name="amountPaid"
								value={formProduct?.amountPaid || ''}
								label={'Total a pagar'}
								onChange={handleInputChange}
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="flex-1">
					<div className=" grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
						<div>
							<Select
								id="categoryId"
								name="categoryId"
								value={formProduct.categoryId || ''}
								label={LabelUtils.translateField('categoryId')}
								defaultText="Selecione"
								data={categories.map(({ id, name }) => ({
									text: name,
									value: id
								}))}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Select
								id="productId"
								name="productId"
								value={formProduct.productId || ''}
								label={LabelUtils.translateField('productId')}
								defaultText="Selecione"
								data={productList.map(({ id, name }) => ({ text: name, value: id }))}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								id="barCode"
								name="barCode"
								value={formProduct.barCode || ''}
								label={LabelUtils.translateField('barCode')}
								onChange={handleInputChange}
								disabled
							/>
						</div>
						<div>
							<Select
								id="color"
								name="color"
								value={formProduct?.color || ''}
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
								value={formProduct?.size || ''}
								label={LabelUtils.translateField('size')}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Input
								id="lot"
								name="lot"
								value={formProduct.lot || ''}
								label={LabelUtils.translateField('lot')}
								disabled
								onChange={handleInputChange}
							/>
						</div>
						<Input
							value={data?.sale.employee?.name || user.name}
							label={`Funcionário`}
							disabled
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex gap-2 items-start mt-2 pt-2 border-t">
						<div className="flex gap-2">
							<ButtonCancel
								text="Adicionar produto"
								onClick={handleAddToCart}
								icon={IconPlus}
							/>
						</div>
						<div className="border p-2">
							<div>
								Produtos <small>({cart.length})</small>
							</div>
							{cart.length > 0 && (
								<div className="flex gap-4">
									<table className="table-auto text-sm mb-2">
										<thead>
											<tr className="font-semibold border-b">
												<td className="p-1">Produto</td>
												<td className="p-1">Qtd</td>
												<td className="p-1">Preço Unit</td>
											</tr>
										</thead>
										<tbody>
											{cart.map((item, i) => (
												<tr key={i} className="border-b">
													<td className="p-1">{item.product?.name}</td>
													<td className="p-1">
														<div className="flex gap-1 items-center">
															{/* <button className="text-xs bg-primary text-white p-[px] rounded-full">
															<IconPlus />
														</button> */}
															{item.quantity}
															{/* <button className="text-xs bg-primary text-white p-[px] rounded-full">
															<IconMinus />
														</button> */}
														</div>
													</td>
													<td className="p-1">
														{NumberUtils.formatCurrency(item.unitPrice)} kz
													</td>
												</tr>
											))}
											<tr className="font-semibold border-b">
												<td className="p-1">SubTotal</td>
												<td className="p-1">{qttCart}</td>
												<td className="p-1">
													{NumberUtils.formatCurrency(totalValue)} kz
												</td>
											</tr>
											<tr className="font-semibold">
												<td className="p-1">Descontos</td>
												<td className="p-1"></td>
												<td className="p-1">
													{NumberUtils.formatCurrency(totalDiscount)} kz
												</td>
											</tr>
											<tr className="font-semibold">
												<td className="p-1">Total a pagar</td>
												<td className="p-1"></td>
												<td className="p-1">
													{NumberUtils.formatCurrency(totalValue - totalDiscount)} kz
												</td>
											</tr>
										</tbody>
									</table>
									<div>
										<div className="flex flex-col gap-2">
											<Select
												id="customerId"
												name="customerId"
												value={customerId || ''}
												label={LabelUtils.translateField('customerId')}
												data={customers.map((customer) => ({
													text: customer.name,
													value: customer.id
												}))}
												defaultText="Selecione"
												onChange={(e) => setCustomerId(e.target.value as any)}
											/>
											<Select
												id="paymentMethod"
												name="paymentMethod"
												value={paymentMethod || ''}
												label={LabelUtils.translateField('paymentMethod')}
												data={PaymentUtils.getMethods().map((paymentType) => ({
													text: paymentType
												}))}
												defaultText="Selecione"
												onChange={(e) => setPaymentMethod(e.target.value)}
											/>
											<ButtonSubmit
												onClick={handleSubmit}
												type="submit"
												text="Finalizar compra"
												disabled={isLoading}
												isLoading={isLoading}
											/>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
