'use client'

import {
	CardActions,
	IconCategory,
	IconPlus,
	IconProduct,
	IconSearch,
	Input,
	Layout,
	LayoutBody,
	NoData,
	ProductEditor,
	Spinner,
	SubMenu,
	Title
} from '@/app/(presentation)/components'
import { useProducts } from '@/app/(presentation)/hooks'
import { loadProductStore } from '@/app/(presentation)/redux'
import { Product } from '@/app/domain/models'
import {
	makeRemoteAddProduct,
	makeRemoteLoadProduct,
	makeRemoteUpdateProduct
} from '@/app/main/factories/usecases/remote'
import { NumberUtils, SubmenuUtils } from '@/app/utils'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

export default function Categorias() {
	const dispatch = useDispatch()
	const products = useProducts()
	const [selectedProduct, setSelectedProduct] = useState<Product>({} as Product)
	const [isLoading, setIsLoading] = useState(true)
	const [showEditor, setShowEditor] = useState(false)

	const fetchData = async () => {
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

	const clearSelectedEmployee = () => {
		setSelectedProduct({} as Product)
	}

	const handleOpenDetalhe = (product?: Product) => {
		if (product) setSelectedProduct(product)
		setShowEditor(true)
	}

	const handleCloseDetail = () => {
		clearSelectedEmployee()
		setShowEditor(false)
	}

	return (
		<Layout>
			{showEditor && (
				<ProductEditor
					data={selectedProduct}
					show={showEditor}
					onClose={handleCloseDetail}
					addProduct={makeRemoteAddProduct()}
					updateProduct={makeRemoteUpdateProduct()}
				/>
			)}
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={SubmenuUtils.commercial} />
					<Title title={`Produtos`} icon={IconProduct} />
					<div className="flex items-center gap-2">
						<button
							className="bg-primary px-2 py-1 rounded-md text-gray-200"
							title="Novo funcionário"
							onClick={() => handleOpenDetalhe()}
						>
							<IconPlus />
						</button>
						<div className="w-full max-w-xs">
							<Input placeholder="Pesquisar por ID, nome e e-mail" icon={IconSearch} />
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
								<div className="text-xs font-semibold">
									Preço: {NumberUtils.formatCurrency(product.price)}
								</div>
								<div className="inline-flex items-center gap-1 bg-gray-100 text-xs px-2 py-[2px] rounded-md">
									<IconCategory /> {product.category?.name}
								</div>
								<CardActions onClickEdit={() => handleOpenDetalhe(product)} />
							</li>
						))}
					</ul>
				)}
			</LayoutBody>
		</Layout>
	)
}
