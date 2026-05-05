import { getClients } from "@/sanity/lib/getClient";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERY } from "@/sanity/queries";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    region: string;
    locale: string;
    slug: string;
  }>;
};

function RenderSection({ section }: { section: any }) {
  switch (section._type) {
    case "heroSection": {
      const imageUrl = section.image
        ? urlFor(section.image).width(1200).height(500).url()
        : null;

      return (
        <section style={{ marginTop: "40px" }}>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={section.image?.alt || section.heading}
              style={{
                width: "100%",
                maxWidth: "1000px",
                height: "auto",
                borderRadius: "12px",
              }}
            />
          )}

          <h2>{section.heading}</h2>

          {section.subheading && <p>{section.subheading}</p>}
        </section>
      );
    }

    case "textSection": {
      return (
        <section style={{ marginTop: "40px" }}>
          {section.heading && <h2>{section.heading}</h2>}

          {section.content && <PortableText value={section.content} />}
        </section>
      );
    }

    default:
      return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const client = await getClients();
  const data = await client.fetch(PAGE_QUERY, { slug });

  if (!data) {
    return {
      title: "Page not found",
      description: "This page does not exist",
    };
  }

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const client = await getClients();
  const data = await client.fetch(PAGE_QUERY, { slug });


  if (!data) {
    notFound();
  }

  const imageUrl = data.heroImage
    ? urlFor(data.heroImage).height(200).width(200).url()
    : null;

  return (
    <main style={{ padding: "40px" }}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={data.heroImage?.alt || data.title}
          style={{
            width: "100%",
            maxWidth: "900px",
            height: "auto",
            borderRadius: "12px",
          }}
        />
      )}

      <h1>{data.title}</h1>
      <p>{data.description}</p>

      {data.body && (
        <section style={{ marginTop: "32px" }}>
          <PortableText value={data.body} />
        </section>
      )}

      {data.relatedProducts?.length > 0 && (
        <section style={{ marginTop: "40px" }}>
          <h2>Related Products</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {data.relatedProducts.map((product: any) => (
              <div
                key={product.slug}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <h3>{product.title}</h3>

                {product.price && <p>Price: ₹{product.price}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.sections?.length > 0 && (
        <section style={{ marginTop: "40px" }}>
          <h2>Page Builder Sections</h2>

          {data.sections.map((section: any) => (
            <RenderSection key={section._key} section={section} />
          ))}
        </section>
      )}
    </main>
  );
}
