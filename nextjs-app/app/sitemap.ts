import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { allPagesQuery, allPostsQuery } from "@/sanity/lib/queries";
import { headers } from 'next/headers';

// TODO change Frequency accordingly
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const allPosts = await sanityFetch({query: allPostsQuery});
    const allPages = await sanityFetch({query: allPagesQuery});
    const headersList = await headers();
    const sitemap: MetadataRoute.Sitemap = [];
    const domain: String = headersList.get("host") as string;
    sitemap.push({
        url: domain as string,
        lastModified: new Date(),
        priority: 1,
        changeFrequency: "monthly"
    })

    if (allPosts != null && allPosts.data.length != 0) {
        for (const p of allPosts.data) {
            sitemap.push({
                lastModified: new Date(),
                priority: .5,
                changeFrequency: "never",
                url: `${domain}/posts/${p.slug}`
            });
        }
    }

    if (allPosts != null && allPages.data.length != 0) {
        for (const p of allPages.data) {
            sitemap.push({
                lastModified: new Date(),
                priority: .8,
                changeFrequency: "monthly",
                url: `${domain}/${p.slug}`
            });
        }
    }

    return sitemap
}