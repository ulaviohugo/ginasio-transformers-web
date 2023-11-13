import React from 'react'
import {
	CardActions,
	IconProduct,
	IconSearch,
	Input,
	Layout,
	LayoutBody,
	ModalDelete,
	NoData,
	Spinner,
	SubMenu,
	Title,
	IconCategory,
	ProductLabel
} from '@/presentation/components'
import { useAuth, useProducts } from '@/presentation/hooks'
import { loadProductStore, removeProductStore } from '@/presentation/redux'
import { ProductModel } from '@/domain/models'
import { makeRemoteDeleteProduct, makeRemoteLoadProduct } from '@/main/factories/usecases'
import { NumberUtils, MenuUtils } from '@/utils'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { NotFound } from '@/presentation/pages'

export function Products() {
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	const dispatch = useDispatch()
	const products = useSelector(useProducts())
	const [selectedProduct, setSelectedProduct] = useState<ProductModel>({} as ProductModel)
	const [isLoading, setIsLoading] = useState(true)
	const [showEditor, setShowEditor] = useState(false)
	const [showFormDelete, setShowFormDelete] = useState(false)

	const fetchData = async () => {
		if (!isAdmin) return setIsLoading(false)
		try {
			const httpResponse = await makeRemoteLoadProduct().load()
			dispatch(loadProductStore(httpResponse))
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const clearSelectedProduct = () => {
		setSelectedProduct({} as ProductModel)
	}

	const handleOpenDetalhe = (product?: ProductModel) => {
		if (product) setSelectedProduct(product)
		setShowEditor(true)
	}

	const handleCloseDetail = () => {
		clearSelectedProduct()
		setShowEditor(false)
	}

	const handleOpenFormDelete = (category: ProductModel) => {
		setSelectedProduct(category)
		setShowFormDelete(true)
	}

	const handleCloseFormDelete = () => {
		clearSelectedProduct()
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeleteProduct().delete(selectedProduct.id)
			dispatch(removeProductStore(selectedProduct.id))
			toast.success(`O produto ${selectedProduct.name} foi excluído`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	if (!isAdmin) return <NotFound />

	return (
		<Layout>
			{showFormDelete && (
				<ModalDelete
					entity="produto"
					description={`Deseja realmente excluir ${selectedProduct.name}?`}
					show={showFormDelete}
					onClose={handleCloseFormDelete}
					onSubmit={handleDelete}
				/>
			)}
			<LayoutBody>
				<div className="flex flex-col gap-2 mb-2">
					<SubMenu submenus={MenuUtils.commercialMenuItens({ role: user.role })} />
					<Title
						title={`Produtos ${isLoading ? '' : `(${products?.length})`}`}
						icon={IconProduct}
					/>
					<div className="flex items-center gap-2">
						<ProductLabel text="Adicionar" />
						<div className="w-full max-w-xs">
							<Input placeholder="Pesquisar por nome" icon={IconSearch} />
						</div>
					</div>
				</div>
				{isLoading ? (
					<Spinner />
				) : products.length < 1 ? (
					<NoData />
				) : (
					<ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
						{products.map((product) => (
							<li key={product.id} className="p-4 shadow">
								<div className="font-semibold">{product.name}</div>
								<div className="flex flex-col gap-1 text-xs font-semibold">
									<span>
										Preço compra:{' '}
										{NumberUtils.formatCurrency(product?.purchase_price as any)}
									</span>
									<span>
										Preço venda:{' '}
										{NumberUtils.formatCurrency(product?.selling_price as any)}
									</span>
								</div>
								<div className="inline-flex items-center gap-1 bg-gray-100 text-xs px-2 py-[2px] rounded-md">
									<IconCategory /> {product.category?.name}
								</div>
								<CardActions
									onClickDelete={() => handleOpenFormDelete(product)}
									onClickEdit={() => handleOpenDetalhe(product)}
								/>
							</li>
						))}
					</ul>
				)}
			</LayoutBody>
		</Layout>
	)
}
