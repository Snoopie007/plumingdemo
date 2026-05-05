import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShopFilters } from "./components/ShopFilters";

export type Product = {
    id: string;
    name: string;
    price_cents: number;
    image_url: string;
}

const products: Product[] = [
    { id: "1", name: "Classic Tee", price_cents: 2500, image_url: "https://picsum.photos/seed/tee/400/400" },
    { id: "2", name: "Hoodie", price_cents: 5500, image_url: "https://picsum.photos/seed/hoodie/400/400" },
    { id: "3", name: "Cap", price_cents: 1800, image_url: "https://picsum.photos/seed/cap/400/400" },
    { id: "4", name: "Joggers", price_cents: 4500, image_url: "https://picsum.photos/seed/joggers/400/400" },
    { id: "5", name: "Tank Top", price_cents: 2000, image_url: "https://picsum.photos/seed/tank/400/400" },
    { id: "6", name: "Shorts", price_cents: 3500, image_url: "https://picsum.photos/seed/shorts/400/400" },
];

export default function ShopPage() {
    return (
        <section className="relative isolate w-full  py-20">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-3xl uppercase font-sans font-black ">
                        Shop our gear & courses
                    </h2>

                    <div className="flex flex-row items-center justify-center">
                        <ShopFilters />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}


function ProductCard({ product }: { product: Product }) {
    return (
        <div className={cn(
            "overflow-hidden hover:shadow-md transition-shadow cursor-pointer",
            "border border-border/60 bg-white rounded-lg overflow-hidden shadow-xs",
        )}>
            <div className="relative aspect-square">
                <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />
            </div>
            <div className="p-4 space-y-0.5">
                <h2 className="font-bold ">{product.name}</h2>
                <p className="text-sm text-muted-foreground ">
                    ${(product.price_cents / 100).toFixed(2)}
                </p>
            </div>
        </div>
    );
}