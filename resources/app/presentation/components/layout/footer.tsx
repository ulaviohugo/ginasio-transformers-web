import React from 'react'

export function Footer() {
	return (
		<footer className="text-xs flex justify-between">
			<div>
				Copyright © {new Date().getFullYear()} Ginásio Transformers. Todos os direitos
				reservados.
			</div>
			{/* <div>
				Desenvolvido por{' '}
				<a
					href="//samuelfreitas-ao.github.io"
					target="_blank"
					className="text-sky-600 font-semibold hover:underline"
					rel="noreferrer"
				>
					Samuel Freitas
				</a>
			</div> */}
		</footer>
	)
}
