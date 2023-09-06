'use client'

import { ReactNode, createContext, useEffect } from 'react'
import { useAuth } from '../hooks'
import { usePathname } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { addAuthStore } from '../redux'
import { getCurrentAccountAdapter } from '@/main/adapters'

const AuthContext = createContext({})

type AuthProviderProps = {
	children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const auth = useAuth()
	const path = usePathname()
	const dispatch = useDispatch()

	useEffect(() => {
		const id = setInterval(() => {
			const account = getCurrentAccountAdapter()
			if (!account?.user && path.indexOf('/login') < 0) {
				location.replace('/login')
			} else if (account?.user && path.indexOf('/login') >= 0) {
				location.replace('/')
			} else {
				if (!auth?.id) dispatch(addAuthStore(account?.user as any))
			}
		}, 1000)

		return () => {
			clearInterval(id)
		}
	}, [auth?.id, dispatch, path])

	if (!auth?.id && path.indexOf('/login') < 0) return <></>

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
