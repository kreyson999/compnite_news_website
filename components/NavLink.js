import Link from 'next/link'

const NavLink = ({href, text, isHero}) => {

  return (
    <Link href={href}>
      <a 
      className={ 
        `md:text-lg text-base font-semibold px-4 py-2 rounded md:font-normal text-sm text-white md:text-black ${isHero && 'bg-green-900 md:text-white'}`
      }
      >{text}</a>
    </Link>
  );
}
 
export default NavLink;