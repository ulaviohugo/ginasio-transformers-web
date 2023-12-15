import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'

import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import {
	ProductionCategoryModel,
	ProductionProductSaleModel,
	ProductionSaleModel,
	ProductionStockModel
} from '@/domain/models'
import {
	Button,
	ButtonCancel,
	ButtonSubmit,
	IconClose,
	IconEdit,
	IconPlus,
	IconTrash,
	ImagePreview,
	Input,
	InputPrice,
	ProductionSalePdfViewer,
	Select
} from '..'

import {
	ArrayUtils,
	ColorUtils,
	LabelUtils,
	NumberUtils,
	PaymentUtils,
	ProductionBudgetUtils
} from '@/utils'
import {
	loadCustomerStore,
	loadEmployeeStore,
	loadProductionProductSaleStore,
	loadProductionStockStore
} from '@/presentation/redux'
import { AddSale, LoadProductionSales, UpdateProductSale } from '@/domain/usecases'
import { useAuth, useEmployees, useProductionStocks } from '@/presentation/hooks'
import {
	makeRemoteLoadCustomers,
	makeRemoteLoadEmployees,
	makeRemoteLoadProductionStocks
} from '@/main/factories/usecases'

type SaleEditorProps = {
	data?: ProductionSaleModel
	addSale: AddSale
	updateProductSale: UpdateProductSale
	loadSales: LoadProductionSales
	onDelete: () => void
	onClose: () => void
}

export function ProductionSaleEditor({
	data,
	addSale,
	loadSales,
	updateProductSale,
	onDelete,
	onClose
}: SaleEditorProps) {
	const dispatch = useDispatch()
	const stocks = useSelector(useProductionStocks())
	const user = useSelector(useAuth())
	const employees = useSelector(useEmployees())

	const [cart, setCart] = useState<ProductionProductSaleModel[]>([])
	const [endProduct, setEndProduct] = useState('')

	const totalValue = useMemo(() => {
		return cart.reduce(
			(prev, current) =>
				prev +
				NumberUtils.convertToNumber(current.unit_price) *
					NumberUtils.convertToNumber(current.quantity),
			0
		)
	}, [cart])

	const totalBalance = useMemo(() => {
		return cart.reduce(
			(prev, current) => prev + NumberUtils.convertToNumber(current.balance),
			0
		)
	}, [cart])

	const qttCart = useMemo(() => {
		return cart.reduce(
			(prev, current) => prev + NumberUtils.convertToNumber(current.quantity),
			0
		)
	}, [cart])

	const [formProduct, setFormProduct] = useState<ProductionProductSaleModel>(
		data || ({} as any)
	)

	const categories: ProductionCategoryModel[] = useMemo(() => {
		const dataStocks = stocks.map((stock) => ({
			...stock.category,
			id: stock.category_id
		})) as any

		const data = ArrayUtils.removeDuplicated<ProductionCategoryModel>(dataStocks, 'id')
		return data
	}, [stocks])

	const productList = useMemo(() => {
		if (!formProduct?.category_id) return []

		const dataStocks = stocks
			.filter((stock) => stock.category_id == formProduct.category_id)
			.map((stock) => ({
				...stock.product,
				id: stock.product_id
			})) as any

		const data = ArrayUtils.removeDuplicated<ProductionCategoryModel>(dataStocks, 'id')
		return data
	}, [formProduct?.category_id])

	const [paymentMethod, setPaymentMethod] = useState('')
	const [employeeId, setEmployeeId] = useState<number>(user.id)
	const [sendInvoice, setSendInvoice] = useState<'print' | 'email'>('print')

	const [isLoading, setIsLoading] = useState(false)
	const [photPreview, setPhotoPreview] = useState('')
	const [pdfContent, setPdfContent] = useState('')

	const fetchProductSales = async () => {
		try {
			const httpResponse = await loadSales.load()
			dispatch(loadProductionProductSaleStore(httpResponse as any))
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

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

	useEffect(() => {
		fetchData(makeRemoteLoadCustomers(), (response) => {
			dispatch(loadCustomerStore(response))
		})
		fetchData(makeRemoteLoadProductionStocks(), (response) => {
			dispatch(loadProductionStockStore(response))
		})
		fetchData(makeRemoteLoadEmployees(), (response) => {
			dispatch(loadEmployeeStore(response))
		})
		// if (data?.purchase) {
		// 	setSelectedItem(data.purchase)
		// }
		// if (data?.purchase?.photo) {
		// 	setPhotPreview(data.purchase.photo)
		// }
	}, [])

	useEffect(() => {
		if (data?.id) {
			setEndProduct(data.end_product)
			setCart(data.product_sales)
			setPaymentMethod(data.payment_method)
			setEmployeeId(data.employee_id)
			setFormProduct({ id: data.id } as any)
		}
	}, [data])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: ProductionProductSaleModel = { ...formProduct, [name]: value }

		if (name == 'total_value') {
			const total_value = NumberUtils.convertToNumber(value)
			data = {
				...data,
				unit_price: formProduct.quantity > 0 ? total_value / formProduct.quantity : 0
			}
		}
		if (name == 'unit_price') {
			const unit_price = NumberUtils.convertToNumber(value)
			data = {
				...data,
				unit_price
			}
		}
		if (name == 'quantity') {
			let quantity = NumberUtils.convertToNumber(value)
			const stock: ProductionStockModel = stocks.find(
				(stock) =>
					stock.category_id == formProduct.category_id &&
					stock.product_id == Number(formProduct.product_id) &&
					stock.quantity > 0
			) as any

			if (!stock || stock.quantity < quantity) {
				toast.error('Saída de estoque maior que o saldo')
				quantity = 0
			}
			const balance = NumberUtils.convertToNumber(formProduct.balance)
			const total_value =
				quantity > 0
					? NumberUtils.convertToNumber(formProduct.unit_price) * quantity - balance
					: 0
			data = {
				...data,
				quantity,
				total_value,
				amount_paid: total_value
			}
		}
		if (name == 'balance') {
			const balance = NumberUtils.convertToNumber(value)
			const quantity = NumberUtils.convertToNumber(formProduct.quantity)
			const unit_price = NumberUtils.convertToNumber(formProduct.unit_price)
			const total_value = quantity > 0 ? quantity * unit_price : 0

			data = {
				...data,
				amount_paid: balance > 0 ? total_value - balance : total_value
			}
		}

		if (name == 'category_id') {
			data = { ...data, product_id: undefined as any }
		}

		if (name == 'product_id') {
			const stock: ProductionStockModel = stocks.find(
				(stock) =>
					stock.category_id == formProduct.category_id &&
					stock.product_id == Number(value) &&
					stock.quantity > 0
			) as any
			if (!stock || stock.quantity < 1) {
				toast.error('Não tem mais saldo em estoque')
			}
			data = {
				...data,
				lot: stock?.id,
				size: stock?.size,
				color: stock?.color,
				unit_price: stock?.unit_price
			}
			if (stock.photo) setPhotoPreview(stock.photo as string)
		}
		setFormProduct(data)
	}

	const handleAddToCart = () => {
		const { amount_paid, category_id, color, product_id, quantity, size, unit_price } =
			formProduct
		if (!category_id) return toast.error('Selecione a categoria')
		if (!product_id) return toast.error('Selecione o produto')
		if (!color) return toast.error('Selecione a cor')
		if (!size) return toast.error('Informe o tamanho')
		if (!unit_price) return toast.error('Informe o preço unitário')
		if (!quantity) return toast.error('Informe a quantidade')
		if (!amount_paid) return toast.error('Informe o valor total a pagar')

		const stock: ProductionStockModel = stocks.find(
			(stock) => stock.category_id == category_id && stock.product_id == product_id
		) as any

		setCart([
			...cart,
			{
				...formProduct,
				product: { name: stock.product?.name } as any
			}
		])
		setFormProduct({} as any)
	}

	const handleSubmit = async (type: 'save' | 'update' = 'save') => {
		const update = type == 'update'
		if (!paymentMethod && !update) return toast.error('Selecione o método de pagamento')
		setIsLoading(true)

		try {
			const data = {
				product_sales: cart,
				payment_method: paymentMethod,
				total_value: totalValue,
				balance: totalBalance,
				amount_paid: totalValue - totalBalance,
				employee_id: employeeId,
				send_invoice: sendInvoice,
				end_product: endProduct
			} as any

			const httpResponse: any = update
				? await updateProductSale.update(formProduct as any)
				: await addSale.add(data)

			fetchProductSales()
			toast.success(`Venda ${update ? 'actualizada' : 'cadastrada'} com sucesso`)
			if (httpResponse.invoice) {
				setPdfContent(httpResponse.invoice)
			}
			setCart([])
			setFormProduct({} as any)
			setEndProduct('')
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	const clearFields = () => {
		onClose()
		setFormProduct({} as ProductionProductSaleModel)
	}

	const handleDelete = () => {
		if (!formProduct.id) return toast.error('Selecione um registo para excluir')
		onDelete()
	}

	return (
		<fieldset>
			<legend>Cadastro de saída</legend>
			{pdfContent && <ProductionSalePdfViewer pdfUrl={pdfContent} />}
			<div className="flex gap-2">
				<div className="flex flex-col gap-2">
					<ImagePreview photoPreview={photPreview} />
					<div className="bg-green-50 border border-green-200 p-2">
						<div>
							<Input
								id="lot"
								name="lot"
								value={formProduct.lot || ''}
								label={'Cód. Lote'}
								disabled
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
								id="balance"
								name="balance"
								value={formProduct?.balance || ''}
								label={'Saldo'}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>
				<div className="flex-1">
					<div className=" grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
						<div>
							<Input
								id="id"
								name="id"
								value={formProduct.id || ''}
								label={'Código'}
								onChange={handleInputChange}
								disabled
							/>
						</div>
						<div>
							<Select
								id="category_id"
								name="category_id"
								value={formProduct.category_id || ''}
								label={LabelUtils.translateField('category_id')}
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
								id="product_id"
								name="product_id"
								value={formProduct.product_id || ''}
								label={LabelUtils.translateField('product_id')}
								defaultText="Selecione"
								data={productList.map(({ id, name }) => ({ text: name, value: id }))}
								onChange={handleInputChange}
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
							<Select
								id="end_product"
								name="end_product"
								value={endProduct || ''}
								label={'Peça Final'}
								data={ProductionBudgetUtils.endProducts.map((endProduct) => ({
									text: endProduct
								}))}
								defaultText="Selecione"
								onChange={({ target: { value } }) => setEndProduct(value)}
							/>
						</div>
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
														{NumberUtils.formatCurrency(item.unit_price)} kz
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
												<td className="p-1">Saldo</td>
												<td className="p-1"></td>
												<td className="p-1">
													{NumberUtils.formatCurrency(totalBalance)} kz
												</td>
											</tr>
											<tr className="font-semibold">
												<td className="p-1">Total a pagar</td>
												<td className="p-1"></td>
												<td className="p-1">
													{NumberUtils.formatCurrency(totalValue - totalBalance)} kz
												</td>
											</tr>
										</tbody>
									</table>
									<div className="flex flex-col gap-2">
										<div className="flex gap-2">
											<Select
												id="payment_method"
												name="payment_method"
												value={paymentMethod || ''}
												label={LabelUtils.translateField('payment_method')}
												data={PaymentUtils.getMethods().map((paymentType) => ({
													text: paymentType
												}))}
												defaultText="Selecione"
												onChange={(e) => setPaymentMethod(e.target.value)}
											/>
											<Select
												value={employeeId || user.id}
												label={`Funcionário`}
												data={employees.map(({ id, name }) => ({
													text: name,
													value: id
												}))}
												defaultText="Selecione"
												onChange={({ target: { value } }) => setEmployeeId(Number(value))}
											/>
										</div>
										<div className="p-2 border rounded-md">
											<label className="font-semibold uppercase underline">
												Opção de factura
											</label>
											<div className="flex gap-2">
												<label
													htmlFor="print_invoice"
													className="flex items-center gap-1 cursor-pointer"
												>
													Imprimir
													<input
														type="radio"
														name="send_invoice"
														value={'print'}
														id="print_invoice"
														onChange={() => setSendInvoice('print')}
														checked={sendInvoice == 'print'}
													/>
												</label>
												<label
													htmlFor="send_email"
													className="flex items-center gap-1 cursor-pointer"
												>
													Enviar por e-mail
													<input
														type="radio"
														name="send_invoice"
														value={'email'}
														id="send_email"
														onChange={() => setSendInvoice('email')}
														checked={sendInvoice == 'email'}
													/>
												</label>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<ButtonSubmit
						disabled={isLoading}
						isLoading={isLoading}
						onClick={() => handleSubmit('save')}
						className="!bg-green-700"
					/>
					<Button
						variant="gray-light"
						text="Editar"
						icon={IconEdit}
						disabled={isLoading}
						isLoading={isLoading}
						onClick={() => handleSubmit('update')}
						className="!opacity-70"
					/>
					<Button
						variant="default"
						text="Limpar"
						onClick={clearFields}
						icon={IconClose}
					/>
					<Button variant="red" text="Excluir" icon={IconTrash} onClick={handleDelete} />
				</div>
			</div>
		</fieldset>
	)
}
