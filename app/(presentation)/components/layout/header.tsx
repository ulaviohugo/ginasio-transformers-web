'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ElementType, useState } from 'react'
import {
	IconHome,
	IconProduct,
	IconSignout,
	IconUser,
	Logo,
	Spinner
} from '@/(presentation)/components'
import { setCurrentAccountAdapter } from '@/main/adapters'
import { StringUtils } from '@/utils'
import { useAuth } from '@/(presentation)/hooks'

export function Header() {
	const user = useAuth()
	const [isLoading, setIsLoading] = useState(false)
	const handleSignout = async () => {
		setIsLoading(true)
		setCurrentAccountAdapter(null)
	}
	const path = usePathname()
	return (
		<header className=" text-gray-200 h-screen">
			<nav className="flex flex-col gap-4 py-4 items-center h-full">
				<Logo />
				<ul className="flex flex-col">
					<Item active={path == '/'} link={'/'} text="Dashboard" icon={IconHome} />
					<Item
						active={path.indexOf('/comercial') >= 0}
						link={'/comercial'}
						text="Comercial"
						icon={IconProduct}
					/>
					<Item
						active={path.indexOf('/rh') >= 0}
						link={'/rh'}
						text="RH"
						icon={IconUser}
					/>
				</ul>
				<div className="flex flex-col gap-2 mt-auto px-2">
					<div className="flex items-center gap-1">
						<div className="border rounded-full p-1">
							{user.photo ? (
								<Image src={user.photo} width={25} height={25} alt="Foto" />
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
				href={link}
				className={`flex items-center gap-1 px-2 py-1 rounded-l-xl
				${active ? 'bg-gray-200 text-primary' : 'hover:bg-black hover:bg-opacity-20'}
				  transition-all duration-200 ease-in-out`}
			>
				<Icon /> {text}
			</Link>
		</li>
	)
}
