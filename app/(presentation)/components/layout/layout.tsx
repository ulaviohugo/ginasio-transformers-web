'use client'
import { ReactNode, useEffect } from 'react'
import { Footer, Header } from '.'

type LayoutProps = {
	children: ReactNode
}

export function Layout({ children }: LayoutProps) {
	return (
		<div className="flex">
			<Header />
			<div className="flex-1 flex flex-col px-4 pb-4 gap-4 bg-gray-200">
				<nav className="flex bg-white -mx-4 px-4">
					<ul className="ml-auto">
						<li>Nav</li>
					</ul>
				</nav>
				<main className="flex-1 flex">{children}</main>
				<Footer />
			</div>
		</div>
	)
}

export function LayoutBody({ children }: LayoutProps) {
	return (
		<div className="flex-1 bg-white shadow-lg rounded-xl p-4">
			<div
				className="flex flex-col overflow-auto h-full p-1"
				style={{ maxHeight: 'calc(100vh - 96px)' }}
			>
				{children}
			</div>
		</div>
	)
}
