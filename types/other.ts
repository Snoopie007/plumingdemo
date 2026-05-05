export type Address = {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}
export type Location = {
    name: string;
    address: Address;
    phone: string;
    email: string;
    website: string;
}


export type Team = {
    name: string;
    description: string;
    image: string;
}


export type Program = {
    id: string;
    name: string;
    description: string;
    image: string;
}

export type Testimonial = {
    id: string;
    name: string;
    location: string;
    avatarSrc: string;
    text: string;
};

export type MappedSession = {
    id: string;
    name: string;
    minAge: number;
    maxAge: number;
    utcStartTime: Date;
    utcEndTime: Date;
    day: Date;
    isHoliday: boolean;
    isBlocked: boolean;
    holidayName?: string;
    description: string;
}
