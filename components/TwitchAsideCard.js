import Image from 'next/image'

const TwitchAsideCard = ({name, viewer_count, link}) => {
  return (
    <a target={"_blank"} href={link} className="flex justify-between items-center" rel="noreferrer">
      <div className='flex space-x-2 items-center'>
        <Image 
        src={'/assets/icons/twitch.svg'}
        width={32}
        height={32}
        alt='Twitch'
        />
        <p className='font-semibold text-lg hover:pl-1 duration-200 cursor-pointer'>{name}</p>
      </div>
      <div className='flex items-center space-x-2'>
        <p className='text-gray-600 cursor-pointer'>{viewer_count}</p>
        <div className='bg-red-600 w-3 h-3 rounded-full'></div>
      </div>
    </a>
  );
}
 
export default TwitchAsideCard;