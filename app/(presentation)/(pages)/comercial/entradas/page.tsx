'use client'

import {
	CardActions,
	IconPlus,
	IconSearch,
	Input,
	Layout,
	LayoutBody,
	ModalDelete,
	NoData,
	PurchaseEditor,
	Spinner,
	SubMenu,
	Title,
	IconProduct
} from '@/app/(presentation)/components'
import { usePurchases } from '@/app/(presentation)/hooks'
import { loadPurchaseStore, removePurchaseStore } from '@/app/(presentation)/redux'
import { Purchase } from '@/app/domain/models'
import {
	makeRemoteAddPurchase,
	makeRemoteDeletePurchase,
	makeRemoteLoadPurchases,
	makeRemoteUpdatePurchase
} from '@/app/main/factories/usecases/remote'
import { DateUtils, NumberUtils, SubmenuUtils } from '@/app/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

export default function Entradas() {
	const dispatch = useDispatch()
	const purchases = usePurchases()
	const [selectedPurchase, setSelectedPurchase] = useState<Purchase>({} as Purchase)
	const [isLoading, setIsLoading] = useState(true)
	const [showEditor, setShowEditor] = useState(false)
	const [showFormDelete, setShowFormDelete] = useState(false)

	const fetchData = async () => {
		try {
			const httpResponse = await makeRemoteLoadPurchases().load()
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

	const clearSelectedPurchase = () => {
		setSelectedPurchase({} as Purchase)
	}

	const handleOpenDetalhe = (purchase?: Purchase) => {
		if (purchase) setSelectedPurchase(purchase)
		setShowEditor(true)
	}

	const handleCloseDetail = () => {
		clearSelectedPurchase()
		setShowEditor(false)
	}

	const handleOpenFormDelete = (category: Purchase) => {
		setSelectedPurchase(category)
		setShowFormDelete(true)
	}

	const handleCloseFormDelete = () => {
		clearSelectedPurchase()
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeletePurchase().delete(selectedPurchase.id)
			dispatch(removePurchaseStore(selectedPurchase.id))
			toast.success(`O entrada foi excluída`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	return (
		<Layout>
			{showEditor && (
				<PurchaseEditor
					data={selectedPurchase}
					show={showEditor}
					onClose={handleCloseDetail}
					addPurchase={makeRemoteAddPurchase()}
					updatePurchase={makeRemoteUpdatePurchase()}
				/>
			)}
			{showFormDelete && (
				<ModalDelete
					entity="entrada"
					description={`Deseja realmente excluir o registo?`}
					show={showFormDelete}
					onClose={handleCloseFormDelete}
					onSubmit={handleDelete}
				/>
			)}
			<LayoutBody>
				<div className="flex flex-col gap-2 mb-2">
					<SubMenu submenus={SubmenuUtils.commercial} />
					<Title
						title={`Entradas ${isLoading ? '' : `(${purchases?.length})`}`}
						icon={IconProduct}
					/>
					<div className="flex items-center gap-2">
						<button
							className="bg-primary px-2 py-1 rounded-md text-gray-200"
							title="Nova entrada"
							onClick={() => handleOpenDetalhe()}
						>
							<IconPlus />
						</button>
						<div className="w-full max-w-xs">
							<Input placeholder="Pesquisar por nome" icon={IconSearch} />
						</div>
					</div>
				</div>
				{isLoading ? (
					<Spinner />
				) : purchases.length < 1 ? (
					<NoData />
				) : (
					<table className="table text-left text-sm border border-gray-100">
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
										<IconProduct size={25} />
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
			</LayoutBody>
		</Layout>
	)
}
