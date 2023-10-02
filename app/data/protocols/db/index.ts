export type QueryParams<T = any> = {
	filter?: { [key in keyof T]?: T[key] }
}

export * from './category-repositories'
export * from './customer-repositories'
export * from './employee-repositories'
export * from './employee-presence-repositories'
export * from './insured-repositories'
export * from './notification-repositories'
export * from './product-repositories'
export * from './purchase-repositories'
export * from './sale-repositories'
export * from './supplier-repositories'
export * from './supplier-product-repositories'
