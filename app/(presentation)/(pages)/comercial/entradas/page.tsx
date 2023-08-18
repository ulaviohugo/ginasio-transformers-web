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
	IconCategory,
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
import { NumberUtils, SubmenuUtils } from '@/app/utils'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

export default function Categorias() {
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
					<ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
						{purchases.map((purchase) => (
							<li key={purchase.id} className="p-4 shadow">
								<div className="font-semibold">{purchase.product?.name}</div>
								<div className="text-xs font-semibold">
									Preço: {NumberUtils.formatCurrency(purchase.unitPrice)}
								</div>
								<div className="inline-flex items-center gap-1 bg-gray-100 text-xs px-2 py-[2px] rounded-md">
									<IconCategory /> {purchase.category?.name}
								</div>
								<CardActions
									onClickDelete={() => handleOpenFormDelete(purchase)}
									onClickEdit={() => handleOpenDetalhe(purchase)}
								/>
							</li>
						))}
					</ul>
				)}
			</LayoutBody>
		</Layout>
	)
}