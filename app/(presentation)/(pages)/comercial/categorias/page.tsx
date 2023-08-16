'use client'

import {
	CardActions,
	IconCategory,
	Layout,
	LayoutBody,
	NoData,
	Spinner,
	SubMenu,
	Title
} from '@/app/(presentation)/components'
import { useCategories, useRedux } from '@/app/(presentation)/hooks'
import { loadCategoryStore } from '@/app/(presentation)/redux'
import { makeRemoteLoadCategories } from '@/app/main/factories/usecases/remote'
import { SubmenuUtils } from '@/app/utils'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

export default function Categorias() {
	const dispatch = useDispatch()
	const categories = useCategories()
	const [isLoading, setIsLoading] = useState(true)

	const fetchData = async () => {
		try {
			const httpResponse = await makeRemoteLoadCategories().load()
			dispatch(loadCategoryStore(httpResponse))
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
					<Title title={`Categorias`} icon={IconCategory} />
				</div>
				{isLoading ? (
					<Spinner />
				) : categories.length < 1 ? (
					<NoData />
				) : (
					<ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
						{categories.map((category) => (
							<li key={category.id} className="p-4 shadow">
								<div className="font-semibold">{category.name}</div>
								<CardActions />
							</li>
						))}
					</ul>
				)}
			</LayoutBody>
		</Layout>
	)
}
