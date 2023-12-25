'use client'

import claassnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const currentPath = usePathname()

  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues', label: 'Issues' },
  ]

  return (
    <nav className='flex space-x-6 border-b-2 mb-5 px-5 h-14 items-center'>
      <Link href='/' className='font-bold text-lg italic '>
        <span className='text-red-500 hover:text-red-600'>HELP</span> DESK
      </Link>

      <ul className='flex space-x-6'>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={claassnames({
              'text-zinc-950': href === currentPath,
              'text-zinc-500': href !== currentPath,
              'hover:text-zinc-800 transition-colors': true,
            })}>
            {label}
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar