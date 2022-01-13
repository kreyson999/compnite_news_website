import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import NavLink from "./NavLink"

const Navbar = () => {
  const [isNavbarClosed, setIsNavbarClosed] = useState(true)

  const handleClosingNav = () => setIsNavbarClosed(!isNavbarClosed)

  return (
    <nav className="bg-white">
      <div className="relative container py-3 mx-auto flex justify-between items-center" >
        <div className="px-2 text-3xl font-bold uppercase text-green-900 cursor-pointer">
            <Link passHref href={'/'}>
            <h2 className="cursor-pointer">Compnite</h2>
            </Link>
        </div>
        <div onClick={handleClosingNav} className="mx-2 bg-green-100 cursor-pointer px-1 py-1 rounded grid place-content-center md:hidden">
          <Image
          width={32}
          height={32}
          src={'/assets/icons/menu.svg'}
          alt="Menu"
          />
        </div>
        <div className={`absolute shadow-lg rounded-lg -bottom-20 py-4 w-full z-50 bg-white flex justify-center items-center md:block space-x-2 md:bg-transparent md:shadow-none md:static md:w-auto md:py-0 ${isNavbarClosed && 'hidden'}`}>
          <NavLink href={'/'} text={'Główna'}/>
          {/* <NavLink href={'/players'} text={'Gracze'}/> */}
          {/* <NavLink href={'/live'} text={'Na żywo'}/> */}
          <NavLink href={'/tournaments'} text={'Turnieje'} isHero={true}/>
        </div>
      </div>
    </nav>
  )
}
export default Navbar