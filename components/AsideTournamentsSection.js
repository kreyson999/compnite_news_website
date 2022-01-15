import { useEffect, useState } from "react";
import { SectionTitle, TournamentAsideCard } from ".";
import { getUpcomingTournaments } from "../services";
import moment from "moment";

const AsideTournamentsSection = () => {
  // const [tournaments, setTournaments] = useState([])
  const [formattedTournaments, setFormattedTournaments] = useState([])

  useEffect(() => {
    const fetchTournaments = async () => {
      const fetchedTournaments = await getUpcomingTournaments();
      
      const formatTournaments = (tournaments) => {
        const sortedTournaments = []
        const currentDate = moment()

        // iterate through each tournament
        tournaments.forEach(tournament => {
          if (sortedTournaments.length > 4) return
          //check if the last date of the tournament is before current date
          if (moment(tournament.date[tournament.date.length - 1]).isBefore(currentDate)) return
          
          const upcomingDates = []
          // iterate through each date and check if the date is after current date
          tournament.date.forEach(date => {
            if (moment(date).isAfter(currentDate)) {
              upcomingDates.push(date)
            }
          })
          // sort an array
          upcomingDates.sort((a,b) => {
            return new Date(a) - new Date(b)
          })
          tournament.date = upcomingDates[0]
          sortedTournaments.push(tournament)
        })

        setFormattedTournaments(sortedTournaments)
      }

      formatTournaments(fetchedTournaments)
    }


    fetchTournaments();
  }, [])

  return (
  <>
    <SectionTitle text={"Nadchodzące turnieje"} border/>
    <div className='space-y-2 mb-4'>
      {formattedTournaments.sort((a,b) => {
        return new Date(a.date) - new Date(b.date)
      }).map((tournament, index) => {
        const diff = moment(tournament.date).diff(moment(), 'hours')
        return (<TournamentAsideCard key={index} tournament={tournament} active={diff < 3 && diff > 0}/>)
      })}
    </div>
  </>
  );
}
 
export default AsideTournamentsSection;