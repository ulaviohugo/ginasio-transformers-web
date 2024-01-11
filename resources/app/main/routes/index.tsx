import React from 'react'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
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
				<Route
					path={menu.FINANCES}
					element={<Navigate to={MenuUtils.FRONT.CASH_REGISTER} replace={true} />}
				/>
				<Route path={menu.CASH_REGISTER} element={<CashRegister />} />
				<Route path={menu.EMPLOYEES} element={<Employees />} />
				<Route path={'/*'} element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
