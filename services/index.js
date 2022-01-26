import { request, gql } from "graphql-request";


// ####################
// GRAPHCMS
// ####################
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const REVALIDATE_PAGE_TIME = 60 * 30

export const getFeaturedPost = async () => {
  const query = gql`
    query GetFeaturedPost {
      posts(where: {isFeatured: true}) {
        createdAt
        category {
          name
        }
        excerpt
        image {
          url
        }
        slug
        title
      }
    }
  `

  try {
    const result = await request(graphqlAPI, query)
    return result.posts
  } catch (error) {
    throw Error('There is some problem with fetching featured post')
  }
}

export const getRecentPosts = async () => {
  const query = gql`
    query getRecentPost {
      posts(first: 12, orderBy: createdAt_DESC) {
        createdAt
        image {
          url
        }
        slug
        title
        category {
          name
        }
      }
    }
  `

  try {
    const result = await request(graphqlAPI, query)
    return result.posts
  } catch (error) {
    throw Error('There is some problem with fetching recent post')
  }
}

export const getAllTournaments = async () => {
  const query = gql`
    query getUpcomingTournaments {
      tournaments(orderBy: date_ASC) {
        slug
        name
        image {
          url
        }
        date
        tournamentSource
        linkToRegister
        mode
        requiredArenaRank
        prizepool
        prizeType
        winner
      }
    }
  `

  try {
    const result = await request(graphqlAPI, query)
    return result.tournaments
  } catch (error) {
    throw Error('There is some problem with fetching recent post')
  }
}

export const getPostsByCategory = async (category, slug, quantity = 3) => {
  const query = gql`
    query GetPostsByCategory($category: String!, $slug: String!, $quantity: Int!) {
      posts(orderBy: createdAt_DESC, where: {category: {name: $category}, slug_not: $slug}, first: $quantity) {
        createdAt
        excerpt
        image {
          url
        }
        title
        slug
        category { name }
      }
    }
  `

  try {
    const result = await request(graphqlAPI, query, { category, slug, quantity })
    return result.posts
  } catch (error) {
    throw Error('There is some problem with fetching latest posts by category')
  }
}

export const getPostUrls = async () => {
  const query = gql`
  query MyQuery {
    postsConnection {
      edges {
        node {
          slug
        }
      }
    }
  }
  `
  try {
    const result = await request(graphqlAPI, query)
    return result.postsConnection.edges
  } catch (error) {
    throw Error('There is some problem with fetching urls of post')
  }
}

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: {slug: $slug}) {
        category {
          name
        }
        createdAt
        image {
          url
        }
        slug
        title
        content {
          raw
        }
        excerpt
      }
    }
  `
  try {
    const result = await request(graphqlAPI, query, { slug: slug})
    return result.post
  } catch (error) {
    throw Error(`There is some problem with fetching urls of post ${error}`)
  }
}

export const getTournamentUrls = async () => {
  const query = gql`
  query MyQuery {
    tournamentsConnection {
      edges {
        node {
          slug
        }
      }
    }
  }
  `
  try {
    const result = await request(graphqlAPI, query)
    return result.tournamentsConnection.edges
  } catch (error) {
    throw Error('There is some problem with fetching urls of tournament')
  }
}

export const getTournamentDetails = async (slug) => {
  const query = gql`
    query GetTournamentDetails($slug: String!) {
      tournament(where: {slug: $slug}) {
        slug
        createdAt
        date
        description
        image {
          url
        }
        linkToRegister
        linkToTable
        mode
        name
        prizeType
        prizepool
        requiredArenaRank
        tournamentSource
        scoring
        winner
      }
    }
  `
  try {
    const result = await request(graphqlAPI, query, { slug: slug})
    return result.tournament
  } catch (error) {
    throw Error(`There is some problem with fetching details of tournament ${error}`)
  }
}
export const getTournamentById = async (id) => {
  const query = gql`
    query GetTournamentById($id: ID!) {
      tournament(where: {id: $id}) {
        name
        date
        image {
          url
        }
        mode
        linkToRegister
        prizeType
        requiredArenaRank
        slug
        tournamentSource
        prizepool
      }
    }
  `
  try {
    const result = await request(graphqlAPI, query, { id: id})
    return result.tournament
  } catch (error) {
    throw Error(`There is some problem with fetching tournament by id ${error}`)
  }
}
export const getPostById = async (id) => {
  const query = gql`
    query GetPostById($id: ID!) {
      post(where: {id: $id}) {
        createdAt
        image {
          url
        }
        slug
        title
        category {
          name
        }
      }
    }
  `
  try {
    const result = await request(graphqlAPI, query, { id: id})
    return result.post
  } catch (error) {
    throw Error(`There is some problem with fetching post by id ${error}`)
  }
}


// ####################
// OTHER
// ####################

export const getCurrentStreams = async () => {
  const result = await fetch('https://api.twitch.tv/helix/streams?first=5&language=pl&game_id=33214', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer hwgn5vgqkph3q7w23l2sfoqnvtcw9f',
      'Client-ID': '66meobmthrxx03z1t6nnyu0k4e557y',
    },
  })
  return result.json()
}