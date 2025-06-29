import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { api } from "@/lib/api";
import CollectionGrid from "@/components/collection-grid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Collections() {
  const [location] = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Parse URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.split("?")[1] || "");
    const category = searchParams.get("category");
    if (category) {
      setActiveCategory(category);
    }
  }, [location]);

  const { data: allCollections, isLoading: allLoading } = useQuery({
    queryKey: ["/api/collections"],
    queryFn: api.collections.getAll,
  });

  const { data: contemporaryCollections, isLoading: contemporaryLoading } = useQuery({
    queryKey: ["/api/collections/category/contemporary"],
    queryFn: () => api.collections.getByCategory("contemporary"),
    enabled: activeCategory === "contemporary",
  });

  const { data: modernCollections, isLoading: modernLoading } = useQuery({
    queryKey: ["/api/collections/category/modern"],
    queryFn: () => api.collections.getByCategory("modern"),
    enabled: activeCategory === "modern",
  });

  const { data: traditionalCollections, isLoading: traditionalLoading } = useQuery({
    queryKey: ["/api/collections/category/traditional"],
    queryFn: () => api.collections.getByCategory("traditional"),
    enabled: activeCategory === "traditional",
  });

  const getDisplayData = () => {
    switch (activeCategory) {
      case "contemporary":
        return { collections: contemporaryCollections, loading: contemporaryLoading };
      case "modern":
        return { collections: modernCollections, loading: modernLoading };
      case "traditional":
        return { collections: traditionalCollections, loading: traditionalLoading };
      default:
        return { collections: allCollections, loading: allLoading };
    }
  };

  const { collections, loading } = getDisplayData();

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case "contemporary":
        return "CONTEMPORARY COLLECTIONS";
      case "modern":
        return "MODERN COLLECTIONS";
      case "traditional":
        return "TRADITIONAL COLLECTIONS";
      default:
        return "ALL COLLECTIONS";
    }
  };

  const getCategoryDescription = () => {
    switch (activeCategory) {
      case "contemporary":
        return "The bridge between past and present, these collections combine traditional design elements with contemporary aesthetics.";
      case "modern":
        return "Current and cutting-edge designs that reflect new thematic, stylistic and color orientations.";
      case "traditional":
        return "Handmade carpets with classic patterns, telling stories through traditional symbolism and motifs.";
      default:
        return "Explore our complete range of handcrafted carpet collections, each designed to stir emotion and transform your space.";
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-soft-gray">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary-brown mb-6">
            {getCategoryTitle()}
          </h1>
          <p className="text-xl text-primary-brown opacity-80 leading-relaxed max-w-4xl mx-auto">
            {getCategoryDescription()}
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-12 border-b border-soft-gray">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
              <TabsTrigger value="all" className="font-semibold">All</TabsTrigger>
              <TabsTrigger value="contemporary" className="font-semibold">Contemporary</TabsTrigger>
              <TabsTrigger value="modern" className="font-semibold">Modern</TabsTrigger>
              <TabsTrigger value="traditional" className="font-semibold">Traditional</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-brown"></div>
          </div>
        ) : collections && collections.length > 0 ? (
          <CollectionGrid collections={collections} showAll={true} />
        ) : (
          <div className="max-w-6xl mx-auto px-4 py-20 text-center">
            <h3 className="font-serif text-2xl text-primary-brown mb-4">
              No collections found
            </h3>
            <p className="text-primary-brown opacity-80 mb-8">
              We couldn't find any collections in this category. Please try a different category or browse all collections.
            </p>
            <Button 
              onClick={() => setActiveCategory("all")}
              className="btn-primary"
            >
              VIEW ALL COLLECTIONS
            </Button>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-brown">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-warm-gold mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-cream mb-8 leading-relaxed">
            Our design team can create a custom carpet tailored to your exact specifications. 
            From concept to completion, we'll bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-secondary text-lg px-8 py-4">
              START CUSTOM DESIGN
            </Button>
            <Button 
              variant="outline" 
              className="text-cream border-cream hover:bg-cream hover:text-primary-brown text-lg px-8 py-4"
            >
              CONTACT US
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
