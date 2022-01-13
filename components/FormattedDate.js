import moment from 'moment'

const FormattedDate = ({date}) => {

  return (
    <p className='text-gray-600 text-lg md:mb-1 '>{moment(date).format('MMMM DD, YYYY')}</p>
  )

}

export default FormattedDate