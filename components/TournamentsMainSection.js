import { Loader, SectionTitle, TournamentCard } from '.';
import { useEffect, useReducer} from 'react';
import filtersEnum from '../helpers/filtersEnum'
import TournamentFilters from './TournamentFilters';
import getClosestDate from '../helpers/getClosestDate';



function tournamentsReducer(state, action) {
  switch (action.type) {
    case 'init':
      const allTournaments = [...state.allTournaments]
      const upcomingTournaments = allTournaments.filter(tournament => {
        const now = new Date().getTime()
        const lastTournamentDate = new Date(tournament.date[tournament.date.length-1]).getTime()
        if (now < lastTournamentDate) {
          return true
        }
      }).map((tournament2) => {
          const date = getClosestDate(tournament2.date)
          const tournamentObj = {...tournament2}
          tournamentObj.date = date
          return tournamentObj
      }).sort((a,b) => {
        return new Date(a.date) - new Date(b.date)
      })

      const endedTournaments = allTournaments.filter(tournament => {
        const now = new Date().getTime()
        const lastTournamentDate = new Date(tournament.date[tournament.date.length-1]).getTime()
        if (now > lastTournamentDate) {
          return true
        }
      }).sort((a,b) => {
        return new Date(b.date[b.date.length-1]) - new Date(a.date[a.date.length-1])
      })
      
      return {
        ...state,
        allTournaments: state.allTournaments, 
        upcomingTournaments: upcomingTournaments,
        endedTournaments: endedTournaments,
        filteredTournaments: upcomingTournaments,
      }
    case 'filter':
      const filteredTournaments = state.upcomingTournaments.filter(tournament => {
        if (action.filterType === 'mode') {
          if ((tournament.mode === action.filter) || action.filter === 'all') {
            if ((tournament.requiredArenaRank === state.currentFilters.rank) || state.currentFilters.rank === 'all') {
              if ((tournament.tournamentSource === state.currentFilters.platform) || state.currentFilters.platform === 'all') {
                if ((tournament.prizeType === state.currentFilters.reward) || state.currentFilters.reward === 'all') {
                  return true
                }
              }
            }
          }
        }
        if (action.filterType === 'rank') {
          if ((tournament.requiredArenaRank === action.filter) || action.filter === 'all') {
            if ((tournament.mode === state.currentFilters.mode) || state.currentFilters.mode === 'all') {
              if ((tournament.tournamentSource === state.currentFilters.platform) || state.currentFilters.platform === 'all') {
                if ((tournament.prizeType === state.currentFilters.reward) || state.currentFilters.reward === 'all') {
                  return true
                }
              }
            }
          }
        }
        if (action.filterType === 'platform') {
          if ((tournament.tournamentSource === action.filter) || action.filter === 'all') {
            if ((tournament.mode === state.currentFilters.mode) || state.currentFilters.mode === 'all') {
              if ((tournament.requiredArenaRank === state.currentFilters.rank) || state.currentFilters.rank === 'all') {
                if ((tournament.prizeType === state.currentFilters.reward) || state.currentFilters.reward === 'all') {
                  return true
                }
              }
            }
          }
        }
        if (action.filterType === 'reward') {
          if ((tournament.prizeType === action.filter) || action.filter === 'all') {
            if ((tournament.mode === state.currentFilters.mode) || state.currentFilters.mode === 'all') {
              if ((tournament.requiredArenaRank === state.currentFilters.rank) || state.currentFilters.rank === 'all') {
                if ((tournament.tournamentSource === state.currentFilters.platform) || state.currentFilters.platform === 'all') {
                  return true
                }
              }
            }
          }
        }
      })

      return {
        ...state, 
        filteredTournaments: filteredTournaments, 
        currentFilters: {...state.currentFilters, [action.filterType]:action.filter}
      }
    case 'clearFilters':
      return {
        ...state, 
        filteredTournaments: [...state.upcomingTournaments],
        currentFilters: {mode: 'all', rank: 'all', platform: 'all', reward: 'all'}
      }

    default:
      throw new Error('Something went wrong')
  }
}

const TournamentsMainSection = ({fetchedTournaments}) => {
  const [state, dispatch] = useReducer(tournamentsReducer, 
    {
      allTournaments: fetchedTournaments, 
      upcomingTournaments: [], 
      endedTournaments: [], 
      filteredTournaments: [],
      currentFilters: {mode: 'all', rank: 'all', platform: 'all', reward: 'all'}
    })

  useEffect(() => {
    dispatch({type: "init"})
  }, [])

  return (
    <>
      <main className='col-span-1 md:col-span-8 space-y-8'>
        <SectionTitle text="Nadchodzące turnieje"/>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {state.filteredTournaments.map((tournament, index) => (
            <TournamentCard key={index} tournament={tournament} />
          ))}
        </div>
        <SectionTitle text="Zakończone turnieje"/>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {state.endedTournaments.map((tournament, index) => (
            <TournamentCard key={index} tournament={tournament} ended={true} />
          ))}
        </div>
      </main>
      <aside className='col-span-1 md:col-span-4'>
        <SectionTitle border text={"Filtruj"}/>
        <TournamentFilters dispatch={dispatch} currentFilters={state.currentFilters} length={state.filteredTournaments.length}/>
      </aside>
    </>
  );
}
 
export default TournamentsMainSection;