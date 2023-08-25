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
	SaleEditor,
	Spinner,
	SubMenu,
	Title,
	IconProduct
} from '@/app/(presentation)/components'
import { useSales } from '@/app/(presentation)/hooks'
import { loadSaleStore, removeSaleStore } from '@/app/(presentation)/redux'
import { Sale } from '@/app/domain/models'
import {
	makeRemoteAddSale,
	makeRemoteDeleteSale,
	makeRemoteLoadSales,
	makeRemoteUpdateSale
} from '@/app/main/factories/usecases/remote'
import { DateUtils, NumberUtils, StringUtils, SubmenuUtils } from '@/app/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

export default function Vendas() {
	const dispatch = useDispatch()
	const sales = useSales()
	const [selectedSale, setSelectedSale] = useState<Sale>({} as Sale)
	const [isLoading, setIsLoading] = useState(true)
	const [showEditor, setShowEditor] = useState(false)
	const [showFormDelete, setShowFormDelete] = useState(false)

	const fetchData = async () => {
		try {
			const httpResponse = await makeRemoteLoadSales().load()
			dispatch(loadSaleStore(httpResponse))
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const clearSelectedSale = () => {
		setSelectedSale({} as Sale)
	}

	const handleOpenDetalhe = (sale?: Sale) => {
		if (sale) setSelectedSale(sale)
		setShowEditor(true)
	}

	const handleCloseDetail = () => {
		clearSelectedSale()
		setShowEditor(false)
	}

	const handleOpenFormDelete = (category: Sale) => {
		setSelectedSale(category)
		setShowFormDelete(true)
	}

	const handleCloseFormDelete = () => {
		clearSelectedSale()
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeleteSale().delete(selectedSale.id)
			dispatch(removeSaleStore(selectedSale.id))
			toast.success(`O entrada foi excluída`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	return (
		<Layout>
			{showEditor && (
				<SaleEditor
					data={selectedSale}
					show={showEditor}
					onClose={handleCloseDetail}
					addSale={makeRemoteAddSale()}
					updateSale={makeRemoteUpdateSale()}
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
						title={`Vendas ${isLoading ? '' : `(${sales?.length})`}`}
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
				) : sales.length < 1 ? (
					<NoData />
				) : (
					<table className="table text-left text-sm border border-gray-100">
						<tr>
							<th className="p-1">Id</th>
							<th className="p-1">Categoria</th>
							<th className="p-1">Produto</th>
							<th className="p-1">Cor</th>
							<th className="p-1">Quantidade</th>
							<th className="p-1">Preço unitário</th>
							<th className="p-1">Tamanho</th>
							<th className="p-1">Pago</th>
							<th className="p-1">Funcionário</th>
							<th className="p-1">Data</th>
							<th className="p-1">Acção</th>
						</tr>
						{sales.map((sale, i) => (
							<tr
								key={sale.id}
								className={` ${
									i % 2 == 0 ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'
								} `}
							>
								<td className="p-1">{sale.id}</td>

								<td className="p-1">{sale.purchase?.category?.name}</td>
								<td className="p-1">{sale.purchase?.product?.name}</td>
								<td className="p-1">{sale.purchase?.color}</td>
								<td className="p-1">{NumberUtils.format(sale.quantity)}</td>
								<td className="p-1">{NumberUtils.formatCurrency(sale.unitPrice)}</td>
								<td className="p-1">{sale.purchase?.size}</td>
								<td className="p-1">{NumberUtils.formatCurrency(sale.totalValue)}</td>
								<td className="p-1">
									{StringUtils.getFirstWord(sale.purchase?.employee?.name as string)}
								</td>
								<td className="p-1">{DateUtils.getDatePt(sale.createdAt)}</td>
								<td className="p-1">
									<CardActions
										onClickDelete={() => handleOpenFormDelete(sale)}
										onClickEdit={() => handleOpenDetalhe(sale)}
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
