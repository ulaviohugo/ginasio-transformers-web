import React, { useEffect, useRef } from 'react'
import { Modal, ModalBody, ModalTitle } from './modal'

type SalePdfViewerProps = {
	pdfUrl: string
	onClose: () => void
	title?: string
}

export function PdfViewer({
	pdfUrl,
	onClose,
	title = 'Pré-visualização de PDF'
}: SalePdfViewerProps) {
	const iframeRef = useRef<HTMLIFrameElement>(null)

	useEffect(() => {
		// Quando o componente for montado ou quando o pdfUrl mudar, atualize o iframe.
		if (iframeRef.current && pdfUrl) {
			const iframeDocument = iframeRef.current

			if (iframeDocument) {
				iframeDocument.src = pdfUrl
			}
		}
	}, [pdfUrl])

	const handleClose = () => {
		onClose()
	}

	if (!pdfUrl) return <></>

	return (
		<Modal show={!!pdfUrl} onClose={handleClose}>
			<ModalTitle>{title}</ModalTitle>
			<ModalBody>
				<iframe
					ref={iframeRef}
					title="PDF Viewer"
					width="100%"
					style={{ height: 'calc(100vh - 100px)' }}
				/>
			</ModalBody>
		</Modal>
	)
}
