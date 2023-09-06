'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { PurchaseModel, SaleModel } from '@/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	IconProduct,
	IconSearch,
	IconStock,
	ImagePreview,
	Input,
	InputPrice,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	Select
} from '..'

import { ColorUtils, LabelUtils, NumberUtils, PaymentUtils, StringUtils } from '@/utils'
import {
	addSaleStore,
	loadCustomerStore,
	loadPurchaseStore,
	updateSaleStore
} from '../../redux'
import { AddSale, UpdateSale } from '@/domain/usecases'
import { useAuth, useCustomers, usePurchases } from '../../hooks'
import {
	makeRemoteLoadCustomers,
	makeRemoteLoadPurchases
} from '@/main/factories/usecases/remote'

type SaleEditorProps = {
	data?: SaleModel
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
	const stocks = usePurchases()
	const customers = useCustomers()

	const user = useAuth()

	const [formData, setFormData] = useState<SaleModel>(data || ({} as SaleModel))
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
		fetchData(makeRemoteLoadPurchases(), (response) => {
			dispatch(loadPurchaseStore(response))
		})
		fetchData(makeRemoteLoadCustomers(), (response) => {
			dispatch(loadCustomerStore(response))
		})
		if (data?.purchase) {
			setSelectedItem(data.purchase)
		}
		if (data?.purchase?.photo) {
			setPhotPreview(data.purchase.photo)
		}
	}, [])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: SaleModel = { ...formData, [name]: value }

		if (name == 'totalValue') {
			const totalValue = NumberUtils.convertToNumber(value)
			data = {
				...data,
				unitPrice: formData.quantity > 0 ? totalValue / formData.quantity : 0
			}
		}
		if (name == 'quantity') {
			const quantity = NumberUtils.convertToNumber(value)
			const discount = NumberUtils.convertToNumber(formData.discount)
			const totalValue =
				quantity > 0
					? NumberUtils.convertToNumber(formData.unitPrice) * quantity - discount
					: 0
			data = {
				...data,
				totalValue,
				amountPaid: totalValue
			}
		}
		if (name == 'discount') {
			const discount = NumberUtils.convertToNumber(value)
			const quantity = NumberUtils.convertToNumber(formData.quantity)
			const unitPrice = NumberUtils.convertToNumber(formData.unitPrice)
			const totalValue = quantity > 0 ? quantity * unitPrice : 0

			data = {
				...data,
				amountPaid: discount > 0 ? totalValue - discount : totalValue
			}
		}
		setFormData(data)
	}

	const handleSelectItem = (selectedItem: PurchaseModel) => {
		const { id, sellingPriceUnit: unitPrice, color, size, photo } = selectedItem
		setSelectedItem(selectedItem)

		const quantity = Number(formData.quantity) || 1
		const totalValue = quantity > 0 ? quantity * unitPrice : 0
		setPhotPreview(photo || '')
		setFormData({
			...formData,
			purchaseId: id,
			unitPrice,
			totalValue,
			amountPaid: totalValue,
			quantity,
			color,
			size
		})
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)
		try {
			const httpResponse = (
				formData.id ? await updateSale.update(formData) : await addSale.add(formData)
			) as SaleModel

			if (formData.id) {
				dispatch(updateSaleStore(httpResponse))
			} else {
				dispatch(addSaleStore(httpResponse))
			}
			toast.success(`Venda ${formData.id ? 'actualizada' : 'cadastrada'} com sucesso`)
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
				{data?.id ? `Venda - ${data?.purchase?.product?.name}` : 'Cadastrar venda'}
			</ModalTitle>
			<ModalBody>
				<form onSubmit={handleSubmit}>
					<div className="flex gap-2">
						<div className="flex flex-col gap-2">
							<ImagePreview photoPreview={photPreview} disabled />
							<div className="bg-green-50 border border-green-200 p-2">
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
										id="discount"
										name="discount"
										value={formData?.discount || ''}
										label={'Desconto'}
										onChange={handleInputChange}
									/>
								</div>
								<div>
									<InputPrice
										id="amountPaid"
										name="amountPaid"
										value={formData?.amountPaid || ''}
										label={'Total a pagar'}
										onChange={handleInputChange}
										disabled
									/>
								</div>
							</div>
						</div>
						<div>
							<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
								<div>
									<Select
										id="customerId"
										name="customerId"
										value={formData?.customerId || ''}
										label={LabelUtils.translateField('customerId')}
										data={customers.map((customer) => ({
											text: customer.name,
											value: customer.id
										}))}
										defaultText="Selecione"
										onChange={handleInputChange}
									/>
								</div>
								<div>
									<Input
										id="categoryId"
										name="categoryId"
										value={selectedItem.category?.name || ''}
										label={LabelUtils.translateField('categoryId')}
										disabled
									/>
								</div>
								<div>
									<Input
										id="productId"
										name="productId"
										value={selectedItem.product?.name || ''}
										label={LabelUtils.translateField('productId')}
										disabled
									/>
								</div>
								<div>
									<Input
										id="barCode"
										name="barCode"
										value={selectedItem.barCode || ''}
										label={LabelUtils.translateField('barCode')}
										disabled
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
										id="lot"
										name="lot"
										value={selectedItem.lot || ''}
										label={LabelUtils.translateField('lot')}
										disabled
									/>
								</div>
								<div>
									<Input
										value={selectedItem.unitPrice || ''}
										label={`Preço compra`}
										disabled
									/>
								</div>
								<div>
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
								</div>
								<Input
									value={data?.employee?.name || user.name}
									label={`Funcionário`}
									disabled
								/>
							</div>
							<div className="flex-1 my-5">
								<ItemList stocks={stocks} onSelect={handleSelectItem} />
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

type ItemListProps = {
	stocks: PurchaseModel[]
	onSelect: (selectedStock: PurchaseModel) => void
}

const ItemList = ({ stocks, onSelect }: ItemListProps) => {
	const [search, setSearch] = useState('')
	const [selectedItem, setSelectedItem] = useState(0)
	const filteredStocks = !search.trim()
		? stocks
		: stocks.filter((stock) => {
				let stockData =
					(stock.category?.name?.toLocaleLowerCase() || '') +
					(stock.product?.name?.toLocaleLowerCase() || '')
				stockData = StringUtils.slug(stockData)
				return stockData.includes(StringUtils.slug(search))
		  })

	const handleSelect = (stock: PurchaseModel) => {
		onSelect(stock)
		setSelectedItem(stock.id)
	}
	return (
		<div className="flex flex-col gap-1 border-t pt-2 mt-2">
			<div className="flex items-center gap-2 uppercase text-xs font-semibold">
				<IconStock /> Produtos em estoque
			</div>
			<Input
				placeholder="Pesquisar por produto ou categoria"
				icon={IconSearch}
				onChange={({ target }) => setSearch(target.value)}
				autoFocus
			/>
			<div className="max-h-64 overflow-auto">
				<table className="table text-left text-sm border border-gray-100 w-full">
					<tr>
						<th className="p-1">Imagem</th>
						<th className="p-1">Categoria</th>
						<th className="p-1">Produto</th>
						<th className="p-1">Preço/unid</th>
						<th className="p-1">Cor</th>
						<th className="p-1">Tamanho</th>
						<th className="p-1">Estoque</th>
					</tr>
					{filteredStocks.map((stock, i) => (
						<tr
							key={stock.id}
							className={`${selectedItem == stock.id && '!bg-primary text-white'} ${
								i % 2 == 0 ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'
							} transition-all duration-200 ease-out cursor-pointer`}
							onClick={() => handleSelect(stock)}
						>
							<td className="p-1">
								{stock.photo ? (
									<Image
										src={stock.photo}
										alt="Imagem"
										width={30}
										height={30}
										className="aspect-square object-cover"
									/>
								) : (
									<IconProduct size={25} />
								)}
							</td>
							<td className="p-1">{stock.category?.name}</td>
							<td className="p-1">{stock.product?.name}</td>
							<td className="p-1">
								{NumberUtils.formatCurrency(stock.sellingPriceUnit)}
							</td>
							<td className="p-1">{stock.color}</td>
							<td className="p-1">{stock.size}</td>
							<td className="p-1">{NumberUtils.format(stock.quantity)}</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	)
}
