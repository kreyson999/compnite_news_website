import moment from "moment";

const PointComponent = ({position, date}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <div className={`h-2 w-16 ${position === 'start' ? 'bg-transparent' : 'bg-green-100'}`}></div>
        <div className={`w-6 h-6 rounded-full ${position === 'start' ? 'bg-green-900' : 'bg-green-100 border-4 border-white' }`}></div>
        <div className={`h-2 w-16 ${position === 'end' ? 'bg-transparent' : 'bg-green-100'} ${position === 'end-more' ? 'bg-gradient-to-r from-green-100 to-white' : null}`}></div>
      </div>
      <span className={`${position === 'start' ? 'font-semibold' : null} mt-2 text-gray-600`}>{moment(date).format('HH:mm, DD.MM')}</span>
    </div>
  )
}

const TournamentsTimeline = ({tournamentDates, datesOnTimeline}) => {
  return (
    <div className="flex my-6 flex-row overflow-x-auto md:justify-center">
      {datesOnTimeline.map((date, index) => {
        if (index === 0) {
          return <PointComponent key={index} position={'start'} date={date}/>
        } 
        else if (tournamentDates.indexOf(date) === tournamentDates.length - 1) {
          return <PointComponent key={index} position={'end'} date={date}/>
        } 
        else if (index === datesOnTimeline.length - 1) {
          return <PointComponent key={index} position={'end-more'} date={date}/>
        } 
        
        else {
          return <PointComponent key={index} date={date}/>
        }
      })}
    </div>
  );
}
 
export default TournamentsTimeline;