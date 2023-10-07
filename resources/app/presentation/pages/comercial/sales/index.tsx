import React from 'react'
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
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { loadSaleStore, removeSaleStore } from '@/presentation/redux'
import { ProductSaleModel, SaleModel } from '@/domain/models'
import {
	makeRemoteAddSale,
	makeRemoteDeleteSale,
	makeRemoteLoadSales
} from '@/main/factories/usecases'
import { DateUtils, NumberUtils, StringUtils, MenuUtils } from '@/utils'

import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

export function Sales() {
	const user = useSelector(useAuth())

	const dispatch = useDispatch()

	// const sales = useSelector(useSales())
	const [productSales] = useState<ProductSaleModel[]>([])

	const [selectedSale, setSelectedSale] = useState<SaleModel>({} as SaleModel)
	const [isLoading, setIsLoading] = useState(true)
	const [showFormDelete, setShowFormDelete] = useState(false)

	const fetchData = async () => {
		try {
			const httpResponse = await makeRemoteLoadSales().load({
				filter: { created_at: new Date() }
			})
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
		setSelectedSale({} as SaleModel)
	}

	const handleOpenDetalhe = (sale?: SaleModel) => {
		if (sale) setSelectedSale(sale)
	}

	const handleCloseFormDelete = () => {
		clearSelectedSale()
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeleteSale().delete(selectedSale.id)
			dispatch(removeSaleStore(selectedSale.id))
			toast.success(`A venda foi excluída`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	return (
		<Layout>
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
				<SubMenu submenus={MenuUtils.commercialMenuItens({ role: user.role })} />
				<div className="flex flex-col gap-2 mt-2">
					<fieldset>
						<legend>Cadastro de venda</legend>
						<SaleEditor
							// data={selectedSale}
							addSale={makeRemoteAddSale()}
						/>
					</fieldset>

					<fieldset>
						<legend>Lista</legend>
						<div className="flex flex-col gap-2 mb-2">
							<Title
								title={`Vendas ${isLoading ? '' : `(${productSales?.length})`}`}
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
						) : productSales.length < 1 ? (
							<NoData />
						) : (
							<table className="table text-left text-sm border border-gray-100">
								<tr>
									<th className="p-1">Id</th>
									<th className="p-1">Categoria</th>
									<th className="p-1">Produto</th>
									<th className="p-1">Cor</th>
									<th className="p-1">Tamanho</th>
									<th className="p-1">Quantidade</th>
									<th className="p-1">Preço unitário</th>
									<th className="p-1">Pago</th>
									<th className="p-1">Funcionário</th>
									<th className="p-1">Data</th>
									<th className="p-1">Acção</th>
								</tr>
								{productSales.map((sale, i) => (
									<tr
										key={sale.id}
										className={` ${
											i % 2 == 0 ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'
										} `}
									>
										<td className="p-1">{sale.id}</td>

										<td className="p-1">{sale.product.category?.name}</td>
										<td className="p-1">{sale.product?.name}</td>
										<td className="p-1">{sale.color}</td>
										<td className="p-1">{sale.size}</td>
										<td className="p-1">{NumberUtils.format(sale.quantity)}</td>
										<td className="p-1">{NumberUtils.formatCurrency(sale.unit_price)}</td>
										<td className="p-1">
											{NumberUtils.formatCurrency(sale.amount_paid)}
										</td>
										<td className="p-1">
											{StringUtils.getFirstWord(sale?.sale.employee?.name as string)}
										</td>
										<td className="p-1">{DateUtils.getDatePt(sale.created_at)}</td>
										<td className="p-1">
											<CardActions
											// onClickDelete={() => handleOpenFormDelete(sale)}
											// onClickEdit={() => handleOpenDetalhe(sale)}
											/>
										</td>
									</tr>
								))}
							</table>
						)}
					</fieldset>
				</div>
			</LayoutBody>
		</Layout>
	)
}
