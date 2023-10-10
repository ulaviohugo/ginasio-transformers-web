import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import {
	CashRegister,
	Categories,
	Comercial,
	Customers,
	Home,
	Login,
	NotFound,
	Products,
	Sales,
	Stock,
	Suppliers,
	EmployeePresence,
	HumanResource,
	Employees,
	EmployeeSalaryReceipt,
	ProductionBudgets
} from '@/presentation/pages'
import { MenuUtils } from '@/utils'

export function AppRoutes() {
	const menu = MenuUtils.FRONT
	return (
		<BrowserRouter>
			<Routes>
				<Route path={menu.LOGIN} element={<Login />} />

				<Route path={menu.HOME} element={<Home />} />
				<Route path={menu.COMERCIAL} element={<Comercial />} />
				<Route path={menu.HR} element={<HumanResource />} />
				<Route path={menu.EMPLOYEES} element={<Employees />} />
				<Route path={menu.EMPLOYEE_PRESENCES} element={<EmployeePresence />} />
				<Route path={menu.EMPLOYEE_SALARY_RECEIPT} element={<EmployeeSalaryReceipt />} />
				<Route path={menu.CUSTOMERS} element={<Customers />} />
				<Route path={menu.STOCK} element={<Stock />} />
				<Route path={menu.SALES} element={<Sales />} />
				<Route path={menu.CATEGORIES} element={<Categories />} />
				<Route path={menu.CASH_REGISTER} element={<CashRegister />} />
				<Route path={menu.SUPPLIERS} element={<Suppliers />} />
				<Route path={menu.PRODUCTS} element={<Products />} />
				<Route path={menu.PRODUCT_BUDGETS} element={<ProductionBudgets />} />
				<Route path={'/*'} element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
