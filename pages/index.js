import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FormattedDate, HomeCategory, PostCard, SectionTitle, Sidebar } from '../components'
import { getFeaturedPost, getRecentPosts } from '../services'

export default function Home({featuredPost, recentPosts}) {
  return (
    <>
      <Head>
        <title>COMPNITE.PL - Fortnite Competitive</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <div className='container mx-auto flex justify-end'>
        <div className='hidden md:block md:space-x-4 md:my-2 md:px-2 '>
          <button>Wygrane</button>
          <button>Gracze</button>
          <button>Meta</button>
          <button>Turnieje</button>
        </div>
      </div> */}
      <header className='container mx-auto px-2 py-4 md:mt-10 lg:px-32'>
        <Link href={`/post/${featuredPost.slug}`}>
          <a className='block md:grid-cols-7 grid grid-rows-2 md:grid-rows-none gap-2 md:gap-16'>
            <div className='relative rounded overflow-hidden grid place-content-center md:col-span-4 shadow-lg'>
              <Image
              src={featuredPost.image.url}
              layout='fill'
              objectFit='cover'
              alt={featuredPost.title}
              priority
              />
            </div>
            <div className='md:py-4 text-center md:text-left md:col-span-3 md:py-0'>
              <FormattedDate date={featuredPost.createdAt}/>
              <h1 className='font-bold text-xl md:text-4xl md:mb-2 line-clamp-3 cursor-pointer'>{featuredPost.title}</h1>
              <p className='text-gray-600 text-normal md:text-lg line-clamp-4 cursor-pointer'>{featuredPost.excerpt}</p>
            </div>
          </a>
        </Link>
      </header>
      <div className='bg-white w-full md:mt-10 py-6 md:py-12'>
        <div className='container mx-auto px-2'>
          <div className='grid grid-cols-1 gap-6 md:gap-x-16 md:gap-y-8 md:grid-cols-12'>
            <main className='col-span-1 md:col-span-8'>
              <SectionTitle text="Ostatnie posty"/>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {recentPosts.map(post => {
                  return <PostCard key={post.title} post={post}/> 
                })}
              </div>
            </main>
            <Sidebar/>
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

export async function getStaticProps() {
  const featuredPosts = await getFeaturedPost();
  const recentPosts = await getRecentPosts();
  return {
    props: {
      featuredPost: featuredPosts[0],
      recentPosts: recentPosts
    }
  }
}