import { getTournamentUrls, getTournamentDetails } from "../../services";
import { useRouter } from 'next/router'
import Head from "next/head";
import moment from "moment";
import Image from "next/image";
import { ChipText, Loader, TournamentsTimeline } from "../../components";
import { useState, useEffect } from "react";
import { TournamentTimer } from "../../components";
import getClosestDate from "../../helpers/getClosestDate";


const TournamentMainSection = ({tournament}) => {

  const [isAwards, setIsAwards] = useState(true)
  const [closestDate, setClosestDate] = useState('')
  const [isEnded, setIsEnded] = useState(false)

  useEffect(() => {
    const checkDates = () => {
      if (tournament.date === undefined) return
      const currentDate = moment()
      // check if the tournament is ended or not
      if (moment(tournament.date[tournament.date.length-1]).isAfter(currentDate)) {
        // get closest date from helper
        const closestDate = getClosestDate(tournament.date)
        setClosestDate(closestDate)
      } else {
        // if last date is before current date than just set closest date to the last date of tournament
        setClosestDate(tournament.date[tournament.date.length-1])
        setIsEnded(true)
      }
    }
    checkDates()
  }, [tournament.date])

  const AwardsComponent = () => {
    if (tournament.prizepool.length > 0) {
      return tournament.prizepool.map((prize, index) => {
        return (
          <div key={index} className="bg-green-100 px-2 py-1 font-semibold rounded">
            {prize}
          </div>
        )
      })
    } else {
      return <div className="col-span-2 text-center text-red-600 my-2">Prawdopodobnie nie dodaliśmy jeszcze nagród dla tego turnieju. Przepraszamy za utrudnienia!</div>
    }
  }
  
  const ScoringComponent = () => {
    if (tournament.scoring.length > 0) {
      return tournament.scoring.map((score, index) => {
        return (
          <div key={index} className="bg-green-100 px-2 py-1 font-semibold rounded">
            {score}
          </div>
        )
      })
    } else {
      return <div className="col-span-2 text-center text-red-600 my-2">Prawdopodobnie nie dodaliśmy jeszcze punktacji dla tego turnieju. Przepraszamy za utrudnienia!</div>
    }
  }

  return (
    <>
      <h2 className="text-2xl uppercase font-semibold text-center">{tournament.name}</h2>

      <TournamentsTimeline tournamentDates={tournament.date} closestDate={closestDate}/>

      <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-7 gap-4 md:gap-10">
        <div className="relative md:col-span-2 shadow-lg">
          <Image
            src={tournament.image.url}
            alt={tournament.name}
            objectFit='cover'
            layout="fill"
            className="rounded"
            priority
          />
        </div>
        <div className="md:col-span-5 flex items-start justify-between flex-col space-y-4 md:space-y-12">
          <div className="space-y-1">
            <h3 className="font-semibold text-2xl md:text-3xl">{tournament.name.toUpperCase()}</h3>
            <ChipText text={tournament.mode.toUpperCase()}/>
            <p className="text-gray-600 hidden md:block">{tournament.description}</p>
            <div className="flex flex-col items-start">
              <span className="font-semibold">Wymagana ranga:</span>
              <span className="mt-1"><ChipText text={tournament.requiredArenaRank.toUpperCase()}/></span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold">Organizator:</span>
              <span className="mt-1"><ChipText text={tournament.tournamentSource}/></span>
            </div>
          </div>
          <div className="w-full md:w-fit">
            {isEnded ? (
              <>
                <h5 className='text-lg text-center'>Zwyciezca:</h5>
                <div className='mt-2 py-2 px-4 text-center bg-green-600 rounded text-lg font-semibold text-white select-none '>{tournament.winner ?? 'TDA'}</div>
              </>
            ) : (
              <>
              <h4 className="uppercase text-center font-semibold text-xl">Startuje za:</h4>
              <div className='mt-2 text-center gap-2 grid grid-cols-4 select-none'>
                <TournamentTimer time={closestDate} full/>
              </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="border border-black rounded divide-y divide-black">
        <div className="flex divide-x divide-black">
          <button 
            onClick={() => setIsAwards(true)} 
            className={`w-full p-1 ${isAwards ? 'bg-green-900 text-white' : 'bg-green-100'}`}
          >Nagrody</button>
          <button 
            onClick={() => setIsAwards(false)} 
            className={`w-full p-1 ${isAwards ? 'bg-green-100' : 'bg-green-900 text-white'}`}
          >Punktacja</button>
        </div>
        <div className="p-2 grid grid-cols-2 gap-2">
          {isAwards ? <AwardsComponent/> : <ScoringComponent/>}
        </div>
      </div>

      <div className="flex gap-4">
        {tournament.linkToRegister ? 
        (<a 
          href={tournament.linkToRegister} 
          target={"_blank"} 
          rel="noreferrer" 
          className="bg-green-900 p-2 rounded text-white text-center font-semibold w-full transition duration-500 transform hover:-translate-y-1"
        >
          Rejestracja
        </a>) 
        : null}
        {tournament.linkToTable ? 
        (<a 
          href={tournament.linkToTable} 
          target={"_blank"} 
          rel="noreferrer" 
          className="bg-green-900 p-2 rounded text-white text-center font-semibold w-full transition duration-500 transform hover:-translate-y-1"
        >
          Tabela
        </a>) 
        : null}
      </div>
    </>
  )
}

export default function TournamentPage({tournament}) {
  const router = useRouter()
  if (router.isFallback) {
    return <Loader/>
  }

  return (
    <>
      <Head>
        <title>{`${tournament.name}`} | KJMM.PL</title>
        <meta name="description" content={`${tournament.name} to turniej rozgrywany w trybie ${tournament.mode} przeznaczony dla graczy z rangi ${tournament.requiredArenaRank}. Kliknij, aby dowiedzieć się więcej!`}/>
        
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${tournament.name}`} />
        <meta property="og:description" content={`${tournament.name} to turniej rozgrywany w trybie ${tournament.mode} przeznaczony dla graczy z rangi ${tournament.requiredArenaRank}. Kliknij, aby dowiedzieć się więcej!`} />
        <meta property="og:image" content={`${tournament.image.url}`} />
        <meta property="og:url" content={`https://kjmm.pl/tournaments/${tournament.slug}`} />
        <meta property="og:site_name" content={"KJMM.PL"} />

        <meta name="twitter:title" content={`${tournament.name}`}/>
        <meta name="twitter:description" content={`${tournament.name} to turniej rozgrywany w trybie ${tournament.mode} przeznaczony dla graczy z rangi ${tournament.requiredArenaRank}. Kliknij, aby dowiedzieć się więcej!`} />
        <meta name="twitter:image" content={`${tournament.image.url}`} />
      </Head>
      <div className="my-8 md:my-16 container mx-auto bg-white h-full rounded shadow-lg py-6 px-4 md:px-6 lg:px-12 xl:px-36 space-y-8">
        <TournamentMainSection tournament={tournament}/>
      </div>
    </>
  );
}
 
export async function getStaticProps({ params }) { 
  const data = await getTournamentDetails(params.slug)
  return {
     props: { tournament: data }
  }
}

export async function getStaticPaths() {
  const urls = await getTournamentUrls()

  return {
    paths: urls.map(({ node: {slug}}) => ({params: { slug }})),
    fallback: true,
  }
}