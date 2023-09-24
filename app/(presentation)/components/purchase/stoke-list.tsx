'use client'

import { PurchaseModel } from '@/domain/models'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
	CardActions,
	IconClose,
	IconSearch,
	IconStock,
	Input,
	ModalDelete,
	NoData,
	Select,
	Spinner
} from '..'
import { DateUtils, LabelUtils, NumberUtils, ObjectUtils } from '@/utils'
import { DeletePurchase, LoadPurchases } from '@/domain/usecases'
import { loadPurchaseStore, removePurchaseStore } from '@/(presentation)/redux'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import {
	useCategories,
	useProducts,
	usePurchases,
	useSuppliers
} from '@/(presentation)/hooks'
import { QueryParams } from '@/data/protocols'

type StokeListProps = {
	loadStokes: LoadPurchases
	deleteStokes: DeletePurchase
}

type FilterDataProps = {
	supplierId: string
	categoryId: string
	productId: string
	createdAt: Date
}

export function StokeList({ deleteStokes, loadStokes }: StokeListProps) {
	const dispatch = useDispatch()
	const purchases = usePurchases()
	const suppliers = useSuppliers()
	const categories = useCategories()
	const products = useProducts()
	const [isLoading, setIsLoading] = useState(true)
	const [showFormDelete, setShowFormDelete] = useState(false)

	const [selectedPurchase, setSelectedPurchase] = useState<PurchaseModel>(
		{} as PurchaseModel
	)
	const [filterData, setFilterData] = useState<FilterDataProps>({} as FilterDataProps)

	const hasFilter = useMemo(() => {
		return !ObjectUtils.isEmpty(filterData)
	}, [filterData])

	const fetchData = async (queryParams?: QueryParams) => {
		setIsLoading(true)
		try {
			const httpResponse = await loadStokes.load(queryParams)
			dispatch(loadPurchaseStore(httpResponse))
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const handleOpenDetalhe = (purchase?: PurchaseModel) => {
		if (purchase) setSelectedPurchase(purchase)
	}

	const handleChangeFilterInput = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFilterData({ ...filterData, [name]: value })
	}

	const handleRequestFilter = () => {
		if (ObjectUtils.isEmpty(filterData)) {
			return toast.error('Selecione alguns campos para filtrar resultados')
		}
		fetchData({ filter: filterData })
	}

	const clearFilter = () => {
		setFilterData({} as any)
		fetchData()
	}

	const handleOpenFormDelete = (category: PurchaseModel) => {
		setSelectedPurchase(category)
		setShowFormDelete(true)
	}

	const handleCloseFormDelete = () => {
		setShowFormDelete(false)
	}
	const handleDelete = async () => {
		try {
			await deleteStokes.delete(selectedPurchase.id)
			dispatch(removePurchaseStore(selectedPurchase.id))
			toast.success(`O entrada foi excluída`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	return (
		<>
			{showFormDelete && (
				<ModalDelete
					entity="entrada"
					description={`Deseja realmente excluir o registo?`}
					show={showFormDelete}
					onClose={handleCloseFormDelete}
					onSubmit={handleDelete}
				/>
			)}

			<fieldset>
				<legend>Lista</legend>
				<div className="grid grid-cols-9 mb-3">
					<div className="col-span-2">
						<Select
							name="supplierId"
							label={LabelUtils.translateField('supplierId')}
							value={filterData?.supplierId || ''}
							data={suppliers.map(({ id: value, name: text }) => ({ text, value }))}
							defaultText="Selecione"
							onChange={handleChangeFilterInput}
						/>
					</div>
					<div className="col-span-2">
						<Select
							name="categoryId"
							label={LabelUtils.translateField('categoryId')}
							value={filterData?.categoryId || ''}
							data={categories.map(({ id: value, name: text }) => ({ text, value }))}
							defaultText="Selecione"
							onChange={handleChangeFilterInput}
						/>
					</div>
					<div className="col-span-2">
						<Select
							name="productId"
							label={LabelUtils.translateField('productId')}
							value={filterData?.productId || ''}
							data={products.map(({ id: value, name: text }) => ({ text, value }))}
							defaultText="Selecione"
							onChange={handleChangeFilterInput}
						/>
					</div>
					<div className="col-span-2">
						<Input
							type="date"
							name="createdAt"
							label={LabelUtils.translateField('createdAt')}
							value={filterData?.createdAt?.toString() || ''}
							onChange={handleChangeFilterInput}
						/>
					</div>
					<div className="flex items-end gap-2 pl-2">
						<button
							type="button"
							className="flex btn-primary h-8"
							onClick={handleRequestFilter}
						>
							{isLoading ? <Spinner /> : <IconSearch />}
						</button>
						{hasFilter && (
							<button
								type="button"
								className="flex btn-default h-8"
								onClick={clearFilter}
							>
								<IconClose />
							</button>
						)}
					</div>
				</div>
				<div className="max-h-64 overflow-auto">
					<table className="table w-full text-left text-sm border border-gray-100">
						<thead>
							<tr>
								<th className="p-1">Id</th>
								<th className="p-1">Imagem</th>
								<th className="p-1">Fornecedor</th>
								<th className="p-1">Categoria</th>
								<th className="p-1">Produto</th>
								<th className="p-1">Preço/unid</th>
								<th className="p-1">Cor</th>
								<th className="p-1">Tamanho</th>
								<th className="p-1">Quantidade</th>
								<th className="p-1">Data</th>
								<th className="p-1">Acção</th>
							</tr>
						</thead>
						{purchases.length > 0 && (
							<tbody className="h-5">
								{purchases.map((purchase, i) => (
									<tr
										key={purchase.id}
										className={` ${
											i % 2 == 0 ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'
										} `}
									>
										<td className="p-1">{purchase.id}</td>
										<td className="p-1">
											{purchase.photo ? (
												<Image
													src={purchase.photo}
													alt="Imagem"
													width={30}
													height={30}
													className="aspect-square object-cover"
												/>
											) : (
												<IconStock size={25} />
											)}
										</td>
										<td className="p-1">{purchase.supplier?.name}</td>
										<td className="p-1">{purchase.category?.name}</td>
										<td className="p-1">{purchase.product?.name}</td>
										<td className="p-1">
											{NumberUtils.formatCurrency(purchase.sellingPriceUnit)}
										</td>
										<td className="p-1">{purchase.color}</td>
										<td className="p-1">{purchase.size}</td>
										<td className="p-1">{NumberUtils.format(purchase.quantity)}</td>
										<td className="p-1">{DateUtils.getDatePt(purchase.purchaseDate)}</td>
										<td className="p-1">
											<CardActions
												onClickDelete={() => handleOpenFormDelete(purchase)}
												onClickEdit={() => handleOpenDetalhe(purchase)}
											/>
										</td>
									</tr>
								))}
							</tbody>
						)}
					</table>
					{isLoading ? (
						<Spinner />
					) : (
						purchases.length < 1 && (
							<NoData
								data={
									!ObjectUtils.isEmpty(filterData) ? 'Nenhum resultado da pesquisa' : null
								}
							/>
						)
					)}
				</div>
			</fieldset>
		</>
	)
}
