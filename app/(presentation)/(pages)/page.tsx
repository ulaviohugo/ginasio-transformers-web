'use client'

import {
	IconCategory,
	IconCurrency,
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
	makeRemoteCountPurchases,
	makeRemoteCountSales,
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

	const [suppliers, setSuppliers] = useState(0)
	const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true)

	const [purchases, setPurchases] = useState(0)
	const [isLoadingPurchases, setIsLoadingPurchases] = useState(true)

	const [sales, setSales] = useState(0)
	const [isLoadingSales, setIsLoadingSales] = useState(true)

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
			setSuppliers(response)
			setIsLoadingSuppliers(false)
		})
		fetchCount(makeRemoteCountSales(), (response) => {
			setSales(response)
			setIsLoadingSales(false)
		})
		fetchCount(makeRemoteCountPurchases(), (response) => {
			setPurchases(response)
			setIsLoadingPurchases(false)
		})
	}, [])

	return (
		<Layout>
			<LayoutBody>
				<div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 p-2">
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
						isLoading={isLoadingSuppliers}
						href="/comercial/fornecedores"
					/>
					<Item
						number={purchases}
						title={'Estoque'}
						icon={IconProduct}
						isLoading={isLoadingPurchases}
						href="/comercial/estoque"
					/>
					<Item
						number={sales}
						title={'Vendas'}
						icon={IconCurrency}
						isLoading={isLoadingSales}
						href="/comercial/vendas"
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
