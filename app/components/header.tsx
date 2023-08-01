import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-gray-600 text-gray-200 h-screen">
      <nav className="flex flex-col h-full">
        <ul className="flex flex-col">
          <Item link={'/'} text="Dashboard" />
          <Item link={'/comercial'} text="Comercial" />
          <Item link={'/rh'} text="RH" />
          <Item link={'/admin'} text="Administrativo" />
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
}
const Item = ({ link, text }: ItemProps) => {
  return (
    <li>
      <Link href={link} className="flex px-2 py-1">
        {text}
      </Link>
    </li>
  )
}
