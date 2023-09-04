import { ElementType, ReactNode } from 'react'

type TitleProps = {
	title: ReactNode
	icon?: ElementType
}

export function Title({ title, icon: Icon }: TitleProps) {
	return (
		<h1 className="flex items-center gap-1 text-xl font-semibold">
			{Icon && <Icon />}
			{title}
		</h1>
	)
}
