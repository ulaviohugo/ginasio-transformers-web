'use client'
import { ReactNode, useEffect } from 'react'
import { Footer, Header, TopBar } from '.'

type LayoutProps = {
	children: ReactNode
}

export function Layout({ children }: LayoutProps) {
	return (
		<div className="flex">
			<Header />
			<div className="flex-1 flex flex-col px-4 pb-4 gap-4 bg-gray-200">
				<TopBar />
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
				className="flex flex-col overflow-auto h-full w-full p-1"
				style={{ maxHeight: 'calc(100vh - 144px)', maxWidth: 'calc(100vw - 192px)' }}
			>
				{children}
			</div>
		</div>
	)
}
