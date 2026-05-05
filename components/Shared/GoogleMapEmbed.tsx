import { cn } from "@/lib/utils";

/** Optional map settings. Lat + lng take precedence over `query` for embed and directions. */
export type GoogleMapConfig = {
    /** Business name or address (used when `lat` and `lng` are not both set). */
    query?: string;
    lat?: string;
    lng?: string;
    zoom?: string | number;
    /** Full iframe `src` from Maps → Share → Embed; overrides query/lat/lng. */
    embedUrl?: string;
};

export const DEFAULT_GOOGLE_MAP_CONFIG = {
    query: "",
    lat: "30.577486",
    lng: "-97.816182",
    zoom: 16,
} as const;

function mergeMapConfig(overrides?: Partial<GoogleMapConfig>) {
    const query = overrides?.query ?? DEFAULT_GOOGLE_MAP_CONFIG.query;
    const zoom = String(overrides?.zoom ?? DEFAULT_GOOGLE_MAP_CONFIG.zoom);
    return {
        query,
        zoom,
        lat: overrides?.lat,
        lng: overrides?.lng,
        embedUrl: overrides?.embedUrl,
    };
}

/** Build embed `src` from config (defaults + optional overrides). */
export function resolveGoogleMapsEmbedSrc(
    config?: Partial<GoogleMapConfig>,
): string {
    const c = mergeMapConfig(config);
    if (c.embedUrl) return c.embedUrl;
    if (c.lat && c.lng) {
        return `https://www.google.com/maps?q=${encodeURIComponent(`${c.lat},${c.lng}`)}&z=${c.zoom}&output=embed`;
    }
    return `https://www.google.com/maps?q=${encodeURIComponent(c.query)}&z=${c.zoom}&output=embed`;
}

/** Directions URL using the same rules as the embed (lat/lng over query). */
export function getGoogleMapsDirectionsUrl(config?: Partial<GoogleMapConfig>): string {
    const c = mergeMapConfig(config);
    if (c.lat && c.lng) {
        return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${c.lat},${c.lng}`)}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.query)}`;
}

export type GoogleMapEmbedProps = GoogleMapConfig & {
    className?: string;
    title?: string;
    /** Desaturate the map (CSS filter). Default `true`. */
    grayscale?: boolean;
};

/**
 * Google Maps iframe — fills **100% width and height** of its parent.
 * Parent must define height (e.g. `h-[20rem]` or `h-[min(52vh,28rem)]`).
 *
 * Configure via props or defaults in {@link DEFAULT_GOOGLE_MAP_CONFIG}.
 */
export function GoogleMapEmbed({
    className,
    title = "Map",
    query,
    lat,
    lng,
    zoom,
    embedUrl,
    grayscale = true,
}: GoogleMapEmbedProps) {
    const mapSrc = resolveGoogleMapsEmbedSrc({
        query,
        lat,
        lng,
        zoom,
        embedUrl,
    });

    return (
        <div className={cn("relative h-full w-full min-h-0", className)}>
            <iframe
                title={title}
                src={mapSrc}
                className={cn(
                    "absolute inset-0 block h-full w-full border-0",
                    grayscale && "grayscale",
                )}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
            />
        </div>
    );
}
