import Image from "next/image";
import { FormattedDate, CategoryBox, Sidebar, PostContent, HomeCategory } from "../../components";
import { getPostDetails, getPostUrls } from "../../services";

export default function PostPage({post}) {
  return (
    <>
      <header className='container mx-auto px-2 py-8 md:py-12 lg:px-32 text-center grid place-items-center'>
        <FormattedDate date={post.createdAt}/>
        <h1 className="font-bold text-xl md:text-2xl md:mb-2">{post.title}</h1>
        <CategoryBox category={post.category.name}/>
      </header>
      <div className="bg-white w-full py-6 md:py-12">
        <div className="container mx-auto px-2">
          <div className='grid grid-cols-1 gap-y-8 md:gap-x-16 md:gap-y-8 md:grid-cols-12'>
            <main className='col-span-1 md:col-span-8 space-y-8'>
              <Image
              src={post.image.url}
              alt={post.title}
              width={1280}
              height={720}
              className="rounded"
              />
              <PostContent content={post.content}/>
            </main>
            <Sidebar category={post.category.name} postSlug={post.slug}/>
            <HomeCategory category={"Wygrane"}/>
            <HomeCategory category={"Meta"}/>
            <HomeCategory category={"Turnieje"}/>
            <HomeCategory category={"Gracze"}/>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({ params }) { 
  const data = await getPostDetails(params.slug)
  return {
     props: { post: data }
  }
}

export async function getStaticPaths() {
  const urls = await getPostUrls()

  return {
    paths: urls.map(({ node: {slug}}) => ({params: { slug }})),
    fallback: true,
  }
}