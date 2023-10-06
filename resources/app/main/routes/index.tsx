import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Home, Login } from '@/presentation/pages'

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={''} element={<Home />} />
				<Route path={'/login'} element={<Login />} />
			</Routes>
		</BrowserRouter>
	)
}
