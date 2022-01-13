import '../styles/globals.css'
import 'moment/locale/pl'

import { Navbar, Footer }  from '../components'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Navbar/>
    <div className='grow'>
      <Component {...pageProps} />
    </div>
    <Footer/>
    </>
  )
}

export default MyApp
