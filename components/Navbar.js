import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import NavLink from "./NavLink"

const Navbar = () => {
  const [isScrolling, setIsScrolling] = useState(false)
  
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsScrolling(true)
    })
    const scrollInterval = setInterval(() => {
      if (isScrolling) {
        setIsScrolling(false)
      }
    }, 1000)
    
    return () => {
      clearInterval(scrollInterval)
      window.removeEventListener('scroll', () => {
        setIsScrolling(true)
      })
    }
  }, [isScrolling])

  return (
    <nav className="bg-white">
      <div className="container py-3 mx-auto flex justify-center md:justify-between items-center" >
        <div className="px-2 text-3xl font-bold uppercase text-green-900 cursor-pointer">
            <Link passHref href={'/'}>
            <h2 className="cursor-pointer">Kjmm</h2>
            </Link>
        </div>
        <div className="hidden md:block mx-2 bg-green-100 cursor-pointer px-1 py-1 rounded grid place-content-center md:hidden">
          <Image
          width={32}
          height={32}
          src={'/assets/icons/menu.svg'}
          alt="Menu"
          />
        </div>
        <div className={`fixed px-6 py-2 z-50 shadow-lg bottom-0 my-2 mx-2 rounded-lg flex justify-evenly bg-green-800 space-x-2 md:block md:bg-transparent md:shadow-none md:static md:w-auto transition duration-500  md:py-0 ${isScrolling && 'opacity-30 md:opacity-100'}`}>
          <NavLink href={'/'} text={'Główna'}/>
          {/* <NavLink href={'/players'} text={'Gracze'}/> */}
          {/* <NavLink href={'/'} text={'Na żywo'} block/> */}
          <NavLink href={'/tournaments'} text={'Turnieje'} isHero={true}/>
        </div>
      </div>
    </nav>
  )
}
export default Navbar