'use client'

import { StringUtils } from '@/app/utils'
import { IconNotification, IconUser } from '..'
import { useAuth } from '../../hooks'

type TopBarProps = {}

export function TopBar(props: TopBarProps) {
	const user = useAuth()
	return (
		<nav className="flex bg-white -mx-4 px-4">
			<ul className="ml-auto flex items-center gap-2 py-2">
				<li className="flex items-center gap-1">
					<span className="flex items-center border-2 rounded-full p-1">
						<IconUser />
					</span>
					{StringUtils.getFirstAndLastWord(user.name)}
				</li>
				<li>
					<IconNotification />
				</li>
			</ul>
		</nav>
	)
}
