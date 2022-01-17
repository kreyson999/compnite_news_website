import Link from 'next/link'
import { useRouter } from 'next/router';

const NavLink = ({href, text, isHero, block}) => {
  const { asPath } = useRouter()

  const isActive = asPath === href ? true : false

  return (
    <Link href={href}>
      <a 
      className={
        isHero && !isActive ? `md:text-lg text-base rounded font-semibold md:font-normal md:bg-green-900 p-2 text-white ${isActive ? 'bg-green-100 text-black' : null}` 
        : `md:text-lg text-base font-semibold p-2 rounded md:font-normal text-sm text-white md:text-black ${isActive ? 'bg-green-100 text-black' : null} ${block ? 'cursor-not-allowed text-white' : null}`
      }
      >{text}</a>
    </Link>
  );
}
 
export default NavLink;