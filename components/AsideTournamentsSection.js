import { useEffect, useState } from "react";
import { Loader, SectionTitle, TournamentAsideCard } from ".";
import { getAllTournaments } from "../services";
import moment from "moment";
import getClosestDate from "../helpers/getClosestDate";

const AsideTournamentsSection = () => {
  // const [tournaments, setTournaments] = useState([])
  const [formattedTournaments, setFormattedTournaments] = useState([])

  useEffect(() => {
    const fetchTournaments = async () => {
      const fetchedTournaments = await getAllTournaments();
      
      const formatTournaments = (tournaments) => {
        const sortedTournaments = []
        const currentDate = moment()

        // iterate through each tournament
        tournaments.forEach(tournament => {
          if (moment(tournament.date[tournament.date.length - 1]).isBefore(currentDate)) return
          tournament.date = getClosestDate(tournament.date)
          sortedTournaments.push(tournament)
        })

        setFormattedTournaments(sortedTournaments.sort((a,b) => {
          return new Date(a.date) - new Date(b.date)
        }).slice(0, 5))
      }

      formatTournaments(fetchedTournaments)
    }


    fetchTournaments();
  }, [])

  return (
  <>
    <SectionTitle text={"Nadchodzące turnieje"} border/>
    <div className='space-y-2 mb-4'>
      {formattedTournaments.length > 0 ? formattedTournaments.map((tournament, index) => {
        const diff = moment(tournament.date).diff(moment(), 'hours')
        return (<TournamentAsideCard key={index} tournament={tournament} active={diff < 3 && diff > 0}/>)
      }) : <Loader/> }
    </div>
  </>
  );
}
 
export default AsideTournamentsSection;