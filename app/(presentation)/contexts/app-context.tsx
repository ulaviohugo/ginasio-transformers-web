'use client'

import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from '../redux'
import { LocationProvider } from '.'

type Props = {
	children: ReactNode
}

export function AppProvider({ children }: Props) {
	return (
		<>
			<Toaster position="top-center" toastOptions={{ duration: 6000 }} />
			<Provider store={store}>
				<LocationProvider>{children}</LocationProvider>
			</Provider>
		</>
	)
}
