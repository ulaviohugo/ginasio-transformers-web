import React from 'react'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { CashRegister, Home, Login, NotFound, Employees, Payment ,Product ,Sale, Suppliers} from '@/presentation/pages'
import { MenuUtils } from '@/utils'
import { MakeAthlete } from '../factories/pages'
import { Equipments } from '@/presentation/pages/equipments'

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
				<Route
					path={menu.FINANCES}
					element={<Navigate to={MenuUtils.FRONT.SALE} replace={true} />}
				/>
				<Route
					path={menu.FINANCES}
					element={<Navigate to={MenuUtils.FRONT.SUPPLIERS} replace={true} />}
				/>
				<Route
					path={menu.FINANCES}
					element={<Navigate to={MenuUtils.FRONT.STOCK} replace={true} />}
				/>
				<Route path={menu.CASH_REGISTER} element={<CashRegister />} />
				<Route path={menu.TUITION_FEES} element={<Payment />} />
				<Route path={menu.STOCK} element={<Product />} 	/>
				<Route path={menu.SALE} element={<Sale />} 	/>
				<Route path={menu.SUPPLIERS} element={<Suppliers />} 	/>
				<Route path={menu.EQUIPMENTS} element={<Equipments />} />
				<Route path={menu.EMPLOYEES} element={<Employees />} />
				<Route path={'/*'} element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
