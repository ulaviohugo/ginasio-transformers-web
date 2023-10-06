import React from 'react'
import { createRoot } from 'react-dom/client'

import '../../css/app.css'
import { AppRoutes } from '@/main/routes'
import { AppProvider } from '@/presentation/contexts'

function App(): React.ReactElement {
	return (
		<AppProvider>
			<AppRoutes />
		</AppProvider>
	)
}
const container = document.getElementById('app')
if (container) createRoot(container).render(<App />)
