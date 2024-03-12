/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    // Used to guard against accidentally leaking SANITY_API_READ_TOKEN to the browser
    taint: true,
  },
  logging: {
    fetches: { fullUrl: false },
  },
  images: { remotePatterns: [{ hostname: 'cdn.sanity.io' }] },
}

export default config
