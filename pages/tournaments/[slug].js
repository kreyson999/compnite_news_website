import { getTournamentUrls, getTournamentDetails } from "../../services";
import { useRouter } from 'next/router'
import Head from "next/head";
import moment from "moment";
import Image from "next/image";
import { ChipText } from "../../components";
import { useState } from "react";

export default function TournamentPage({tournament}) {

  const [isAwards, setIsAwards] = useState(true)

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
      <div className="my-14 container mx-auto bg-white h-full rounded shadow-lg py-6 px-4 md:px-6 lg:px-12 xl:px-36 space-y-6">
        <h2 className="text-2xl uppercase font-semibold text-center">{tournament.name}</h2>

        <div className="flex my-6 justify-center flex-row overflow-x-auto">
          {tournament.date.map((date, index) => {
            if (index === 0) {
              return (
                <div className="flex flex-col" key={index}>
                  <div className="flex items-center">
                    <div className="w-7 h-7 bg-green-900 rounded-full "></div>
                    <div className="h-2 w-24 bg-green-100"></div>
                  </div>
                  <p className="mt-1 font-semibold relative -left-7 text-gray-600">{moment(date).format('HH:mm, DD.MM')}</p>
                </div>
              )
            } 
            else if (index === tournament.date.length - 1) {
              return (
                <div className="flex flex-col" key={index}>
                  <div className="flex items-center">
                    <div className="w-7 h-7 bg-green-100 rounded-full border-4 border-white"></div>
                  </div>
                  <p className="mt-1 relative -left-7 text-gray-600">{moment(date).format('HH:mm, DD.MM')}</p>
                </div>
              )
            } else {
              return (
                <div className="flex flex-col" key={index}>
                  <div className="flex items-center">
                    <div className="w-7 h-7 bg-green-100 rounded-full border-4 border-white"></div>
                    <div className="h-2 w-24 bg-green-100"></div>
                  </div>
                  <p className="mt-1 relative -left-7 text-gray-600">{moment(date).format('HH:mm, DD.MM')}</p>
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
            />
          </div>
          <div className="md:col-span-5 md:h-96 flex items-start flex-col space-y-1 md:space-y-3">
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