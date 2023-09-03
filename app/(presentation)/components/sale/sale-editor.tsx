'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { PurchaseModel, Sale } from '@/app/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	IconProduct,
	IconSearch,
	Input,
	InputPrice,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	Select
} from '..'

import { LabelUtils, NumberUtils, PaymentUtils, StringUtils } from '@/app/utils'
import { addSaleStore, loadPurchaseStore, updateSaleStore } from '../../redux'
import { AddSale, UpdateSale } from '@/app/domain/usecases'
import { usePurchases } from '../../hooks'
import { makeRemoteLoadPurchases } from '@/app/main/factories/usecases/remote'

type SaleEditorProps = {
	data?: Sale
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

	const [formData, setFormData] = useState<Sale>(data || ({} as Sale))
	const [isLoading, setIsLoading] = useState(false)

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
		if (stocks.length < 1) {
			fetchData(makeRemoteLoadPurchases(), (response) => {
				dispatch(loadPurchaseStore(response))
			})
		}
	}, [])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		let data: Sale = { ...formData, [name]: value }

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
				totalValue:
					quantity > 0 ? NumberUtils.convertToNumber(formData.unitPrice) * quantity : 0
			}
		}
		setFormData(data)
	}

	const handleSelectItem = ({ id, sellingPriceUnit }: PurchaseModel) => {
		const quantity = Number(formData.quantity) || 1
		const totalValue = quantity > 0 ? quantity * sellingPriceUnit : 0
		setFormData({
			...formData,
			purchaseId: id,
			unitPrice: sellingPriceUnit,
			totalValue,
			quantity
		})
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)
		try {
			const httpResponse = (
				formData.id ? await updateSale.update(formData) : await addSale.add(formData)
			) as Sale

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
				{data?.id ? 'Editar' : 'Cadastrar'} venda {data?.purchase?.product?.name}
			</ModalTitle>
			<ModalBody>
				<form onSubmit={handleSubmit}>
					<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
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
							<InputPrice
								id="totalValue"
								name="totalValue"
								value={formData?.totalValue || ''}
								label={'Total a pagar'}
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
								data={PaymentUtils.getMethods().map((paymentType) => ({
									text: paymentType
								}))}
								defaultText="Selecione"
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="flex-1 my-5">
						<ItemList stocks={stocks} onSelect={handleSelectItem} />
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
		<div className="flex flex-col gap-1">
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
						<th className="p-1">Quantidade</th>
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
