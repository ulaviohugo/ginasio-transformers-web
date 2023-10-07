import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Categories, Home, Login, NotFound } from '@/presentation/pages'

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={''} element={<Home />} />
				<Route path={'/login'} element={<Login />} />
				<Route path={'/comercial/categorias'} element={<Categories />} />
				<Route path={'/*'} element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
