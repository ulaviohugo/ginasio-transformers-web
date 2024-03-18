import React from 'react'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { CashRegister, Home, Login, NotFound, Employees, Payment } from '@/presentation/pages'
import { MenuUtils } from '@/utils'
import { MakeAthlete } from '../factories/pages'
import { Equipments } from '@/presentation/pages/equipments'
import { Gyms } from '@/presentation/pages/gyms'

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
				<Route
					path={menu.FINANCES}
					element={<Navigate to={MenuUtils.FRONT.TUITION_FEES} replace={true} />}
				/>
				<Route path={menu.CASH_REGISTER} element={<CashRegister />} />
				<Route path={menu.TUITION_FEES} element={<Payment />} />
				<Route path={menu.EQUIPMENTS} element={<Equipments />} />
				<Route path={menu.GYM} element={<Gyms />} />
				<Route path={menu.EMPLOYEES} element={<Employees />} />
				<Route path={'/*'} element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
