import React, { useEffect, useState } from 'react'

import { Layout, LayoutBody, SubMenu } from '@/presentation/components'
import { BillingUtils, MenuUtils } from '@/utils'
import { mockBilling } from '@/test/model/mocks'
import { useAuth } from '@/presentation/hooks'
import { useSelector } from 'react-redux'

export function Billing() {
	const user = useSelector(useAuth())

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
				<SubMenu submenus={MenuUtils.commercialMenuItens({ role: user.role })} />
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
