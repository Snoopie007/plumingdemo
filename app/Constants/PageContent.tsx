import { Team, Location, Testimonial } from "@/types";


export const location: Location = {
    name: "Seven Star Martial Arts",
    address: {
        line1: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        country: "USA"
    },
    phone: "123-456-7890",
    email: "info@sevenstarmartialarts.com",
    website: "https://www.sevenstarmartialarts.com"
} as const;


export const teams: Team[] = [
    {
        name: "Lil Dragon",
        description:
            "Introduction to focus, coordination, and respect in a fun, age-appropriate class.",
        image: "/images/hero-bg.webp",
    },
    {
        name: "Kids Martial Arts",
        description: "Build confidence and discipline with structured training and positive coaching.",
        image: "/images/hero-bg.webp",
    },
    {
        name: "Teens",
        description:
            "Challenge-level skills, leadership, and fitness for teenage students.",
        image: "/images/hero-bg.webp",
    },

];



export const testimonials: Testimonial[] = [
    {
        id: "1",
        name: "Maria Gonzalez",
        location: "Seven Star Martial Arts, Round Rock",
        avatarSrc: "https://i.pravatar.cc/128?img=32",
        text: "Our son was shy before he started here. The coaches meet kids where they are—patient, clear, and positive. He talks about class all week.",
    },
    {
        id: "2",
        name: "James Patterson",
        location: "Seven Star Martial Arts",
        avatarSrc: "https://i.pravatar.cc/128?img=12",
        text: "Clean school, respectful culture, and real attention to technique. I joined as an adult beginner and never felt out of place.",
    },
    {
        id: "3",
        name: "Priya Nair",
        location: "Seven Star Martial Arts, Round Rock, TX",
        avatarSrc: "https://i.pravatar.cc/128?img=45",
        text: "Five stars for the front desk and instructors. Scheduling is easy, communication is prompt, and my daughter feels safe and challenged.",
    },
    {
        id: "4",
        name: "Chris Delgado",
        location: "Seven Star Martial Arts",
        avatarSrc: "https://i.pravatar.cc/128?img=15",
        text: "Discipline without being harsh. You can tell they care about character as much as kicks and forms.",
    },
    {
        id: "5",
        name: "Hannah Brooks",
        location: "Seven Star Martial Arts, Round Rock",
        avatarSrc: "https://i.pravatar.cc/128?img=9",
        text: "We tried two other schools first. This is the one that clicked—organized classes, consistent coaching, and a community that remembers your name.",
    },
    {
        id: "6",
        name: "Marcus Webb",
        location: "Seven Star Martial Arts",
        avatarSrc: "https://i.pravatar.cc/128?img=68",
        text: "Great energy, great workout. Instructors push you but know when to dial it back. Highly recommend for teens and adults.",
    },
];