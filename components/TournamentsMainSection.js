import { Loader, SectionTitle, TournamentCard } from '.';
import { useEffect, useReducer, useState } from 'react';
import { getAllTournaments } from '../services';
import moment from 'moment';
import filtersEnum from '../helpers/filtersEnum'
import TournamentFilters from './TournamentFilters';
import getClosestDate from '../helpers/getClosestDate';

const initialFilters = {
  [filtersEnum.solo]: false,
  [filtersEnum.duo]: false,
  [filtersEnum.trio]: false,
  [filtersEnum.squad]: false,
  [filtersEnum.fortnite]: false,
  [filtersEnum.other]: false,
  [filtersEnum.rematch]: false,
  [filtersEnum.warlegend]: false,
  [filtersEnum.qualifications]: false,
  [filtersEnum.money]: false,
  [filtersEnum.hype]: false,
  [filtersEnum.skin]: false,
  [filtersEnum.open]: false,
  [filtersEnum.contender]: false,
  [filtersEnum.champion]: false,
  [filtersEnum.pro]: false,
}

function filter(state, action) {
  switch (action.type) {
    case 'change':
      return {...state, [action.name]: !state[action.name] }
    case 'clear': 
      return initialFilters
    default:
      throw new Error('Something went wrong')
  }
}

const TournamentsMainSection = ({fetchedTournaments}) => {
  const [endedTournaments, setEndedTournaments] = useState([])
  const [upcomingTournaments, setUpcomingTournaments] = useState([])
  const [filteredTournaments, setFilteredTournaments] = useState([])

  const [state, dispatch] = useReducer(filter, initialFilters)

  useEffect(() => {
    const fetchTournaments = async () => {
      
      const formatTournaments = (tournaments) => {
        const upcomingTournaments = []
        const endedTournaments = []
        const currentDate = moment()

        // iterate through each tournament
        tournaments.forEach(tournament => {
          //check if the last date of the tournament is before current date
          if (moment(tournament.date[tournament.date.length - 1]).isBefore(currentDate)) {
            tournament.date = tournament.date[tournament.date.length - 1]
            endedTournaments.push(tournament)
          } else {
            tournament.date = getClosestDate(tournament.date)
            upcomingTournaments.push(tournament)
          }
        })
        setUpcomingTournaments(upcomingTournaments)
        setEndedTournaments(endedTournaments)
      }
      formatTournaments(fetchedTournaments)
    }
    fetchTournaments();
  }, [fetchedTournaments])

  useEffect(() => {
    const filterTournaments = () => {
      const turnedFilters = [];
      const filteredTournaments = [];
      for (const key in state) {
        if (state[key]) {
          turnedFilters.push(key)
        } 
      }
      if (turnedFilters.length > 0) {
        upcomingTournaments.forEach(tournament => {
          let isValid = true
          turnedFilters.forEach(filter => {
            switch(filter) {
              case filtersEnum.solo:
                if (tournament.mode !== filtersEnum.solo.toLowerCase()) {
                  isValid = false
                }
                break
              case filtersEnum.duo:
                if (tournament.mode !== filtersEnum.duo.toLowerCase()) {
                  isValid = false
                }
                break
              case filtersEnum.trio:
                if (tournament.mode !== filtersEnum.trio.toLowerCase()) {
                  isValid = false
                }
                break
              case filtersEnum.squad:
                if (tournament.mode !== filtersEnum.squad.toLowerCase()) {
                  isValid = false
                }
                break
              case filtersEnum.fortnite:
                if (tournament.tournamentSource !== filtersEnum.fortnite) {
                  isValid = false
                }
                break
              case filtersEnum.warlegend:
                if (tournament.tournamentSource !== filtersEnum.warlegend) {
                  isValid = false
                }
                break
              case filtersEnum.rematch:
                if (tournament.tournamentSource !== filtersEnum.rematch) {
                  isValid = false
                }
                break
              case filtersEnum.other:
                if (tournament.tournamentSource !== 'other') {
                  isValid = false
                }
                break
              case filtersEnum.money:
                if (tournament.prizeType !== 'money') {
                  isValid = false
                }
                break
              case filtersEnum.hype:
                if (tournament.prizeType !== 'hype') {
                  isValid = false
                }
                break
              case filtersEnum.skin:
                if (tournament.prizeType !== 'skin') {
                  isValid = false
                }
                break
              case filtersEnum.qualifications:
                if (tournament.linkToRegister !== null) {
                  isValid = false
                }
                break
              case filtersEnum.open:
                if (tournament.requiredArenaRank !== filtersEnum.open) {
                  isValid = false
                }
                break
              case filtersEnum.open:
                console.log(filtersEnum.open, tournament.requiredArenaRank)
                if (tournament.requiredArenaRank !== filtersEnum.open.toLowerCase()) {
                  isValid = false
                }
                break
              case filtersEnum.contender:
                if (tournament.requiredArenaRank !== filtersEnum.contender.toLowerCase()) {
                  isValid = false
                }
                break
              case filtersEnum.champion:
                if (tournament.requiredArenaRank !== filtersEnum.champion.toLowerCase()) {
                  isValid = false
                }
                break
              case filtersEnum.pro:
                if (tournament.requiredArenaRank !== filtersEnum.pro.toLowerCase()) {
                  isValid = false
                }
                break
            }
          })
          if (isValid) {
            filteredTournaments.push(tournament)
          }
        })
      } else {
        upcomingTournaments.forEach(tournament => {
          filteredTournaments.push(tournament)
        })
      }
      setFilteredTournaments(filteredTournaments)
    }
    filterTournaments();
  }, [state, upcomingTournaments])

  return (
    <>
      <main className='col-span-1 md:col-span-8 space-y-8'>
        <SectionTitle text="Nadchodzące turnieje"/>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredTournaments.length > 0 ? filteredTournaments.sort((a,b) => {
            return new Date(a.date) - new Date(b.date)
          }).map((tournament, index) => (<TournamentCard key={index} tournament={tournament}/>)) 
          : <Loader colSpan={3}/>
          
          }
        </div>
        <SectionTitle text="Zakończone turnieje"/>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {endedTournaments.length > 0 ? endedTournaments.sort((a,b) => {
            return new Date(b.date) - new Date(a.date)
          }).map((tournament, index) => (<TournamentCard key={index} tournament={tournament} ended={true}/>)) :
          <Loader colSpan={3}/> }
        </div>
      </main>
      <aside className='col-span-1 md:col-span-4'>
        <SectionTitle border text={"Filtruj"}/>
        <TournamentFilters dispatch={dispatch} state={state} filteredTournamentsLength={filteredTournaments.length} />
      </aside>
    </>
  );
}
 
export default TournamentsMainSection;