import { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import NextAuthSessionProvider from './(presentation)/contexts/next-auth-session'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Sistema de facturação'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NextAuthSessionProvider>{children}</NextAuthSessionProvider>
			</body>
		</html>
	)
}
