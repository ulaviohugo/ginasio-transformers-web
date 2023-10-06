/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./resources/**/*.{tsx,blade.php}'],
	theme: {
		extend: {
			colors: {
				primary: '#525659',
				bg: '#F8F9FE'
			},
			fontFamily: {
				exo: ['Exo', 'sans']
			}
		}
	},
	plugins: []
}
