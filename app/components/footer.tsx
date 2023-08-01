import React from 'react'

export function Footer() {
  return (
    <footer className="text-xs flex justify-between">
      <div>Copyright © 2023 WO. Todos os direitos reservados.</div>
      <div>
        Desenvolvido por{' '}
        <a
          href="//samuelfreitas.vercel.app"
          target="_blank"
          className="text-sky-600 font-semibold hover:underline"
        >
          Samuel Freitas
        </a>
      </div>
    </footer>
  )
}
