import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { CashRegister, Home, Login, NotFound, Employees } from '@/presentation/pages'
import { MenuUtils } from '@/utils'
import { MakeAthlete } from '../factories/pages'

export function AppRoutes() {
	const menu = MenuUtils.FRONT
	return (
		<BrowserRouter>
			<Routes>
				<Route path={menu.LOGIN} element={<Login />} />

				<Route path={menu.HOME} element={<Home />} />
				<Route path={menu.ATHLETES} element={<MakeAthlete />} />
				<Route path={menu.EMPLOYEES} element={<Employees />} />
				<Route path={menu.CASH_REGISTER} element={<CashRegister />} />
				<Route path={'/*'} element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
