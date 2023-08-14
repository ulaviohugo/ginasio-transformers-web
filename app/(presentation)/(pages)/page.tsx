'use client'

import { IconCategory, IconUser, Layout, LayoutBody, Spinner } from '../components'
import { ElementType, useEffect, useState } from 'react'
import Link from 'next/link'
import {
	makeRemoteCountCategories,
	makeRemoteCountEmployees
} from '@/app/main/factories/usecases/remote'

type ItemProps = {
	number: number
	title: string
	icon?: ElementType
	isLoading?: boolean
	href: string
}

export default function Home() {
	const [employees, setEmployees] = useState(0)
	const [isLoadingEmployees, setIsLoadingEmployees] = useState(true)

	const [categories, setCategories] = useState(0)
	const [isLoadingCategories, setIsLoadingCategories] = useState(true)

	const fetchData = (
		remoteResource: { count: () => Promise<number> },
		callback: (response: any) => void
	) => {
		remoteResource.count().then((response) => {
			callback(response)
		})
	}

	useEffect(() => {
		fetchData(makeRemoteCountEmployees(), (response) => {
			setEmployees(response)
			setIsLoadingEmployees(false)
		})
		fetchData(makeRemoteCountCategories(), (response) => {
			setCategories(response)
			setIsLoadingCategories(false)
		})
	}, [])

	return (
		<Layout>
			<LayoutBody>
				<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 p-2">
					<Item
						number={employees}
						title={'Funcionários'}
						icon={IconUser}
						isLoading={isLoadingEmployees}
						href="/rh"
					/>
					<Item
						number={categories}
						title={'Categorias'}
						icon={IconCategory}
						isLoading={isLoadingCategories}
						href="/comercial/categorias"
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}

const Item = ({ icon: Icon, number, title, isLoading, href }: ItemProps) => {
	return (
		<Link href={href} className="flex gap-2 shadow-md p-4 rounded-lg">
			{Icon && <Icon className="text-7xl" />}
			<div className={`flex-1`}>
				<h2 className="">{title}</h2>
				<div className="text-5xl font-bold">
					{isLoading ? <Spinner className="text-base" /> : number}
				</div>
			</div>
		</Link>
	)
}
