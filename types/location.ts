type Address = {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

type Location = {
    name: string;
    address: Address;
    phone: string;
    email: string;
    website: string;
}


type Testimonial = {
    id: string;
    name: string;
    location: string;
    avatarSrc: string;
    text: string;
}

export type { Location, Testimonial };