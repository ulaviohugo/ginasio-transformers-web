'use client'

import { PurchaseModel } from '@/domain/models'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { CardActions, IconStock, ModalDelete, NoData, Spinner } from '..'
import { DateUtils, NumberUtils } from '@/utils'
import { DeletePurchase, LoadPurchases } from '@/domain/usecases'
import { loadPurchaseStore, removePurchaseStore } from '@/(presentation)/redux'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { usePurchases } from '@/(presentation)/hooks'

type StokeListProps = {
	loadStokes: LoadPurchases
	deleteStokes: DeletePurchase
}

export function StokeList({ deleteStokes, loadStokes }: StokeListProps) {
	const dispatch = useDispatch()
	const purchases = usePurchases()
	const [isLoading, setIsLoading] = useState(true)
	const [showFormDelete, setShowFormDelete] = useState(false)

	const [selectedPurchase, setSelectedPurchase] = useState<PurchaseModel>(
		{} as PurchaseModel
	)

	const fetchData = async () => {
		try {
			const httpResponse = await loadStokes.load()
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
			{isLoading ? (
				<Spinner />
			) : purchases.length < 1 ? (
				<NoData />
			) : (
				<table className="table w-full text-left text-sm border border-gray-100">
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
				</table>
			)}
		</>
	)
}
