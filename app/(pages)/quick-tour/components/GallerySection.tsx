import { QuickTourGallery } from "./QuickTourGallery";

export function GallerySection() {
    return (
        <section className="relative w-full  py-16">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="mt-2 font-sans text-3xl font-black uppercase tracking-tight text-foreground sm:text-4xl">
                        Campus Gallery
                    </h1>
                    <p className="mt-1 text-base text-muted-foreground">
                        A glimpse in to our class room, training area, and campus.
                    </p>
                </div>
                <div className="mt-12">
                    <QuickTourGallery />
                </div>
            </div>
        </section>
    );
}