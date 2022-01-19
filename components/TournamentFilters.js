import Image from "next/image";
import { FiltersCheckbox } from ".";
import filtersEnum from "../helpers/filtersEnum";
import { useState, useEffect } from 'react'

const TournamentFilters = ({dispatch, state, filteredTournamentsLength}) => {

  const [areFiltersClosed, setAreFiltersClosed] = useState(true)

  const handleClickOnFilters = (e) => {
    e.preventDefault()
    setAreFiltersClosed(!areFiltersClosed)
  }

  const handleClearingFilters = (e) => {
    e.preventDefault();
    dispatch({type: 'clear'})
  }

  useEffect(() => {
    if (!areFiltersClosed) {
      document.body.style.overflow = 'hidden'
    }
    return () => document.body.style.overflow = 'unset'
  })

  return (
    <>
      <form className={`fixed top-0 bottom-0 left-0 right-0 bg-white z-50 overflow-y-auto md:static ${areFiltersClosed && 'hidden md:block'}`}>
        <div className='grid grid-cols-6 md:hidden'>
          <button onClick={handleClickOnFilters} className='bg-green-900 grid place-content-center p-2'>
            <Image
              width={32}
              height={32}
              src={'/assets/icons/close.svg'}
              alt="Close Filters"
            />
          </button>
          <span className='col-span-5 font-semibold text-xl bg-green-100 w-full flex items-center pl-2'>Filtruj</span>
        </div>
        <div className='flex flex-col p-2 md:p-0'>
          <p className='font-semibold'>Tryb:</p>
          <FiltersCheckbox name={filtersEnum.solo} onChange={dispatch} value={state[filtersEnum.solo]}/>
          <FiltersCheckbox name={filtersEnum.duo} onChange={dispatch} value={state[filtersEnum.duo]} />
          <FiltersCheckbox name={filtersEnum.trio} onChange={dispatch} value={state[filtersEnum.trio]} />
          <FiltersCheckbox name={filtersEnum.squad} onChange={dispatch} value={state[filtersEnum.squad]} />

          <p className='font-semibold'>Ranga turnieju:</p>
          <FiltersCheckbox name={filtersEnum.open} onChange={dispatch} value={state[filtersEnum.open]}/>
          <FiltersCheckbox name={filtersEnum.contender} onChange={dispatch} value={state[filtersEnum.contender]}/>
          <FiltersCheckbox name={filtersEnum.champion} onChange={dispatch} value={state[filtersEnum.champion]}/>
          <FiltersCheckbox name={filtersEnum.pro} onChange={dispatch} value={state[filtersEnum.pro]}/>

          <p className='font-semibold'>Organizator:</p>
          <FiltersCheckbox name={filtersEnum.fortnite} onChange={dispatch} value={state[filtersEnum.fortnite]}/>
          <FiltersCheckbox name={filtersEnum.rematch} onChange={dispatch} value={state[filtersEnum.rematch]}/>
          <FiltersCheckbox name={filtersEnum.warlegend} onChange={dispatch} value={state[filtersEnum.warlegend]}/>
          <FiltersCheckbox name={filtersEnum.other} onChange={dispatch} value={state[filtersEnum.other]}/>

          <p className='font-semibold'>Typ nagrody:</p>
          <FiltersCheckbox name={filtersEnum.money} onChange={dispatch} value={state[filtersEnum.money]}/> 
          <FiltersCheckbox name={filtersEnum.hype} onChange={dispatch} value={state[filtersEnum.hype]}/> 
          <FiltersCheckbox name={filtersEnum.skin} onChange={dispatch} value={state[filtersEnum.skin]}/> 

          <p className='font-semibold'>Inne:</p>
          <FiltersCheckbox name={filtersEnum.qualifications} onChange={dispatch} value={state[filtersEnum.qualifications]}/>
        </div>
        <div className='p-2'>
          <button onClick={handleClickOnFilters} className='md:hidden text-center w-full bg-green-900 text-lg mt-2 py-2 text-white rounded'>Pokaż wyniki ({filteredTournamentsLength})</button>
        </div>
        <button onClick={handleClearingFilters} className='hidden md:block text-center w-full bg-green-900 text-lg mt-2 py-2 text-white rounded'>Wyczyść</button>
      </form>
      <button onClick={handleClickOnFilters} className={`fixed bottom-0 z-50 mb-16 mr-2 right-0 rounded grid place-content-center md:hidden p-2 bg-green-900 ${areFiltersClosed ? 'block md:hidden' : 'hidden'}`}>
        <Image
          width={32}
          height={32}
          src={'/assets/icons/filters.svg'}
          alt="Filters"
        />
      </button>
    </>
  );
}
 
export default TournamentFilters;