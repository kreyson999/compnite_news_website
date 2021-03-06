import Head from 'next/head'
import { TournamentsMainSection } from '../../components';
import { getAllTournaments, REVALIDATE_PAGE_TIME } from '../../services';

export default function TournametsPage({fetchedTournaments}) {
  return (
    <>
      <Head>
        <title>KJMM.PL - Turnieje</title>
        <meta name="description" content={`Wszystkie turnieje Fortnite w jednym miejscu. Klknij, aby zobaczyć!`}/>

        <meta property="og:type" content="website" />
        <meta property="og:title" content="KJMM.PL - Turnieje" />
        <meta property="og:description" content={`Wszystkie turnieje Fortnite w jednym miejscu. Klknij, aby zobaczyć!`}/>
        <meta property="og:url" content={`https://kjmm.pl/tournaments/`} />
        <meta property="og:site_name" content={"KJMM.PL"} />
        <meta property="og:image" content="/assets/website_card.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>

        <meta name="twitter:title" content="KJMM.PL - Turnieje" />
        <meta name="twitter:description" content={`Wszystkie turnieje Fortnite w jednym miejscu. Klknij, aby zobaczyć!`}/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="/assets/website_card.png" />
      </Head>
      <header className='container mx-auto px-2 py-8 md:py-12 lg:px-32 text-center grid place-items-center'>
        <h1 className="font-extrabold text-xl md:text-3xl md:mb-2 uppercase">Turnieje Fortnite</h1>
        <p className='text-gray-600'>Sprawdzaj oficjalne oraz nieoficjalne turnieje Fortnite w jednym miejscu</p>
      </header>
      <div className="bg-white w-full py-6 md:py-12">
        <div className="container mx-auto px-2">
          <div className='grid grid-cols-1 gap-y-8 md:gap-x-16 md:gap-y-8 md:grid-cols-12'>
            <TournamentsMainSection fetchedTournaments={fetchedTournaments}/>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const fetchedTournaments = await getAllTournaments()
  
  return {
    props: {
      fetchedTournaments
    },
    revalidate: REVALIDATE_PAGE_TIME
  }
}
