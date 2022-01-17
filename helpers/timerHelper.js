import moment from 'moment';

export default function getTimeleft(date) {
  const currentDate = moment()
  let difference = moment(date).diff(currentDate)
  
  let days = Math.floor(difference / (1000 * 60 * 60 * 24))
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  return {days, hours, minutes, seconds}
}