'use client'

import { IconUser, Layout, LayoutBody, Spinner } from '../components'
import { ElementType, useEffect, useState } from 'react'
import { makeApiUrl, makeFetchHttpClient } from '@/app/main/factories/http'

type ItemProps = {
	number: number
	title: string
	icon?: ElementType
	isLoading?: boolean
}

export default function Home() {
	const [employees, setEmployees] = useState(0)
	const [isLoadingEmployees, setIsLoadingEmployees] = useState(true)

	useEffect(() => {
		makeFetchHttpClient()
			.request({ url: makeApiUrl('/employees/count'), method: 'get' })
			.then((response) => {
				setEmployees(response.body)
				setIsLoadingEmployees(false)
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
					/>
					<Item
						number={employees}
						title={'Funcionários'}
						icon={IconUser}
						isLoading={isLoadingEmployees}
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}

const Item = ({ icon: Icon, number, title, isLoading }: ItemProps) => {
	return (
		<div className="flex gap-2 shadow-md p-4 rounded-lg">
			{Icon && <Icon className="text-7xl" />}
			<div className={`flex-1`}>
				<h2 className="">{title}</h2>
				<div className="text-5xl font-bold">
					{isLoading ? <Spinner className="text-base" /> : number}
				</div>
			</div>
		</div>
	)
}
