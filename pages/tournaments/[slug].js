import { getTournamentUrls, getTournamentDetails } from "../../services";
import { useRouter } from 'next/router'
import Head from "next/head";
import moment from "moment";
import Image from "next/image";
import { ChipText } from "../../components";
import { useState, useEffect } from "react";
import getTimeleft from "../../helpers/timerHelper";

export default function TournamentPage({tournament}) {
  const [isAwards, setIsAwards] = useState(true)
  const [datesOnTimeline, setDatesOnTimeline] = useState([])
  const [closestDate, setClosestDate] = useState('')
  const [closestDateFormatted, setClosestDateFormatted] = useState({days: 0, hours: 0, minutes: 0, seconds: 0})

  useEffect(() => {
    const checkDates = () => {
      const upcomingDates = []
      const currentDate = moment()

      tournament.date.forEach((date, index) => {
        if (moment(date).isAfter(currentDate) && upcomingDates.length < 5) {
          upcomingDates.push(date)
        }
      })

      upcomingDates.sort((a,b) => {
        return new Date(a) - new Date(b)
      })
      
      const closestDate = upcomingDates[0]
      
      //check if the index is different than 0 and either add 1 at the beginning or add 1 to the end
      // const datesIndex = tournament.date.indexOf(closestDate)

      setDatesOnTimeline(upcomingDates)
      setClosestDate(closestDate)
    }
    checkDates()
  }, [tournament.date])

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const time = getTimeleft(closestDate)
      setClosestDateFormatted(time)
    }, 1000)
    return () => clearInterval(timerInterval)
  }, [closestDate])

  const router = useRouter()
  if (router.isFallback) {
    return <h1>Loading</h1>
  }

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
      <Head>
        <title>COMPNITE.PL - Fortnite Competitive</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="my-8 md:my-16 container mx-auto bg-white h-full rounded shadow-lg py-6 px-4 md:px-6 lg:px-12 xl:px-36 space-y-8">
        <h2 className="text-2xl uppercase font-semibold text-center">{tournament.name}</h2>

        <div className="flex my-6 flex-row overflow-x-auto md:justify-center">
          {datesOnTimeline.map((date, index) => {
            if (index === 0) {
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-center">
                    <div className="h-2 w-16 bg-transparent"></div>
                    <div className="w-6 h-6 bg-green-900 rounded-full"></div>
                    <div className="h-2 w-16 bg-green-100"></div>
                  </div>
                  <span className="font-semibold mt-2 text-gray-600">{moment(date).format('HH:mm, DD.MM')}</span>
                </div>
              )
            } 
            else if (tournament.date.indexOf(date) === tournament.date.length - 1) {
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-center">
                    <div className="h-2 w-16 bg-green-100"></div>
                    <div className="w-6 h-6 bg-green-100 rounded-full border-4 border-white"></div>
                    <div className="h-2 w-16 bg-transparent"></div>
                  </div>
                  <span className="mt-2 text-gray-600">{moment(date).format('HH:mm, DD.MM')}</span>
                </div>
              )
            } 
            else if (index === datesOnTimeline.length - 1) {
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-center">
                    <div className="h-2 w-16 bg-green-100"></div>
                    <div className="w-6 h-6 bg-green-100 rounded-full border-4 border-white"></div>
                    <div className="h-2 w-16 bg-gradient-to-r from-green-100 to-white"></div>
                  </div>
                  <span className="mt-2 text-gray-600">{moment(date).format('HH:mm, DD.MM')}</span>
                </div>
              )
            } 
            
            else {
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-center">
                    <div className="h-2 w-16 bg-green-100"></div>
                    <div className="w-6 h-6 bg-green-100 rounded-full border-4 border-white"></div>
                    <div className="h-2 w-16 bg-green-100"></div>
                  </div>
                  <span className="mt-2 text-gray-600">{moment(date).format('HH:mm, DD.MM')}</span>
                </div>
              )
            }
          })}
        </div>

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
              <p className="text-gray-600">{tournament.description}</p>
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
              <h4 className="uppercase text-center font-semibold text-xl">Startuje za:</h4>
              <div className='mt-2 text-center gap-2 grid grid-cols-4'>
                <div className='w-full'>
                  <span>Dni</span>
                  <div className='p-2 bg-red-600 rounded text-lg font-semibold text-white'>{closestDateFormatted.days}</div>
                </div>
                <div className='w-full'>
                  <span>Godziny</span>
                  <div className='p-2 bg-red-600 rounded text-lg font-semibold text-white'>{closestDateFormatted.hours}</div>
                </div>
                <div className='w-full'>
                  <span>Minuty</span>
                  <div className='p-2 bg-red-600 rounded text-lg font-semibold text-white'>{closestDateFormatted.minutes}</div>
                </div>
                <div className='w-full'>
                  <span>Sekundy</span>
                  <div className='p-2 bg-red-600 rounded text-lg font-semibold text-white'>{closestDateFormatted.seconds}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-black rounded divide-y divide-black">
          <div className="flex divide-x divide-black">
            <button onClick={() => setIsAwards(true)} className={`w-full p-1 ${isAwards ? 'bg-green-900 text-white' : 'bg-green-100'}`}>Nagrody</button>
            <button onClick={() => setIsAwards(false)} className={`w-full p-1 ${isAwards ? 'bg-green-100' : 'bg-green-900 text-white'}`}>Punktacja</button>
          </div>
          <div className="p-2 grid grid-cols-2 gap-2">
            {isAwards ? <AwardsComponent/> : <ScoringComponent/>}
          </div>
        </div>

        <div className="flex gap-4">
          {tournament.linkToRegister ? <a href={tournament.linkToRegister} target={"_blank"} rel="noreferrer" className="bg-green-900 p-2 rounded text-white text-center font-semibold w-full">Rejestracja</a> : null}
          {tournament.linkToTable ? <a href={tournament.linkToTable} target={"_blank"} rel="noreferrer" className="bg-green-900 p-2 rounded text-white text-center font-semibold w-full">Tabela</a> : null}
        </div>
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