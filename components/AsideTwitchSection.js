import { useEffect, useState } from "react";
import { SectionTitle, TwitchAsideCard } from ".";
import { getCurrentStreams } from "../services";

const AsideTwitchSection = () => {
  const [currentStreams, setCurrentStreams] = useState([])

  useEffect(() => {
    fetchStreams()
  }, [])

  const fetchStreams = async () => {
    const streams = await getCurrentStreams()
    setCurrentStreams(streams.data)
  } 

  return (
  <>
    <SectionTitle text={"Aktualnie na żywo"} border/>
    <div className='space-y-2 mb-4'>
      {currentStreams.length >= 1 ? currentStreams.map(stream => (
      <TwitchAsideCard 
      key={stream.id}
      name={stream.user_name}
      viewer_count={stream.viewer_count}
      link={`https://twitch.tv/${stream.user_login}`}
      />
      )) : (
      <h4 
      className="col-span-5 md:my-2 md:my-8 text-red-600 font-semibold mx-auto"
      >Wystąpił problem przy pobieraniu streamów z bazy danych. Przepraszamy!
      </h4>
      )}
    </div>
  </>
  );
}
 
export default AsideTwitchSection;