'use client'

import { HttpStatusCode } from '@/data/protocols/http'
import { makeApiUrl, makeFetchHttpClient } from '@/main/factories/http'
import { ReactNode, createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLocationStore } from '@/(presentation)/redux'
import { useAuth } from '@/(presentation)/hooks'

const LocationContext = createContext({})

type LocationProviderProps = {
	children: ReactNode
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
	const dispatch = useDispatch()
	const auth = useSelector(useAuth())

	useEffect(() => {
		if (auth) {
			makeFetchHttpClient()
				.request({ method: 'get', url: makeApiUrl('/locations') })
				.then((response) => {
					console.log({ response })

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
