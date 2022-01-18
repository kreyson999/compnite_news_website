import '../styles/globals.css'
import 'moment/locale/pl'

import { Navbar, Footer }  from '../components'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta name="robots" content="index,follow" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0"></meta>
    </Head>
    <Navbar/>
    <div className='grow'>
      <Component {...pageProps} />
    </div>
    <Footer/>
    </>
  )
}

export default MyApp
