import getTimeleft from "../helpers/timerHelper";
import { useState, useEffect } from 'react';


const TimeUnitBox = ({unit, data}) => {
  return (
    <div className='w-full'>
      <span>{unit}</span>
      <div className='p-2 bg-red-600 rounded text-lg font-semibold text-white'>{data}</div>
    </div>
  )
}

const TournamentTimer = ({time, full}) => {
  const [closestDateFormatted, setClosestDateFormatted] = useState({days: 0, hours: 0, minutes: 0, seconds: 0})

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const timeObj = getTimeleft(time)
      setClosestDateFormatted(timeObj)
    }, 1000)
    return () => clearInterval(timerInterval)
  }, [time])

  if (full) {
    return (
      <>
        <TimeUnitBox unit={'Dni'} data={closestDateFormatted.days}/>
        <TimeUnitBox unit={'Godziny'} data={closestDateFormatted.hours}/>
        <TimeUnitBox unit={'Minuty'} data={closestDateFormatted.minutes}/>
        <TimeUnitBox unit={'Sekundy'} data={closestDateFormatted.seconds}/>
      </>
    );
  } else {
    return (
      <>
        {closestDateFormatted.days !== 0 && (<TimeUnitBox unit={'Dni'} data={closestDateFormatted.days}/>)}
        <TimeUnitBox unit={'Godziny'} data={closestDateFormatted.hours}/>
        <TimeUnitBox unit={'Minuty'} data={closestDateFormatted.minutes}/>
        {closestDateFormatted.days === 0 && (<TimeUnitBox unit={'Sekundy'} data={closestDateFormatted.seconds}/>)}
      </>
    );
  }
}
export default TournamentTimer