import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { POSTS_QUERY, PESTS_QUERY, SERVICE_AREAS_QUERY } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://pestcontrolnoida.in'

    // Fetch all dynamic routes
    const posts = await client.fetch(POSTS_QUERY)
    const pests = await client.fetch(PESTS_QUERY)
    const areas = await client.fetch(SERVICE_AREAS_QUERY)

    const postUrls = posts.map((post: any) => ({
        url: `${baseUrl}/articles/${post.slug.current}`,
        lastModified: new Date(post.publishedAt || new Date()),
    }))

    const pestUrls = pests.map((pest: any) => ({
        url: `${baseUrl}/pest-library/${pest.slug.current}`,
        lastModified: new Date(),
    }))

    const areaUrls = areas.map((area: any) => ({
        url: `${baseUrl}/service-areas/${area.slug.current}`,
        lastModified: new Date(),
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/pest-library`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/service-areas`,
            lastModified: new Date(),
        },
        ...postUrls,
        ...pestUrls,
        ...areaUrls,
    ]
}
