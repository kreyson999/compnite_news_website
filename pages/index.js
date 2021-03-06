import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FormattedDate, HomeCategory, Loader, PostCard, SectionTitle, Sidebar } from '../components'
import { getFeaturedPost, getRecentPosts, REVALIDATE_PAGE_TIME } from '../services'

export default function Home({featuredPost, recentPosts}) {

  return (
    <>
      <Head>
        <title>KJMM.PL - Fortnite Competitive</title>
        <meta name="description" content={`Najlepsze miejsce dla profesjonalnych graczy Fortnite i nie tylko. Przeczytasz tutaj ciekawe e-sportowe artykuły oraz dowiesz się o najnowszych turniejach Fortnite!`}/>
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="KJMM.PL - Fortnite Competitive" />
        <meta property="og:description" content={`Najlepsze miejsce dla profesjonalnych graczy Fortnite i nie tylko. Przeczytasz tutaj ciekawe e-sportowe artykuły oraz dowiesz się o najnowszych turniejach Fortnite!`}/>
        <meta property="og:url" content={`https://kjmm.pl/`} />
        <meta property="og:site_name" content={"KJMM.PL"} />
        <meta property="og:image" content="/assets/website_card.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>


        <meta name="twitter:title" content="KJMM.PL - Fortnite Competitive" />
        <meta name="twitter:description" content={`Najlepsze miejsce dla profesjonalnych graczy Fortnite i nie tylko. Przeczytasz tutaj ciekawe e-sportowe artykuły oraz dowiesz się o najnowszych turniejach Fortnite!`}/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="/assets/website_card.png" />
      </Head>
      {/* <div className='container mx-auto flex justify-end'>
        <div className='hidden md:block md:space-x-4 md:my-2 md:px-2 '>
          <button>Wygrane</button>
          <button>Gracze</button>
          <button>Meta</button>
          <button>Turnieje</button>
        </div>
      </div> */}
      <header className='max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto px-2 py-4 md:mt-10 lg:px-32'>
        <Link href={`/post/${featuredPost.slug}`}>
          <a className='block md:grid-cols-2 grid grid-rows-2 md:grid-rows-none gap-2 md:gap-8'>
            <div className='relative rounded overflow-hidden grid place-content-center shadow-lg'>
              <Image
              src={featuredPost.image.url}
              layout='fill'
              objectFit='cover'
              alt={featuredPost.title}
              priority
              />
            </div>
            <div className='md:py-4 text-center md:text-left md:py-0'>
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
                {recentPosts.length > 0 ? recentPosts.map(post => {
                  return <PostCard key={post.title} post={post}/> 
                }) : <Loader colSpan={3}/>}
              </div>
            </main>
            <Sidebar/>
            {/* <HomeCategory category={"Wygrane"}/> */}
            {/* <HomeCategory category={"Meta"}/> */}
            <HomeCategory category={"Turnieje"}/>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const featuredPosts = await getFeaturedPost();
  const recentPosts = (await getRecentPosts()) || [];
  return {
    props: {
      featuredPost: featuredPosts[0],
      recentPosts: recentPosts
    },
    revalidate: REVALIDATE_PAGE_TIME
  }
}