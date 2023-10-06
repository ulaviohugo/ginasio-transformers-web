import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [
		laravel({
			input: ['resources/app/main/app.tsx'],
			refresh: true
		}),
		react()
	],
	resolve: {
		alias: {
			'@': '/resources/app' // Caminho para a pasta de recursos do seu projeto
		}
	}
})
