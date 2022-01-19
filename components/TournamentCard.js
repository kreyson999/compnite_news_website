import Image from 'next/image'
import { ChipText, TournamentTimer } from '.';

const TournamentCard = ({tournament, ended, withoutTimer}) => {


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
        <h3 className='uppercase font-semibold text-xl cursor-pointer'>{tournament.name}</h3>
        <div className='flex flex-wrap py-1 gap-2'>
          {tournament.mode && <ChipText text={tournament.mode.toUpperCase()}/>}
          <ChipText text={tournament.tournamentSource} />
          {tournament.prizepool.length > 0 && <ChipText text={'Pieniądze'}/>}
          {tournament.linkToRegister && <ChipText text={'Rejestracja'}/>}
          {tournament.requiredArenaRank && <ChipText text={tournament.requiredArenaRank.toUpperCase()}/>}
        </div>
        {withoutTimer ? null : ended ? 
        // ended
        (<div className='mt-2 flex flex-col justify-evenly text-center space-y-2 border-t-2 border-gray-600 pt-4 mt-4'>
          <h4 className='text-lg'>Zwyciezca:</h4>
          <div className='p-2 bg-green-600 rounded text-lg font-semibold text-white'>{tournament.winner ?? 'TDA'}</div>
        </div>) :
        (<div className='mt-2 flex justify-evenly text-center space-x-2 border-t-2 border-gray-600 pt-4 mt-4'>
          <TournamentTimer time={tournament.date}/>
        </div>)}
      </div>
    </a>
  );
}
 
export default TournamentCard;