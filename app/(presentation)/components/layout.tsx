'use client'
import { ReactNode } from 'react'
import { Footer, Header } from '.'

type LayoutProps = {
	children: ReactNode
}

export function Layout({ children }: LayoutProps) {
	// const user = await getCurrentUser()
	// return <>{JSON.stringify(user)}</>
	return (
		<div className="flex">
			<Header />
			<div className="flex-1 flex flex-col p-4 gap-4 bg-gray-50">
				<main className="flex-1 flex">{children}</main>
				<Footer />
			</div>
		</div>
	)
}

export function LayoutBody({ children }: LayoutProps) {
	return (
		<div className="flex-1 bg-white shadow-lg rounded-xl p-4">
			<div className="overflow-auto h-full" style={{ maxHeight: 'calc(100vh - 96px)' }}>
				{children}
			</div>
		</div>
	)
}
