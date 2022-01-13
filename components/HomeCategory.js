import { PostCard, SectionTitle } from ".";
import { useState, useEffect } from "react";
import { getPostsByCategory } from "../services";

const HomeCategory = ({category}) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      const postsByCategory = await getPostsByCategory(category, 'siema', 4);
      setPosts(postsByCategory)
    }
    fetchPostsByCategory();

  }, [category])

  return (
    <div className="col-span-1 md:col-span-12">
      <SectionTitle border text={`Z kategorii: `} category={category}/>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {posts.length >= 1 ? posts.map(post => <PostCard small={true} key={post.title} post={post}/>) : <h4 className="col-span-5 md:my-2 md:my-8 text-red-600 font-semibold mx-auto">Wystąpił problem przy pobieraniu z bazy danych lub nie ma jeszcze postów w tej kategorii. Przepraszamy!</h4>}
      </div>
    </div>
  );
}
 
export default HomeCategory;