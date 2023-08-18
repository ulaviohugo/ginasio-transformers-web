'use client'

import {
	IconCategory,
	IconProduct,
	IconSupplier,
	IconUser,
	Layout,
	LayoutBody,
	Spinner
} from '../components'
import { ElementType, useEffect, useState } from 'react'
import Link from 'next/link'
import {
	makeRemoteCountCategories,
	makeRemoteCountEmployees,
	makeRemoteCountProduct,
	makeRemoteCountSuppliers
} from '@/app/main/factories/usecases/remote'
import { toast } from 'react-hot-toast'

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

	const [products, setProducts] = useState(0)
	const [isLoadingProducts, setIsLoadingProducts] = useState(true)

	const [suppliers, setSupplier] = useState(0)
	const [isLoadingSupplier, setIsLoadingSupplier] = useState(true)

	const fetchCount = (
		remoteResource: { count: () => Promise<number> },
		callback: (response: any) => void
	) => {
		remoteResource
			.count()
			.then((response) => {
				callback(response)
			})
			.catch((error) => {
				callback(0)
				toast.error('Error ao consultar dados')
			})
	}

	useEffect(() => {
		fetchCount(makeRemoteCountEmployees(), (response) => {
			setEmployees(response)
			setIsLoadingEmployees(false)
		})
		fetchCount(makeRemoteCountCategories(), (response) => {
			setCategories(response)
			setIsLoadingCategories(false)
		})
		fetchCount(makeRemoteCountProduct(), (response) => {
			setProducts(response)
			setIsLoadingProducts(false)
		})
		fetchCount(makeRemoteCountSuppliers(), (response) => {
			setSupplier(response)
			setIsLoadingSupplier(false)
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
						href="/rh/funcionarios"
					/>
					<Item
						number={categories}
						title={'Categorias'}
						icon={IconCategory}
						isLoading={isLoadingCategories}
						href="/comercial/categorias"
					/>
					<Item
						number={products}
						title={'Produtos'}
						icon={IconProduct}
						isLoading={isLoadingProducts}
						href="/comercial/produtos"
					/>
					<Item
						number={suppliers}
						title={'Fornecedores'}
						icon={IconSupplier}
						isLoading={isLoadingSupplier}
						href="/comercial/fornecedores"
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
