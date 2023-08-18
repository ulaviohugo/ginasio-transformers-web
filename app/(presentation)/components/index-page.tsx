import React, { ReactNode } from 'react'

type IndexPageProps = { children: ReactNode }

export function IndexPage({ children }: IndexPageProps) {
	return (
		<div className="flex-1 flex flex-col justify-center items-center text-3xl">
			<span className="flex gap-2 items-center">{children}</span>
		</div>
	)
}
