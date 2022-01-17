import Image from 'next/image'
import { ChipText } from '.';
import { useEffect, useState } from 'react';
import getTimeleft from '../helpers/timerHelper'

const TournamentCard = ({tournament, ended}) => {
  const [currentDate, setCurrentDate] = useState({days: 0, hours: 0, minutes: 0, seconds: 0})

  useEffect(() => {
    const dateTimer = setInterval(() => {
      const time = getTimeleft(tournament.date)
      setCurrentDate(time)
    }, 1000)
    return () => clearInterval(dateTimer)
  }, [tournament.date])


  return (
    <a href={`/tournaments/${tournament.slug}`} className='cursor-pointer bg-green-100 rounded relative grid grid-rows-2 shadow-lg transition duration-500 transform hover:-translate-y-1'>
      <div className='relative w-full h-full row-span-1 overflow-hidden rounded-t'>
        <Image
          src={tournament.image.url}
          alt={tournament.name}
          objectFit='cover'
          layout='fill'
        />
      </div>
      <div className='px-2 py-2 flex flex-col justify-end'>
        <h5 className='uppercase font-semibold text-xl cursor-pointer'>{tournament.name}</h5>
        <div className='flex flex-wrap py-1 gap-2'>
          {tournament.mode ? <ChipText text={tournament.mode.toUpperCase()}/> : null}
          <ChipText text={tournament.tournamentSource} />
          {tournament.prizepool.length > 0 ? <ChipText text={'Pieniądze'}/> : null}
          {tournament.linkToRegister ? <ChipText text={'Rejestracja'}/> : null}
          {tournament.requiredArenaRank ? <ChipText text={tournament.requiredArenaRank.toUpperCase()}/> : null}
        </div>
        {ended ? (
        <div className='mt-2 flex flex-col justify-evenly text-center space-y-2 border-t-2 border-gray-600 pt-4 mt-4'>
          <h5 className='text-lg'>Zwyciezca:</h5>
          <div className='p-2 bg-green-600 rounded text-lg font-semibold text-white'>KamiFN1</div>
        </div>)
        :  
        (<div className='mt-2 flex justify-evenly text-center space-x-2 border-t-2 border-gray-600 pt-4 mt-4'>
          {
            currentDate.days === 0 ? null : 
            (
              <div className='w-full'>
                <span>Dni</span>
                <div className='p-2 bg-red-600 rounded text-lg font-semibold text-white'>{currentDate.days}</div>
              </div>
            )
          }
          <div className='w-full'>
            <span>Godziny</span>
            <div className='p-2 bg-red-600 rounded text-lg font-semibold text-white'>{currentDate.hours}</div>
          </div>
          <div className='w-full'>
            <span>Minuty</span>
            <div className='p-2 bg-red-600 rounded text-lg font-semibold text-white'>{currentDate.minutes}</div>
          </div>
          {
            currentDate.days !== 0 ? null : 
            (
              <div className='w-full'>
                <span>Sekundy</span>
                <div className='p-2 bg-red-600 rounded text-lg font-semibold text-white'>{currentDate.seconds}</div>
              </div>
            )
          }
        </div>)}
      </div>
    </a>
  );
}
 
export default TournamentCard;