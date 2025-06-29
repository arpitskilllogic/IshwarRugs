import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CollectionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: collection, isLoading: collectionLoading, error } = useQuery({
    queryKey: [`/api/collections/${slug}`],
    queryFn: () => api.collections.getBySlug(slug!),
    enabled: !!slug,
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: [`/api/products/collection/${collection?.id}`],
    queryFn: () => api.products.getByCollection(collection!.id),
    enabled: !!collection?.id,
  });

  if (collectionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-brown"></div>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-primary-brown mb-4">Collection Not Found</h1>
          <p className="text-primary-brown opacity-80 mb-8">
            The collection you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/collections">
            <Button className="btn-primary">
              VIEW ALL COLLECTIONS
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = collection.galleryImages || [collection.heroImage];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-soft-gray py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-primary-brown hover:text-warm-gold transition-colors">
              Home
            </Link>
            <span className="text-primary-brown opacity-50">/</span>
            <Link href="/collections" className="text-primary-brown hover:text-warm-gold transition-colors">
              Collections
            </Link>
            <span className="text-primary-brown opacity-50">/</span>
            <span className="text-primary-brown font-semibold">{collection.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={`${collection.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                
                {galleryImages.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary-brown"
                      onClick={previousImage}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary-brown"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Navigation */}
              {galleryImages.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto">
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-warm-gold"
                          : "border-transparent hover:border-primary-brown"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Collection Details */}
            <div>
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">
                  {collection.category.charAt(0).toUpperCase() + collection.category.slice(1)}
                </Badge>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-brown mb-4">
                {collection.name.toUpperCase()}
              </h1>
              
              {collection.shortDescription && (
                <p className="text-xl text-warm-gold font-semibold mb-6">
                  {collection.shortDescription}
                </p>
              )}
              
              <p className="text-lg text-primary-brown leading-relaxed mb-8">
                {collection.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="btn-primary w-full sm:w-auto">
                    INQUIRE ABOUT COLLECTION
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full sm:w-auto border-primary-brown text-primary-brown hover:bg-primary-brown hover:text-white">
                    CUSTOM DESIGN REQUEST
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products in Collection */}
      {products && products.length > 0 && (
        <section className="py-20 bg-soft-gray">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center text-primary-brown mb-16">
              PRODUCTS IN THIS COLLECTION
            </h2>
            
            {productsLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-brown"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.images?.[0] || collection.heroImage}
                        alt={product.name}
                        className="w-full h-64 object-cover image-hover-scale"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-semibold text-primary-brown mb-2">
                        {product.name}
                      </h3>
                      <p className="text-primary-brown opacity-80 text-sm mb-4">
                        {product.description}
                      </p>
                      {product.material && (
                        <p className="text-primary-brown text-sm mb-2">
                          <span className="font-semibold">Material:</span> {product.material}
                        </p>
                      )}
                      {product.dimensions && (
                        <p className="text-primary-brown text-sm mb-4">
                          <span className="font-semibold">Dimensions:</span> {product.dimensions}
                        </p>
                      )}
                      {product.colors && product.colors.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.colors.map((color, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {color}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <Link href="/contact">
                        <Button className="w-full btn-primary">
                          INQUIRE ABOUT PRODUCT
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Collections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold text-center text-primary-brown mb-16">
            EXPLORE MORE COLLECTIONS
          </h2>
          <div className="text-center">
            <Link href="/collections">
              <Button className="btn-secondary">
                VIEW ALL COLLECTIONS
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
