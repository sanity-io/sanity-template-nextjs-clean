import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery } from "@/sanity/lib/queries";
import { headers } from 'next/headers';


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { data } = await sanityFetch({query: allPostsQuery});
    const headersList = await headers();
    const sitemap: MetadataRoute.Sitemap = [];

    sitemap.push({
        url: headersList.get("host") as string,
        lastModified: new Date(),
        priority: 1,
        changeFrequency: "monthly" // Change accordingly
    })

    if (data.length != 0) {
        for (const p of data) {
            sitemap.push({
                lastModified: new Date(),
                priority: .8,
                changeFrequency: "never",
                url: `posts/${p.slug}`
            })
        }
    }

    return sitemap
}