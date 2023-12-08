import React, { useEffect, useRef } from 'react'
import { Modal, ModalBody } from '../modal'

type SalePdfViewerProps = {
	pdfUrl: string
}

export function ProductionSalePdfViewer({ pdfUrl }: SalePdfViewerProps) {
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
	return (
		<Modal show>
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
