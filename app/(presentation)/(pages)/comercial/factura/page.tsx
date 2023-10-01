'use client'

import { useEffect, useState } from 'react'

import { Layout, LayoutBody, SubMenu } from '@/(presentation)/components'
import { BillingUtils, SubmenuUtils } from '@/utils'
import { mockBilling } from '@/test/model/mocks'

export default function Apolice() {
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
				<SubMenu submenus={SubmenuUtils.commercial} />
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
