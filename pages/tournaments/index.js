import Head from 'next/head'
import { TournamentsMainSection } from '../../components';

export default function TournametsPage() {
  return (
    <>
      <Head>
        <title>COMPNITE.PL - Turnieje</title>
      </Head>
      <header className='container mx-auto px-2 py-8 md:py-12 lg:px-32 text-center grid place-items-center'>
        <h1 className="font-bold text-xl md:text-2xl md:mb-2">Oficjalne oraz nieoficjalne turnieje Fortnite w jednym miejscu</h1>
      </header>
      <div className="bg-white w-full py-6 md:py-12">
        <div className="container mx-auto px-2">
          <div className='grid grid-cols-1 gap-y-8 md:gap-x-16 md:gap-y-8 md:grid-cols-12'>
            <TournamentsMainSection/>
          </div>
        </div>
      </div>
    </>
  );
}

