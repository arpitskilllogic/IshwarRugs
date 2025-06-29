import { Link } from "wouter";
import type { Collection } from "@shared/schema";

interface CollectionGridProps {
  collections: Collection[];
  title?: string;
  showAll?: boolean;
}

export default function CollectionGrid({ collections, title, showAll = false }: CollectionGridProps) {
  const displayCollections = showAll ? collections : collections.slice(0, 6);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {title && (
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-primary-brown mb-16">
            {title}
          </h2>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCollections.map((collection) => (
            <Link 
              key={collection.id} 
              href={`/collections/${collection.slug}`}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={collection.heroImage}
                  alt={collection.name}
                  className="w-full h-64 object-cover image-hover-scale"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-primary-brown mb-2 group-hover:text-warm-gold transition-colors">
                {collection.name.toUpperCase()}
              </h3>
              <p className="text-primary-brown opacity-80 leading-relaxed">
                {collection.shortDescription || collection.description}
              </p>
            </Link>
          ))}
        </div>

        {!showAll && collections.length > 6 && (
          <div className="text-center mt-12">
            <Link href="/collections">
              <button className="btn-primary">
                VIEW ALL COLLECTIONS
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
