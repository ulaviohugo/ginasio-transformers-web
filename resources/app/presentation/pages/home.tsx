import React from 'react'
import {
	IconAthlete,
	IconUser,
	Layout,
	LayoutBody,
	Spinner,
	IconDumbbell,
	IconProduct,
	IconSupliers
} from '@/presentation/components'
import { ElementType, useEffect, useState } from 'react'
import {
	makeRemoteCountAthletes,
	makeRemoteCountEmployees
} from '@/main/factories/usecases'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks'
import { Link } from 'react-router-dom'
import { MenuUtils } from '@/utils'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

type ItemProps = {
	number: number
	title: string
	icon?: ElementType
	isLoading?: boolean
	href: string
	className?: string
}

export function Home() {
	const user = useSelector(useAuth())
	const isAdmin = user?.role == 'Admin'

	const [employees, setEmployees] = useState(0)
	const [isLoadingEmployees, setIsLoadingEmployees] = useState(true)
	const [athletes, setAthletes] = useState(0)
	const [equipments, setEquipments] = useState(0)
	const [isLoadingAthletes, setIsLoadingAthletes] = useState(true)
	const [isLoadingEquipments, setIsLoadingEquipments] = useState(true)

	const fetchCount = (
		remoteResource: { count: () => Promise<number> },
		callback: (response: any) => void
	) => {
		remoteResource
			.count()
			.then((response) => {
				callback(response)
			})
			.catch(({ message }) => {
				callback(0)
				toast.error(message)
			})
	}

	useEffect(() => {
		{
			isAdmin &&
				Promise.all([
					fetchCount(makeRemoteCountEmployees(), (response) => {
						setEmployees(response)
						setIsLoadingEmployees(false)
					}),
					fetchCount(makeRemoteCountAthletes(), (response) => {
						setAthletes(response)
						setIsLoadingAthletes(false)
					}),
					makeAuthorizeHttpClientDecorator().request({
						url: makeApiUrl('/materiais/count'),
						method: 'get'
					}).then((response)=>{
						if (response.statusCode >=200 &&response.statusCode <=299) {
							setEquipments(response.body);
							setIsLoadingEquipments(false)
						} else {
							toast.error(response.body);
						}
					}),
				])
		}
	}, [])

	return (
		<Layout>
			<LayoutBody>
				<div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 p-2">
					{isAdmin && (
						<>
							<Item
								number={employees}
								title={'Funcionários'}
								icon={IconUser}
								isLoading={isLoadingEmployees}
								href={MenuUtils.FRONT.EMPLOYEES}
							/>
							<Item
								number={athletes}
								title={'Atletas'}
								icon={IconAthlete}
								isLoading={isLoadingAthletes}
								href={MenuUtils.FRONT.ATHLETES}
							/>
							<Item
								number={equipments}
								title={'Equipamentos'}
								icon={IconDumbbell}
								isLoading={isLoadingEquipments}
								href={MenuUtils.FRONT.EQUIPMENTS}
							/>
						</>
					)}
				</div>
			</LayoutBody>
		</Layout>
	)
}

const Item = ({ icon: Icon, number, title, isLoading, href, className }: ItemProps) => {
	return (
		<Link
			to={href}
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
