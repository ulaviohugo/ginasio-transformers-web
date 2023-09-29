'use client'

import { PDFDocument } from 'pdf-lib'
import { useEffect, useState } from 'react'

import { Layout, LayoutBody, SubMenu } from '@/(presentation)/components'
import {
	ApolicePage1Utils,
	ApolicePage2Utils,
	ApolicePage3Utils,
	ApolicePage4Utils,
	SubmenuUtils
} from '@/utils'
import { InsuredModel } from '@/domain/models'

export default function Apolice() {
	const [pdfData, setPdfData] = useState<string | null>(null)
	useEffect(() => {
		generatePDF()
	}, [])

	const generatePDF = async () => {
		const currentDate = new Date()

		const insured: InsuredModel = {
			name: 'Josué Agostinho Cabral Simões',
			gender: 'Masculino',
			maritalStatus: 'Solteiro (a)',
			occupation: 'Engenheiro Informático',
			dependents: 4,
			cardName: 'Josué Simões',
			birthday: currentDate,
			documentNumber: '001322548LA035',
			documentIssueDate: currentDate,
			nif: '001322548LA035',
			address: 'Coreia',
			neighborhood: 'Ingombotas',
			province: 'Luanda',
			municipality: 'Luanda',
			email: 'joel@gmail.com',
			phone: '923 123 123',
			comercial: 'Paulo Vieira',
			enrollmentDate: currentDate,
			lastAutoRenewDate: currentDate,
			plan: 'Empresarial',
			policy: 'Ouro',
			paymentFrequency: 'Semestral',
			paymentMethod: 'TPA'
		}
		const pdfDoc = await PDFDocument.create()
		pdfDoc.setTitle('Samuel')
		const pageHeight = 842
		const pageWidth = 595
		const pageSize = [pageWidth, pageHeight] as any

		// PAGE 1
		const page = pdfDoc.addPage(pageSize)
		await ApolicePage1Utils.build({ page, pdfDoc, insured })

		// PAGE 2
		const page2 = pdfDoc.addPage(pageSize)
		await ApolicePage2Utils.build({ page: page2, pdfDoc, insured })

		// PAGE 3
		const page3 = pdfDoc.addPage(pageSize)
		await ApolicePage3Utils.build({ page: page3, pdfDoc, insured })

		// PAGE 4
		const page4 = pdfDoc.addPage(pageSize)
		await ApolicePage4Utils.build({ page: page4, pdfDoc })

		const pdfBytes = await pdfDoc.save()
		const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })
		const pdfUrl = URL.createObjectURL(pdfBlob)

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
