import { ReactNode } from 'react'

type TitleProps = {
	title: ReactNode
}

export function Title({ title }: TitleProps) {
	return <h1 className="flex items-center gap-1 text-xl font-semibold">{title}</h1>
}
