import { Loader, PostCard, SectionTitle } from ".";
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
        {posts.length >= 1 ? posts.map(post => <PostCard small={true} key={post.title} post={post}/>) : <Loader colSpan={8}/>}
      </div>
    </div>
  );
}
 
export default HomeCategory;