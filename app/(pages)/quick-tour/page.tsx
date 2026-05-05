import { GallerySection } from "./components/GallerySection";
import { TestimonialsSection, BottomCTABox, TwoColumnImgText, TeamSection } from "@/components/Sections";

export default function QuickTourPage() {
    const PageContent = {
        image: "/images/hero-bg.webp",
        headline: "Quick tour of Seven Star Martial Arts",
        description: [
            "Seven Star Martial Arts is an organization that focuses on character-building programs for Kids Martial Arts and Adult Martial Arts.",
            "Whether your goal is fitness, self improvement, or self defense, we’re confident that you’ll find what you’re looking for at our school. Beginners can take solace in our easy-to-learn curriculum designed to teach self defense while embracing the inner strength within.",
            "The magic of martial arts is that it’s designed to accommodate everyone. Regardless of your size or experience, you’ll have everything you need to defend yourself in just a few sessions. Everything after that is just pure intensity, exercise and self development.",

        ],
    }
    return (
        <>
            <TwoColumnImgText
                image={PageContent.image}
                headline={PageContent.headline}
                description={PageContent.description}

                className="bg-sky-800 text-white"
            />
            <GallerySection />
            <TeamSection />
            <TestimonialsSection className="bg-gray-50" />
            <BottomCTABox className="bg-gray-50" />
        </>
    );
}