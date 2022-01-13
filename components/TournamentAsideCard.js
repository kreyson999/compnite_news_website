import Image from "next/image";

const TournamentAsideCard = () => {
  return (
    <a className="bg-green-100 rounded px-2 flex items-center space-x-2 cursor-pointer">
      <Image
      src={'/assets/icons/fortnite_star.png'}
      alt="Fortnite Tournament"
      width={64}
      height={64}
      />
      <div>
        <h5 className="font-semibold text-lg cursor-pointer">All Valley Cup</h5>
        <p className="cursor-pointer">19:00, 10 Styczeń</p>
      </div>
    </a>
  );
}
 
export default TournamentAsideCard;