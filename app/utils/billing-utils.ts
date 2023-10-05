import { PDFDocument } from 'pdf-lib'
import { ApoliceStyle, DateUtils, NumberUtils } from '.'
import { LogoBase64 } from '@/(presentation)/components'
import { BillingModel } from '@/domain/models'

export class BillingUtils {
	static async build(billing: BillingModel) {
		const currencyDesc = 'Akz'
		const pdfDoc = await PDFDocument.create()
		pdfDoc.setTitle('Samuel')
		const pageHeight = 595
		const pageWidth = 842
		const pageSize = [pageWidth, pageHeight] as any
		const style = ApoliceStyle
		const padding = style.defaultPadding

		const page = pdfDoc.addPage(pageSize)
		const imageLogo = await pdfDoc.embedPng(LogoBase64)
		page.drawImage(imageLogo, {
			x: padding,
			y: pageHeight - 150,
			width: 140,
			height: 108
		})

		page.drawText(`FACTURA Nº ${billing.number}`, {
			x: pageWidth - 300,
			y: pageHeight - 40,
			size: 16,
			font: await pdfDoc.embedFont(style.fontBold)
		})

		//Personal info
		page.drawText(`UTENTE`, {
			x: pageWidth - 300,
			y: pageHeight - 80,
			size: style.fontSizeTitle,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(
			`.................................................................................`,
			{
				x: pageWidth - 300,
				y: pageHeight - 85,
				size: 8,
				color: style.borderColorBlack
			}
		)
		page.drawText(`Nome: ${billing.insured.name}`, {
			x: pageWidth - 300,
			y: pageHeight - 100,
			size: style.fontSizeTitle
		})
		page.drawText(`Nº de documento: ${billing.insured.documentNumber}`, {
			x: pageWidth - 300,
			y: pageHeight - 116,
			size: style.fontSizeTitle
		})
		page.drawText(`Telefone: ${NumberUtils.format(billing?.insured?.phone || '')}`, {
			x: pageWidth - 300,
			y: pageHeight - 132,
			size: style.fontSizeTitle
		})
		page.drawText(`Telefone 2: ${NumberUtils.format(billing?.insured?.phone2 || '')}`, {
			x: pageWidth - 300,
			y: pageHeight - 148,
			size: style.fontSizeTitle
		})
		page.drawText(`E-mail: ${billing.insured.email}`, {
			x: pageWidth - 300,
			y: pageHeight - 164,
			size: style.fontSizeTitle
		})

		//Consult info
		page.drawText(`ATENDENTE`, {
			x: padding,
			y: pageHeight - 212,
			size: style.fontSizeTitle,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(
			`.................................................................................`,
			{
				x: padding,
				y: pageHeight - 216,
				size: 8
			}
		)
		page.drawText(`${billing.employee.name}`, {
			x: padding,
			y: pageHeight - 232,
			size: style.fontSizeTitle
		})

		page.drawText(`Nº DE IDENTIFICAÇÃO`, {
			x: padding + 195,
			y: pageHeight - 212,
			size: style.fontSizeTitle,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(`...........................................................`, {
			x: padding + 195,
			y: pageHeight - 216,
			size: 8
		})
		page.drawText(`${billing.id}`, {
			x: padding + 195,
			y: pageHeight - 232,
			size: style.fontSizeTitle
		})

		page.drawText(`DATA`, {
			x: padding + 345,
			y: pageHeight - 212,
			size: style.fontSizeTitle,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(`............................`, {
			x: padding + 345,
			y: pageHeight - 216,
			size: 8
		})
		page.drawText(`${DateUtils.getDatePt(billing.createdAt)}`, {
			x: padding + 345,
			y: pageHeight - 232,
			size: style.fontSizeTitle
		})

		page.drawText(`CONSULTA EFECTUADA`, {
			x: padding + 420,
			y: pageHeight - 212,
			size: style.fontSizeTitle,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(
			`.......................................................................`,
			{
				x: padding + 420,
				y: pageHeight - 216,
				size: 8
			}
		)
		page.drawText(billing.consultationType, {
			x: padding + 420,
			y: pageHeight - 232,
			size: style.fontSizeTitle
		})

		page.drawText(`CO-SEGURO SOCIAL`, {
			x: padding + 590,
			y: pageHeight - 212,
			size: style.fontSizeTitle,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(
			`.......................................................................`,
			{
				x: padding + 590,
				y: pageHeight - 216,
				size: 8
			}
		)
		page.drawText(billing.socialCoInsurance, {
			x: padding + 590,
			y: pageHeight - 232,
			size: style.fontSizeTitle
		})

		page.drawText(`TIPO DE SEGURO`, {
			x: padding,
			y: pageHeight - 264,
			size: style.fontSizeTitle,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(
			`.................................................................................`,
			{
				x: padding,
				y: pageHeight - 268,
				size: 8
			}
		)
		page.drawText(`${billing?.insured?.policy || ''}`, {
			x: padding,
			y: pageHeight - 284,
			size: style.fontSizeTitle
		})

		page.drawText(`VALOR DA CO-PARTICIPAÇÃO`, {
			x: padding + 195,
			y: pageHeight - 264,
			size: style.fontSizeTitle,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(
			`.................................................................................`,
			{
				x: padding + 195,
				y: pageHeight - 268,
				size: 8
			}
		)
		page.drawText(
			`${NumberUtils.formatCurrency(
				billing?.insured?.copaymentAmount || 0
			)} ${currencyDesc}`,
			{
				x: padding + 195,
				y: pageHeight - 284,
				size: style.fontSizeTitle
			}
		)

		page.drawText(`TIPO DE CONSULTA`, {
			x: padding + 390,
			y: pageHeight - 264,
			size: style.fontSizeTitle,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(
			`.................................................................................`,
			{
				x: padding + 390,
				y: pageHeight - 268,
				size: 8
			}
		)
		page.drawText(`${billing.consultationService}`, {
			x: padding + 390,
			y: pageHeight - 284,
			size: style.fontSizeTitle
		})

		const dividerPage =
			'...............................................................................................................................................................................................................................................................    .......................................    ....................................'

		for (let i = 0; i < 5; i++) {
			page.drawText(dividerPage, {
				x: padding,
				y: pageHeight - (i + 24) * 3 - 230,
				size: 8
			})
		}
		const dividerQuantity = '......................................',
			dividerDescription = `..............................................................................................................................................................`,
			dividerUnitPrice = `...............................................`,
			dividerDiscount = `....................................`,
			dividerTotal = `..........................................`
		page.drawText(`QUANTIDADE`, {
			x: padding,
			y: pageHeight - 335,
			size: style.fontSizeTitle,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(dividerQuantity, {
			x: padding,
			y: pageHeight - 340,
			size: 8
		})

		page.drawText(`DESCRIÇÃO`, {
			x: padding + 95,
			y: pageHeight - 335,
			size: style.fontSizeTitle,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(dividerDescription, {
			x: padding + 95,
			y: pageHeight - 340,
			size: 8
		})
		page.drawText(`VALOR UNITÁRIO`, {
			x: padding + 454,
			y: pageHeight - 335,
			size: style.fontSizeTitle,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(dividerUnitPrice, {
			x: padding + 454,
			y: pageHeight - 340,
			size: 8
		})
		page.drawText(`DESCONTOS`, {
			x: padding + 566,
			y: pageHeight - 335,
			size: style.fontSizeTitle,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(dividerDiscount, {
			x: padding + 566,
			y: pageHeight - 340,
			size: 8
		})
		page.drawText(`TOTAL`, {
			x: padding + 656,
			y: pageHeight - 335,
			size: style.fontSizeTitle,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(dividerTotal, {
			x: padding + 656,
			y: pageHeight - 340,
			size: 8
		})

		const countServices = billing.services.length
		for (let i = 0; i < countServices; i++) {
			const service = billing.services[i]
			let y = pageHeight - (i + 5.4) * 15 - 270
			const isLast = i == countServices - 1

			page.drawText(String(service.quantity), {
				x: padding,
				y,
				size: style.fontSizeTitle
			})
			if (!isLast) {
				page.drawText(dividerQuantity, {
					x: padding,
					y: y - 3,
					size: 8,
					color: style.borderColor
				})
			}
			page.drawText(service.description, {
				x: padding + 95,
				y,
				size: style.fontSizeTitle
			})
			if (!isLast) {
				page.drawText(dividerDescription, {
					x: padding + 95,
					y: y - 3,
					size: 8,
					color: style.borderColor
				})
			}
			page.drawText(`${NumberUtils.formatCurrency(service.unitPrice)} ${currencyDesc}`, {
				x: padding + 454,
				y,
				size: style.fontSizeTitle
			})
			if (!isLast) {
				page.drawText(dividerUnitPrice, {
					x: padding + 454,
					y: y - 3,
					size: 8,
					color: style.borderColor
				})
			}
			page.drawText(`${NumberUtils.formatCurrency(service.discount)} ${currencyDesc}`, {
				x: padding + 566,
				y,
				size: style.fontSizeTitle
			})
			if (!isLast) {
				page.drawText(dividerDiscount, {
					x: padding + 566,
					y: y - 3,
					size: 8,
					color: style.borderColor
				})
			}
			page.drawText(
				`${NumberUtils.formatCurrency(
					service.unitPrice * service.quantity
				)} ${currencyDesc}`,
				{
					x: padding + 656,
					y,
					size: style.fontSizeTitle
				}
			)
			if (!isLast) {
				page.drawText(dividerTotal, {
					x: padding + 656,
					y: y - 3,
					size: 8,
					color: style.borderColor
				})
			}

			if (isLast) {
				y = y - 25
				page.drawText(dividerPage, {
					x: padding,
					y: y + 16,
					size: 8
				})
				const subTotal = billing.services.reduce(
					(prev, { quantity, unitPrice }) => prev + quantity * unitPrice,
					0
				)

				const total = billing.services.reduce(
					(prev, { quantity, unitPrice, discount }) =>
						prev + (quantity * unitPrice - discount),
					0
				)

				const totalDiscount = billing.services.reduce(
					(prev, { discount }) => prev + discount,
					0
				)

				page.drawText('Subtotal', {
					x: padding + 500,
					y,
					size: style.fontSizeTitle,
					font: await pdfDoc.embedFont(style.fontBold)
				})
				page.drawText(`${NumberUtils.formatCurrency(subTotal)} ${currencyDesc}`, {
					x: padding + 656,
					y,
					size: style.fontSizeTitle
				})

				page.drawText('Taxa de imposto IVA', {
					x: padding + 500,
					y: y - 15,
					size: style.fontSizeTitle
				})
				page.drawText('0%', {
					x: padding + 656,
					y: y - 15,
					size: style.fontSizeTitle
				})

				page.drawText('Imposto', {
					x: padding + 500,
					y: y - 30,
					size: style.fontSizeTitle,
					font: await pdfDoc.embedFont(style.fontBold)
				})
				page.drawText('0,00', {
					x: padding + 656,
					y: y - 30,
					size: style.fontSizeTitle
				})

				page.drawText('Descontos', {
					x: padding + 500,
					y: y - 45,
					size: style.fontSizeTitle
				})
				page.drawText(`${NumberUtils.formatCurrency(totalDiscount)} ${currencyDesc}`, {
					x: padding + 656,
					y: y - 45,
					size: style.fontSizeTitle
				})

				page.drawText('Total Geral', {
					x: padding + 500,
					y: y - 60,
					size: style.fontSizeTitle,
					font: await pdfDoc.embedFont(style.fontBold)
				})
				page.drawText(`${NumberUtils.formatCurrency(total)} ${currencyDesc}`, {
					x: padding + 656,
					y: y - 60,
					size: style.fontSizeTitle,
					font: await pdfDoc.embedFont(style.fontBold)
				})

				for (let i = 0; i < 5; i++) {
					page.drawText(dividerPage, {
						x: padding,
						y: y - i * 3 - 66,
						size: 8
					})
				}
			}
		}

		page.drawText('TERMOS DO ACORDO', {
			x: padding,
			y: pageHeight - 530,
			size: style.fontSizeTitle
		})
		page.drawText(dividerPage, {
			x: padding,
			y: pageHeight - 534,
			size: 8
		})

		page.drawText('Introduza aqui os termos específicos do acordo.', {
			x: padding,
			y: pageHeight - 565,
			size: style.fontSizeTitle
		})
		page.drawText('Também pode utilizar esta linha', {
			x: padding,
			y: pageHeight - 580,
			size: style.fontSizeTitle
		})

		const pdfBytes = await pdfDoc.save()
		const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })
		const pdfUrl = URL.createObjectURL(pdfBlob)
		return pdfUrl
	}
}
