import React from 'react'
import { Link } from 'react-router-dom'
import { ElementType, useState } from 'react'
import {
	IconAthlete,
	IconHome,
	IconProduct,
	IconSignout,
	IconUser,
	Logo,
	Spinner,
	IconDumbbell,
	IconDepartment,
	IconLesson
} from '@/presentation/components'
import { setCurrentAccountAdapter } from '@/main/adapters'
import { MenuUtils, StringUtils } from '@/utils'
import { useAuth } from '@/presentation/hooks'
import { useSelector } from 'react-redux'

export function Header() {
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	const [isLoading, setIsLoading] = useState(false)
	const handleSignout = async () => {
		setIsLoading(true)
		setCurrentAccountAdapter(null)
	}
	const path = location.pathname
	return (
		<header className="bg-primary text-gray-200 h-screen">
			<nav className="flex flex-col gap-4 py-4 items-center h-full">
				<Logo />
				<ul className="flex flex-col">
					<Item active={path == '/'} link={'/'} text="Dashboard" icon={IconHome} />
					<Item
						active={path.indexOf('/atleta') >= 0}
						link={MenuUtils.FRONT.ATHLETES}
						text="Atletas"
						icon={IconAthlete}
					/>
					<Item
						active={path.indexOf('/aula') >= 0}
						link={MenuUtils.FRONT.LESSONS}
						text="Aulas"
						icon={IconLesson}
					/>
					<Item
						active={path.indexOf(MenuUtils.FRONT.FINANCES) >= 0}
						link={MenuUtils.FRONT.FINANCES}
						text="Finanças"
						icon={IconProduct}
					/>
					<Item
						active={path.indexOf(MenuUtils.FRONT.EQUIPMENTS) >= 0}
						link={MenuUtils.FRONT.EQUIPMENTS}
						text="Materiais"
						icon={IconDumbbell}
					/>
					<Item
						active={path.indexOf(MenuUtils.FRONT.GYMS) >= 0}
						link={MenuUtils.FRONT.GYMS}
						text="Filiais"
						icon={IconDepartment}
					/>
					
					{isAdmin && (
						<Item
							active={path.indexOf('/funcionarios') >= 0}
							link={MenuUtils.FRONT.EMPLOYEES}
							text="Funcionários"
							icon={IconUser}
						/>
					)}
				</ul>
				<div className="flex flex-col gap-2 mt-auto px-2">
					<div className="flex items-center gap-1">
						<div className="border rounded-full p-1">
							{user.photo ? (
								<img src={user.photo} width={30}
								height={40}
								className="rounded-full object-cover aspect-square" alt="Foto" />
							) : (
								<IconUser size={25} />
							)}
						</div>
						<span>{StringUtils.getFirstWord(user.name)}</span>
					</div>
					<button
						className="btn bg-gray-800 hover:bg-white hover:text-primary border hover:justify-between transition-all duration-300 ease-out"
						onClick={handleSignout}
					>
						{isLoading ? (
							<>
								Saindo <Spinner />
							</>
						) : (
							<>
								Sair <IconSignout />
							</>
						)}
					</button>
				</div>
			</nav>
		</header>
	)
}

type ItemProps = {
	text: string
	link: string
	active: boolean
	icon: ElementType
}
const Item = ({ active, link, text, icon: Icon }: ItemProps) => {
	return (
		<li className="w-32">
			<Link
				to={link}
				className={`flex items-center gap-1 px-2 py-1 rounded-l-xl
				${active ? 'bg-gray-200 text-primary' : 'hover:bg-black hover:bg-opacity-20'}
				  transition-all duration-200 ease-in-out`}
			>
				<Icon /> {text}
			</Link>
		</li>
	)
}
