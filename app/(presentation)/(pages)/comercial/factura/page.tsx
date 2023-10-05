'use client'

import { useEffect, useState } from 'react'

import { Layout, LayoutBody, SubMenu } from '@/(presentation)/components'
import { BillingUtils, SubmenuUtils } from '@/utils'
import { mockBilling } from '@/test/model/mocks'
import { useAuth } from '@/(presentation)/hooks'
import { useSelector } from 'react-redux'

export default function Apolice() {
	const user = useSelector(useAuth())
	const isAdmin = user?.role == 'Admin'

	const [pdfData, setPdfData] = useState<string | null>(null)

	const billing = mockBilling()

	useEffect(() => {
		generatePDF()
	}, [])

	const generatePDF = async () => {
		const pdfUrl = await BillingUtils.build(billing)

		setPdfData(pdfUrl)
	}

	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={SubmenuUtils.commercial({ role: user.role })} />
				{pdfData && (
					<>
						<iframe
							title="PDF Preview"
							width="100%"
							height="700px"
							src={`${pdfData}`}
							className="mt-4"
						/>
					</>
				)}
			</LayoutBody>
		</Layout>
	)
}
