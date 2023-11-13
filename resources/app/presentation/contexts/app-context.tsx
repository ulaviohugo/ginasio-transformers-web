import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from '@/presentation/redux'
import { AuthProvider, LocationProvider } from '.'
import {
	MakeCategoryEditor,
	MakeProductEditor,
	MakeSupplierEditor
} from '@/main/factories/components'

type Props = {
	children: ReactNode
}

export function AppProvider({ children }: Props) {
	return (
		<>
			<Toaster position="top-center" toastOptions={{ duration: 6000 }} />
			<Provider store={store}>
				<MakeProductEditor />
				<MakeCategoryEditor />
				<MakeSupplierEditor />
				<AuthProvider>
					<LocationProvider>{children}</LocationProvider>
				</AuthProvider>
			</Provider>
		</>
	)
}
