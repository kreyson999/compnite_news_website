import Link from 'next/link'
import { useRouter } from 'next/router';

const NavLink = ({href, text, isHero}) => {
  const { asPath } = useRouter()

  const isActive = asPath === href ? true : false

  return (
    <Link href={href}>
      <a 
      className={
        isHero ? 'text-lg rounded font-normal bg-green-900 p-3 text-white' 
        : `text-lg p-2 rounded font-normal ${isActive ? 'bg-green-100' : null}`
      }
      >{text}</a>
    </Link>
  );
}
 
export default NavLink;