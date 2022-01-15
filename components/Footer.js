import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="relative grid grid-cols-1 md:grid-cols-7 bg-white">
      <div className="col-span-1 md:col-span-2 bg-green-900 px-2 py-4 md:py-8">
        <div className='md:hidden space-x-2 flex justify-center'>
            <a target={"_blank"} href={"https://facebook.com/compnite"} rel="noreferrer" className='cursor-pointer'>
              <Image
                src={'/assets/icons/facebook.svg'}
                width={40}
                height={40}
                alt='Facebook'
              />
            </a>
            <a target={"_blank"} href={"https://twitter.com/kreysonfn"} rel="noreferrer" className='cursor-pointer'>
              <Image
                src={'/assets/icons/twitter.svg'}
                width={40}
                height={40}
                alt='Twitter'
              />
            </a>
            <a target={"_blank"} href={"https://instagram.com/compnite"} rel="noreferrer" className='cursor-pointer'>
              <Image
                src={'/assets/icons/instagram.svg'}
                width={40}
                height={40}
                alt='Instagram'
              />
            </a>
          </div>
      </div>
      <div className="col-span-1 md:col-span-5 bg-green-100 px-2 py-4 md:py-8">
        <a target={"_blank"} href={"https://mlynek.xyz"} className="md:hidden font-semibold text-lg flex justify-center space-x-2 cursor-pointer" rel="noreferrer">
          <span>Strony Internetowe</span>
          <span className='text-green-900'>MLYNEK.XYZ</span>
        </a>
      </div>
      <div className="hidden md:block md:absolute md:w-full md:h-full">
        <div className="container mx-auto flex h-full items-center justify-between">
          <div className='space-x-2'>
            <a target={"_blank"} href={"https://facebook.com/compnite"} rel="noreferrer" className='cursor-pointer'>
              <Image
                src={'/assets/icons/facebook.svg'}
                width={40}
                height={40}
                alt='Facebook'
                className='cursor-pointer pointer-events-auto'
              />
            </a>
            <a target={"_blank"} href={"https://twitter.com/kreysonfn"} rel="noreferrer" className='cursor-pointer'>
              <Image
                src={'/assets/icons/twitter.svg'}
                width={40}
                height={40}
                alt='Twitter'
                className='cursor-pointer pointer-events-auto'
              />
            </a>
            <a target={"_blank"} href={"https://instagram.com/compnite"} rel="noreferrer" className='cursor-pointer'>
              <Image
                src={'/assets/icons/instagram.svg'}
                width={40}
                height={40}
                alt='Instagram'
                className='cursor-pointer pointer-events-auto'
              />
            </a>
          </div>
          <a target={"_blank"} href={"https://mlynek.xyz"} className="block font-semibold text-lg" rel="noreferrer">
            Strony Internetowe <span className='text-green-900'>MLYNEK.XYZ</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
 
export default Footer;