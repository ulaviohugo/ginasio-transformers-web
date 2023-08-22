'use client'

import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from '../redux'
import { AuthProvider, LocationProvider } from '.'

type Props = {
	children: ReactNode
}

export function AppProvider({ children }: Props) {
	return (
		<>
			<Toaster position="top-center" toastOptions={{ duration: 6000 }} />
			<Provider store={store}>
				<AuthProvider>
					<LocationProvider>{children}</LocationProvider>
				</AuthProvider>
			</Provider>
		</>
	)
}
