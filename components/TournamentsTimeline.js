import moment from "moment";
import { useEffect, useState } from "react";

const PointComponent = ({position, date, isOnlyOne, active}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        {isOnlyOne ? null : <div className={`h-2 w-16 ${position === 'start' ? 'bg-transparent' : 'bg-green-100'}`}></div>}
        <div className={`w-6 h-6 rounded-full ${active ? 'bg-green-900' : 'bg-green-100 border-4 border-white' }`}></div>
        {isOnlyOne ? null : <div className={`h-2 w-16 ${position === 'end' ? 'bg-transparent' : 'bg-green-100'} ${position === 'end-more' ? 'bg-gradient-to-r from-green-100 to-white' : null}`}></div>}
      </div>
      <span className={`${active ? 'font-semibold' : null} mt-2 text-gray-600`}>{moment(date).format('HH:mm, DD.MM')}</span>
    </div>
  )
}

const TournamentsTimeline = ({tournamentDates, closestDate}) => {

  const [datesOnTimeline, setDatesOnTimeline] = useState([...tournamentDates])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const copiedDates = [...tournamentDates]
    const indexOfDate = copiedDates.indexOf(closestDate)

    const formattedDates = []

    if (indexOfDate === copiedDates.length-1) {
      copiedDates.reverse().forEach((date, index) => {
        if (index > 4) return
        formattedDates.unshift(date)
      })
    } else {
      copiedDates.forEach((date, index) => {
        if (index < indexOfDate-1 || index > indexOfDate + 3) return
        formattedDates.push(date)
      })
    }

    const closestDateIndex = formattedDates.indexOf(closestDate)

    setActiveIndex(closestDateIndex)
    setDatesOnTimeline(formattedDates)
    
  }, [closestDate, tournamentDates])

  return (
    <div className="flex my-6 flex-row overflow-x-auto mx-auto md:justify-center">
      {datesOnTimeline.map((date, index) => {
        if (datesOnTimeline.length === 1) {
          return (<PointComponent active={activeIndex === index ? true : false} key={index} position={'start'} date={date} isOnlyOne={true}/>)
        }
        else if (index === 0) {
          return <PointComponent active={activeIndex === index ? true : false} key={index} position={'start'} date={date}/>
        } 
        else if (tournamentDates.indexOf(date) === tournamentDates.length - 1) {
          return <PointComponent active={activeIndex === index ? true : false} key={index} position={'end'} date={date}/>
        } 
        else if (index === datesOnTimeline.length - 1) {
          return <PointComponent active={activeIndex === index ? true : false} key={index} position={'end-more'} date={date}/>
        } 
        else {
          return <PointComponent active={activeIndex === index ? true : false} key={index} date={date}/>
        }
      })}
    </div>
  );
}
 
export default TournamentsTimeline;