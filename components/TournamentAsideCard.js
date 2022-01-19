import Image from "next/image";
import moment from "moment";

const TournamentAsideCard = ({tournament, active}) => {
  return (
    <a href={`/tournaments/${tournament.slug}`} className="relative bg-green-100 rounded px-2 flex items-center space-x-2 cursor-pointer border-r-4 hover:border-green-900">
      {active && <div className='absolute -top-1 -right-2 bg-red-600 w-3 h-3 rounded-full'></div>} 
      <Image
      src={'/assets/icons/fortnite_star.png'}
      alt={tournament.name}
      width={64}
      height={64}
      />
      <div>
        <h5 className="font-semibold text-lg cursor-pointer">{tournament.name.toUpperCase()}</h5>
        <p className="cursor-pointer">{moment(tournament.date).format('HH:mm, DD MMMM')}</p>
      </div>
    </a>
  );
}

export default TournamentAsideCard;