'use client'

import { HttpStatusCode } from '@/app/data/protocols/http'
import { makeApiUrl, makeFetchHttpClient } from '@/app/main/factories/http'
import { ReactNode, createContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadLocationStore } from '../redux'
import { useAuth } from '../hooks'

const LocationContext = createContext({})

type LocationProviderProps = {
	children: ReactNode
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
	const dispatch = useDispatch()
	const auth = useAuth()

	useEffect(() => {
		if (auth) {
			makeFetchHttpClient()
				.request({ method: 'get', url: makeApiUrl('/locations') })
				.then((response) => {
					if (response.statusCode !== HttpStatusCode.ok) return
					dispatch(loadLocationStore(response.body))
				})
				.catch((error) => {
					console.log('Error', error.message)
				})
		}
	}, [auth])

	return <LocationContext.Provider value={{}}>{children}</LocationContext.Provider>
}
