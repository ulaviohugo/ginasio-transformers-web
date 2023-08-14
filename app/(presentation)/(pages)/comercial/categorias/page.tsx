'use client'

import {
	Layout,
	LayoutBody,
	Spinner,
	SubMenu,
	Title
} from '@/app/(presentation)/components'
import { Category } from '@/app/domain/models'
import { makeRemoteLoadCategories } from '@/app/main/factories/usecases/remote'
import { SubmenuUtils } from '@/app/utils'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Categorias() {
	const [categories, setCategories] = useState<Category[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const fetchData = async () => {
		try {
			const httpResponse = await makeRemoteLoadCategories().load()
			setCategories(httpResponse)
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
					<Title title={`Categorias`} />
				</div>
				{isLoading ? (
					<Spinner />
				) : (
					<ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
						{categories.map((category) => (
							<li key={category.id} className="p-4 shadow">
								<div className="font-semibold">{category.name}</div>
							</li>
						))}
					</ul>
				)}
			</LayoutBody>
		</Layout>
	)
}
