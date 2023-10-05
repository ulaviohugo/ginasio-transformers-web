'use client'

import {
	IconCategory,
	IconCurrency,
	IconCustomer,
	IconProduct,
	IconSupplier,
	IconUser,
	Layout,
	LayoutBody,
	Spinner
} from '@/(presentation)/components'
import { ElementType, useEffect, useState } from 'react'
import Link from 'next/link'
import {
	makeRemoteCountCategories,
	makeRemoteCountCustomers,
	makeRemoteCountEmployees,
	makeRemoteCountProduct,
	makeRemoteCountPurchases,
	makeRemoteCountSales,
	makeRemoteCountSuppliers
} from '@/main/factories/usecases/remote'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks'

type ItemProps = {
	number: number
	title: string
	icon?: ElementType
	isLoading?: boolean
	href: string
	className?: string
}

export default function Home() {
	const user = useSelector(useAuth())
	const isAdmin = user?.role == 'Admin'

	const [employees, setEmployees] = useState(0)
	const [isLoadingEmployees, setIsLoadingEmployees] = useState(true)

	const [categories, setCategories] = useState(0)
	const [isLoadingCategories, setIsLoadingCategories] = useState(true)

	const [products, setProducts] = useState(0)
	const [isLoadingProducts, setIsLoadingProducts] = useState(true)

	const [suppliers, setSuppliers] = useState(0)
	const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true)

	const [customers, setCustomers] = useState(0)
	const [isLoadingCustomers, setIsLoadingCustomers] = useState(true)

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
		{
			isAdmin &&
				fetchCount(makeRemoteCountEmployees(), (response) => {
					setEmployees(response)
					setIsLoadingEmployees(false)
				})
		}
		{
			isAdmin &&
				fetchCount(makeRemoteCountCategories(), (response) => {
					setCategories(response)
					setIsLoadingCategories(false)
				})
		}
		{
			isAdmin &&
				fetchCount(makeRemoteCountProduct(), (response) => {
					setProducts(response)
					setIsLoadingProducts(false)
				})
		}
		{
			isAdmin &&
				fetchCount(makeRemoteCountSuppliers(), (response) => {
					setSuppliers(response)
					setIsLoadingSuppliers(false)
				})
		}
		{
			isAdmin &&
				fetchCount(makeRemoteCountCustomers(), (response) => {
					setCustomers(response)
					setIsLoadingCustomers(false)
				})
		}
		{
			isAdmin &&
				fetchCount(makeRemoteCountPurchases(), (response) => {
					setPurchases(response)
					setIsLoadingPurchases(false)
				})
		}
		fetchCount(makeRemoteCountSales(), (response) => {
			setSales(response)
			setIsLoadingSales(false)
		})
	}, [])

	return (
		<Layout>
			<LayoutBody>
				<div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 p-2">
					{isAdmin && (
						<Item
							number={employees}
							title={'Funcionários'}
							icon={IconUser}
							isLoading={isLoadingEmployees}
							href="/rh/funcionarios"
						/>
					)}
					{isAdmin && (
						<Item
							number={categories}
							title={'Categorias'}
							icon={IconCategory}
							isLoading={isLoadingCategories}
							href="/comercial/categorias"
							className="bg-gray-400 bg-opacity-80 hover:bg-opacity-100"
						/>
					)}
					{isAdmin && (
						<Item
							number={products}
							title={'Produtos'}
							icon={IconProduct}
							isLoading={isLoadingProducts}
							href="/comercial/produtos"
							className="bg-blue-400 bg-opacity-80 hover:bg-opacity-100"
						/>
					)}
					{isAdmin && (
						<Item
							number={suppliers}
							title={'Fornecedores'}
							icon={IconSupplier}
							isLoading={isLoadingSuppliers}
							href="/comercial/fornecedores"
							className="bg-red-400 bg-opacity-80 hover:bg-opacity-100"
						/>
					)}
					{isAdmin && (
						<Item
							number={customers}
							title={'Clientes'}
							icon={IconCustomer}
							isLoading={isLoadingCustomers}
							href="/comercial/clientes"
							className="bg-orange-400 bg-opacity-80 hover:bg-opacity-100"
						/>
					)}
					{isAdmin && (
						<Item
							number={purchases}
							title={'Estoque'}
							icon={IconProduct}
							isLoading={isLoadingPurchases}
							href="/comercial/estoque"
							className="bg-yellow-400 bg-opacity-80 hover:bg-opacity-100"
						/>
					)}
					<Item
						number={sales}
						title={'Vendas'}
						icon={IconCurrency}
						isLoading={isLoadingSales}
						href="/comercial/vendas"
						className="bg-green-400 bg-opacity-80 hover:bg-opacity-100"
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}

const Item = ({ icon: Icon, number, title, isLoading, href, className }: ItemProps) => {
	return (
		<Link
			href={href}
			className={`flex gap-2 shadow-md p-4 rounded-lg hover:scale-105 transition-all duration-300 ${
				className || ''
			}`}
		>
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
