import { FiltersCheckbox, SectionTitle, TournamentCard } from '.';
import { useEffect, useReducer, useState } from 'react';
import { getUpcomingTournaments } from '../services';
import moment from 'moment';
import filtersEnum from '../helpers/filtersEnum'

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

const TournamentsMainSection = () => {
  const [endedTournaments, setEndedTournaments] = useState([])
  const [upcomingTournaments, setUpcomingTournaments] = useState([])
  const [filteredTournaments, setFilteredTournaments] = useState([])

  const [state, dispatch] = useReducer(filter, initialFilters)

  useEffect(() => {
    const fetchTournaments = async () => {
      const fetchedTournaments = await getUpcomingTournaments();
      
      const formatTournaments = (tournaments) => {
        const upcomingTournaments = []
        const endedTournaments = []
        const currentDate = moment()

        // iterate through each tournament
        tournaments.forEach(tournament => {
          //check if the last date of the tournament is before current date
          if (moment(tournament.date[tournament.date.length - 1]).isBefore(currentDate)) {
            endedTournaments.push(tournament)
          } else {
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
            upcomingTournaments.push(tournament)
          }
        })
        setUpcomingTournaments(upcomingTournaments)
        setEndedTournaments(endedTournaments)
      }
      formatTournaments(fetchedTournaments)
    }
    fetchTournaments();
  }, [])

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

  const handleClearingFilters = (e) => {
    e.preventDefault();
    dispatch({type: 'clear'})
  }

  return (
    <>
      <main className='col-span-1 md:col-span-8 space-y-8'>
        <SectionTitle text="Nadchodzące turnieje"/>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredTournaments.length > 0 ? filteredTournaments.sort((a,b) => {
            return new Date(a.date) - new Date(b.date)
          }).map((tournament, index) => (<TournamentCard key={index} tournament={tournament}/>)) 
          : <h4 className="col-span-1 md:col-span-2 lg:col-span-3 md:my-2 md:my-8 text-red-600 font-semibold mx-auto">Brak turniejów do wyświetlenia!</h4>
          
          }
        </div>
        <SectionTitle text="Zakończone turnieje"/>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {endedTournaments.length > 0 ? endedTournaments.sort((a,b) => {
            return new Date(a.date) - new Date(b.date)
          }).map((tournament, index) => (<TournamentCard key={index} tournament={tournament}/>)) :
          <h4 className="col-span-1 md:col-span-2 lg:col-span-3 md:my-2 md:my-8 text-red-600 font-semibold mx-auto">Brak turniejów do wyświetlenia!</h4> }
        </div>
      </main>
      <aside className='col-span-1 md:col-span-4'>
        <SectionTitle border text={"Filtruj"}/>
        <form>
          <div className='flex flex-col'>
            <h6 className='font-semibold'>Tryb:</h6>
            <FiltersCheckbox name={filtersEnum.solo} onChange={dispatch} value={state[filtersEnum.solo]}/>
            <FiltersCheckbox name={filtersEnum.duo} onChange={dispatch} value={state[filtersEnum.duo]} />
            <FiltersCheckbox name={filtersEnum.trio} onChange={dispatch} value={state[filtersEnum.trio]} />
            <FiltersCheckbox name={filtersEnum.squad} onChange={dispatch} value={state[filtersEnum.squad]} />

            <h6 className='font-semibold'>Ranga turnieju:</h6>
            <FiltersCheckbox name={filtersEnum.open} onChange={dispatch} value={state[filtersEnum.open]}/>
            <FiltersCheckbox name={filtersEnum.contender} onChange={dispatch} value={state[filtersEnum.contender]}/>
            <FiltersCheckbox name={filtersEnum.champion} onChange={dispatch} value={state[filtersEnum.champion]}/>
            <FiltersCheckbox name={filtersEnum.pro} onChange={dispatch} value={state[filtersEnum.pro]}/>

            <h6 className='font-semibold'>Organizator:</h6>
            <FiltersCheckbox name={filtersEnum.fortnite} onChange={dispatch} value={state[filtersEnum.fortnite]}/>
            <FiltersCheckbox name={filtersEnum.rematch} onChange={dispatch} value={state[filtersEnum.rematch]}/>
            <FiltersCheckbox name={filtersEnum.warlegend} onChange={dispatch} value={state[filtersEnum.warlegend]}/>
            <FiltersCheckbox name={filtersEnum.other} onChange={dispatch} value={state[filtersEnum.other]}/>

            <h6 className='font-semibold'>Typ nagrody:</h6>
            <FiltersCheckbox name={filtersEnum.money} onChange={dispatch} value={state[filtersEnum.money]}/> 
            <FiltersCheckbox name={filtersEnum.hype} onChange={dispatch} value={state[filtersEnum.hype]}/> 
            <FiltersCheckbox name={filtersEnum.skin} onChange={dispatch} value={state[filtersEnum.skin]}/> 

            <h6 className='font-semibold'>Inne:</h6>
            <FiltersCheckbox name={filtersEnum.qualifications} onChange={dispatch} value={state[filtersEnum.qualifications]}/>
          </div>
          <button onClick={handleClearingFilters} className='text-center w-full bg-green-900 text-lg mt-2 py-2 text-white rounded'>Wyczyść</button>
        </form>
      </aside>
    </>
  );
}
 
export default TournamentsMainSection;