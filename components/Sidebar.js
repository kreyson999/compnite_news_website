import { useEffect, useState } from "react";
import { AsideTwitchSection, SectionTitle, PostCard, AsideTournamentsSection } from ".";
import { getPostsByCategory } from "../services";

const Sidebar = ({category, postSlug}) => {

  const [categoryPosts, setCategoryPosts] = useState([])

  useEffect(() => {
    if (category) {
      const fetchPostsByCategory = async () => {
        const postsByCategory = await getPostsByCategory(category, postSlug);
        setCategoryPosts(postsByCategory)
      }
      fetchPostsByCategory();
    }
  }, [category,postSlug])

  const RecommendedFromCategory = category && (
    <>
      <SectionTitle text={`Więcej z ${category}`} border/>
      <div className='space-y-2 mb-4'>
        {/* {categoryPosts.map(post => (<PostCard row key={post.title} post={post}/>))} */}
        {categoryPosts.length >= 1 ? categoryPosts.map(post => <PostCard row key={post.title} post={post}/>) : <h4 className="col-span-5 md:my-2 md:my-8 text-red-600 font-semibold mx-auto">Wystąpił problem przy pobieraniu z bazy danych lub nie ma jeszcze postów w tej kategorii. Przepraszamy!</h4>}
      </div>
    </>
  )

  return (
    <aside className='col-span-1 md:col-span-4'>
      {RecommendedFromCategory}
      {/* <AsideTwitchSection /> */}
      {/* <AsideTournamentsSection/> */}
      {/* <SectionTitle text={"Sprawdź gracza"} border />
      <div className='space-y-3'>
        <div className='grid grid-cols-4 gap-3'>
          <input type="text" placeholder='Nick gracza' className='bg-green-100 px-4 py-2 rounded col-span-3 text-lg placeholder:text-gray-600'/>
          <select name="platform" className='bg-green-100 rounded px-1 xl:px-4 py-2 col-span-1'>
            <option value={"pc"}>PC</option>
            <option value={"ps4"}>PS4</option>
            <option value={"xbox"}>XBOX</option>
          </select>
        </div>
        <button className='text-center w-full bg-green-900 text-lg py-2 text-white rounded'>Szukaj...</button>
        <div>
          <h5 className='text-lg font-semibold'>Często wyszukiwani:</h5>
          <ul className="list-disc list-inside ml-2">
            <li>KamiFN1</li>
            <li>Benjyfishy</li>
            <li>Mongraal</li>
            <li>Kubx</li>
            <li>Packo</li>
          </ul>
        </div>
      </div> */}
    </aside>
  );
}
 
export default Sidebar;