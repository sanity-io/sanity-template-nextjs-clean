import Image from "next/image";

import { getPageQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export default async function Page() {

  const { data: pageData } = await sanityFetch({
    query: getPageQuery,
    params: { slug: "home" }, // Assuming your home page has slug "home"
  });

  // Fallback data if no page is found
  const data = pageData || {
    title: "Welcome",
    heroText: "Your Hero Text Here",
    services: [],
    carouselImages: [],
    testimonials: [],
    contactInfo: {
      phone: "",
      email: "",
      address: "",
    },
  };

  return (
    <div className="text-gray-800">
      <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold">{data.title || "Your Business"}</h1>
        <nav>
          <a href="#services" className="mx-2">Services</a>
          <a href="#gallery" className="mx-2">Gallery</a>
          <a href="#contact" className="mx-2">Contact</a>
        </nav>
      </header>

      {data.heroImage && (
        <section className="relative h-[60vh]">
          <Image
            src={urlFor(data.heroImage).width(1200).url()}
            fill
            alt="Hero"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-4xl text-white font-bold">{data.heroText}</h2>
          </div>
        </section>
      )}

      {data.services && data.services.length > 0 && (
        <section id="services" className="py-12 px-6 bg-gray-50">
          <h3 className="text-3xl font-semibold text-center mb-8">Our Services</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {data.services.map((service: any, i: number) => (
              <div key={i} className="bg-white p-4 rounded shadow">
                {service.icon && (
                  <Image
                    src={urlFor(service.icon).width(100).url()}
                    alt={service.title}
                    width={100}
                    height={100}
                  />
                )}
                <h4 className="text-xl font-semibold">{service.title}</h4>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.carouselImages && data.carouselImages.length > 0 && (
        <section id="gallery" className="py-12 px-6">
          <h3 className="text-3xl font-semibold text-center mb-8">Previous Jobs</h3>
          <div className="flex gap-4 overflow-x-scroll">
            {data.carouselImages.map((img: any, i: number) => (
              <div key={i} className="min-w-[300px]">
                <Image
                  src={urlFor(img).width(600).url()}
                  alt={`Job ${i + 1}`}
                  width={300}
                  height={200}
                  className="rounded shadow"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {data.testimonials && data.testimonials.length > 0 && (
        <section className="py-12 px-6 bg-gray-100">
          <h3 className="text-3xl font-semibold text-center mb-8">What Our Clients Say</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {data.testimonials.map((t: any, i: number) => (
              <div key={i} className="bg-white p-4 rounded shadow">
                <p className="italic">"{t.quote}"</p>
                <p className="mt-2 text-sm text-right">— {t.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.contactInfo && (
        <section id="contact" className="py-12 px-6 bg-blue-50">
          <h3 className="text-3xl font-semibold text-center mb-8">Contact Us</h3>
          <div className="max-w-lg mx-auto text-center">
            {data.contactInfo.phone && <p>📞 {data.contactInfo.phone}</p>}
            {data.contactInfo.email && <p>📧 {data.contactInfo.email}</p>}
            {data.contactInfo.address && <p>📍 {data.contactInfo.address}</p>}
          </div>
        </section>
      )}

      <footer className="bg-gray-900 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} {data.title || "Your Business"}. All rights reserved.</p>
      </footer>
    </div>
  );
}
