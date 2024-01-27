/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./resources/**/*.{tsx,blade.php}'],
	theme: {
		extend: {
			colors: {
				primary: '#014A7F',
				bg: '#F8F9FE'
			},
			fontFamily: {
				exo: ['Exo', 'sans']
			}
		}
	},
	plugins: []
}
