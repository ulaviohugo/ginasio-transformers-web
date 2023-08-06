'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const path = usePathname()
  return (
    <header className="bg-gray-600 text-gray-200 h-screen">
      <nav className="flex flex-col h-full">
        <ul className="flex flex-col">
          <Item active={path == '/'} link={'/'} text="Dashboard" />
          <Item
            active={path.indexOf('/comercial') >= 0}
            link={'/comercial'}
            text="Comercial"
          />
          <Item active={path.indexOf('/rh') >= 0} link={'/rh'} text="RH" />
          <Item
            active={path == '/admin'}
            link={'/admin'}
            text="Administrativo"
          />
        </ul>
        <div className="flex flex-col mt-auto p-2">
          <button className="flex justify-center border px-2 py-1 text-sm font-semibold rounded-md">
            Sair
          </button>
        </div>
      </nav>
    </header>
  )
}

type ItemProps = {
  text: string
  link: string
  active: boolean
}
const Item = ({ active, link, text }: ItemProps) => {
  return (
    <li>
      <Link
        href={link}
        className={`flex px-2 py-1 ${
          active && 'bg-gray-50 text-gray-500 rounded-l-xl'
        }`}
      >
        {text}
      </Link>
    </li>
  )
}
