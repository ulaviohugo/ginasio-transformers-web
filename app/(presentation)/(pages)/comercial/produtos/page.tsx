'use client'

import {
	IconCategory,
	IconProduct,
	Layout,
	LayoutBody,
	Spinner,
	SubMenu,
	Title
} from '@/app/(presentation)/components'
import { Product } from '@/app/domain/models'
import { makeRemoteLoadProduct } from '@/app/main/factories/usecases/remote'
import { SubmenuUtils } from '@/app/utils'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Categorias() {
	const [products, setProducts] = useState<Product[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const fetchData = async () => {
		try {
			const httpResponse = await makeRemoteLoadProduct().load()
			setProducts(httpResponse)
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<Layout>
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={SubmenuUtils.commercial} />
					<Title title={`Produtos`} icon={IconProduct} />
				</div>
				{isLoading ? (
					<Spinner />
				) : (
					<ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
						{products.map((product) => (
							<li key={product.id} className="p-4 shadow relative">
								<div className="font-semibold">{product.name}</div>
								<div className="inline-flex items-center gap-1 bg-primary bg-opacity-50 text-xs text-white font-semibold px-2 py-[2px] rounded-md">
									<IconCategory /> {product.category?.name}
								</div>
							</li>
						))}
					</ul>
				)}
			</LayoutBody>
		</Layout>
	)
}
