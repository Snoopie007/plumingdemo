import Image from "next/image";

/** Placeholder photos from public dummy image hosts (replace with real tour photos later). */
const GALLERY_IMAGES = [
    {
        id: "1",
        src: "https://picsum.photos/seed/ssma-tour-01/600/380",
        width: 600,
        height: 380,
    },
    {
        id: "2",
        src: "https://picsum.photos/seed/ssma-tour-02/520/640",
        width: 520,
        height: 640,
    },
    {
        id: "3",
        src: "https://placehold.co/640x420/f1f5f9/64748b/png?text=Tour",
        width: 640,
        height: 420,
    },
    {
        id: "4",
        src: "https://picsum.photos/seed/ssma-tour-04/600/520",
        width: 600,
        height: 520,
    },
    {
        id: "5",
        src: "https://picsum.photos/seed/ssma-tour-05/560/360",
        width: 560,
        height: 360,
    },
    {
        id: "6",
        src: "https://placehold.co/520x600/e2e8f0/475569/png?text=Studio",
        width: 520,
        height: 600,
    },
    {
        id: "7",
        src: "https://picsum.photos/seed/ssma-tour-07/640/440",
        width: 640,
        height: 440,
    },
] as const;

export function QuickTourGallery() {
    return (
        <div className="columns-1 gap-x-5 sm:columns-2 lg:columns-3">
            {GALLERY_IMAGES.map((item) => (
                <figure
                    key={item.id}
                    className="mb-5 break-inside-avoid overflow-hidden rounded-xl bg-muted shadow-sm ring-1 ring-black/5"
                    style={{ boxDecorationBreak: "clone" }}
                >
                    <Image
                        src={item.src}
                        alt=""
                        width={item.width}
                        height={item.height}
                        className="h-auto w-full object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                    />
                </figure>
            ))}
        </div>
    );
}
