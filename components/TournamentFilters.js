import Image from "next/image";
import { FiltersCheckbox } from ".";
import filtersEnum from "../helpers/filtersEnum";
import { useState, useEffect } from 'react'

const TournamentFilters = ({dispatch, currentFilters, length}) => {

  const [areFiltersClosed, setAreFiltersClosed] = useState(true)

  const handleClickOnFilters = (e) => {
    e.preventDefault()
    setAreFiltersClosed(!areFiltersClosed)
  }

  const handleClearingFilters = (e) => {
    e.preventDefault();
    dispatch({type: 'clearFilters'})
  }

  const handleChangingFilters = (filter, filterType) => {
    console.log(filterType)
    dispatch({type: 'filter', filter: filter, filterType: filterType})
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
          <FiltersCheckbox id={"mode-all"} name="Wszystkie" value={currentFilters.mode === 'all'} onChange={() => handleChangingFilters('all', 'mode')}/>
          <FiltersCheckbox id={"mode-solo"} name="Solo" value={currentFilters.mode === filtersEnum.mode.solo} onChange={() => handleChangingFilters(filtersEnum.mode.solo, 'mode')}/>
          <FiltersCheckbox id={"mode-duo"} name="Duo" value={currentFilters.mode === filtersEnum.mode.duo} onChange={() => handleChangingFilters(filtersEnum.mode.duo, 'mode')}/>
          <FiltersCheckbox id={"mode-trio"} name="Trio" value={currentFilters.mode === filtersEnum.mode.trio} onChange={() => handleChangingFilters(filtersEnum.mode.trio, 'mode')}/>
          <FiltersCheckbox id={"mode-squad"} name="Squad" value={currentFilters.mode === filtersEnum.mode.squad} onChange={() => handleChangingFilters(filtersEnum.mode.squad, 'mode')}/>
          
          <p className='font-semibold'>Ranga turnieju:</p>
          <FiltersCheckbox 
          id={"rank-all"}
          name="Wszystkie" 
          value={currentFilters.rank === 'all'} 
          onChange={() => handleChangingFilters('all', 'rank')}/>
          <FiltersCheckbox id={"rank-open"} name="Open" value={currentFilters.rank === filtersEnum.rank.open} onChange={() => handleChangingFilters(filtersEnum.rank.open, 'rank')}/>
          <FiltersCheckbox id={"rank-contender"} name="Contender" value={currentFilters.rank === filtersEnum.rank.contender} onChange={() => handleChangingFilters(filtersEnum.rank.contender, 'rank')}/>
          <FiltersCheckbox id={"rank-champion"} name="Champion" value={currentFilters.rank === filtersEnum.rank.champion} onChange={() => handleChangingFilters(filtersEnum.rank.champion, 'rank')}/>
          <FiltersCheckbox id={"rank-pro"} name="Pro" value={currentFilters.rank === filtersEnum.rank.pro} onChange={() => handleChangingFilters(filtersEnum.rank.pro, 'rank')}/>
          
          <p className='font-semibold'>Organizator:</p>
          <FiltersCheckbox id={"platform-all"} name="Wszystkie" value={currentFilters.platform === 'all'} onChange={() => handleChangingFilters('all', 'platform')}/>
          <FiltersCheckbox id={"platform-fortnite"} name="Fortnite" value={currentFilters.platform === filtersEnum.platform.fortnite} onChange={() => handleChangingFilters(filtersEnum.platform.fortnite, 'platform')}/>
          <FiltersCheckbox id={"platform-rematch"} name="Rematch" value={currentFilters.platform === filtersEnum.platform.rematch} onChange={() => handleChangingFilters(filtersEnum.platform.rematch, 'platform')}/>
          <FiltersCheckbox id={"platform-warlegend"} name="Warlegend" value={currentFilters.platform === filtersEnum.platform.warlegend} onChange={() => handleChangingFilters(filtersEnum.platform.warlegend, 'platform')}/>
          
          <p className='font-semibold'>Nagroda:</p>
          <FiltersCheckbox id={"reward-all"} name="Wszystkie" value={currentFilters.reward === 'all'} onChange={() => handleChangingFilters('all', 'reward')}/>
          <FiltersCheckbox id={"reward-money"} name="Pieniądze" value={currentFilters.reward === filtersEnum.rewardType.money} onChange={() => handleChangingFilters(filtersEnum.rewardType.money, 'reward')}/>
          <FiltersCheckbox id={"reward-hype"} name="Punkty Hype" value={currentFilters.reward === filtersEnum.rewardType.hype} onChange={() => handleChangingFilters(filtersEnum.rewardType.hype, 'reward')}/>
          <FiltersCheckbox id={"reward-skin"} name="Skin" value={currentFilters.reward === filtersEnum.rewardType.skin} onChange={() => handleChangingFilters(filtersEnum.rewardType.skin, 'reward')}/>


        </div>
        <div className='p-2'>
          <button onClick={handleClickOnFilters} className='md:hidden text-center w-full bg-green-900 text-lg mt-2 py-2 text-white rounded'>Pokaż wyniki ({length})</button>
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