import React, { ReactNode } from 'react'

type FilterContainerProps = {
	children: ReactNode
}

export function ListContainer({ children }: FilterContainerProps) {
	return <div className="relative max-h-36 overflow-auto">{children}</div>
}
