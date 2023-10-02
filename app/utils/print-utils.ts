import { InsuredModel } from '@/domain/models'
import { PDFDocument } from 'pdf-lib'
import {
	ApolicePage1Utils,
	ApolicePage2Utils,
	ApolicePage3Utils,
	ApolicePage4Utils
} from '.'

export class PrintUtils {
	static async printPolicy(insured: InsuredModel) {
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
		window.open(pdfUrl, '_blank')
	}
}
