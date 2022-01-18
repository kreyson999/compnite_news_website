import moment from "moment"

export default function getClosestDate(dates) {
  const currentDate = moment()
  const upcomingDates = []
  dates.forEach(date => {
    if (moment(date).isAfter(currentDate) && upcomingDates.length < 5) {
      upcomingDates.push(date)
    }
  })

  upcomingDates.sort((a,b) => {
    return new Date(a) - new Date(b)
  })
  
  return upcomingDates[0]
}