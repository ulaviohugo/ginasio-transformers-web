import { ReactNode } from 'react'

type NoDataProps = {
	data?: ReactNode
}

export function NoData({ data = 'Nenhum registo de momento' }: NoDataProps) {
	return <div>{data}</div>
}
