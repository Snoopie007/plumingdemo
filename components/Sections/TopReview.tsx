import Image from "next/image";
import { SlotCounter, SolidStarRow } from "@/components/ui";
import { cn } from "@/lib/utils";
type Review = {
    name: string;
    title: string;
    review: string;
    image: string;
};


const reviews: Review[] = [
    {
        name: "John Doe",
        title: "Mom",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        image: "https://i.pravatar.cc/400?img=32",
    },

    {
        name: "John Doe",
        title: "Mom",
        review: "I want to give a HUGE shout out for Seven Star Martial Arts (SSMA) in Round Rock. In addition to physical fitness, my daughter has also been learning discipline, integrity, respect, team work, and more. Personally, I have dropped 2 dress sizes, have more strength…",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },

    {
        name: "John Doe",
        title: "Mom",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        image: "https://i.pravatar.cc/400?img=68",
    },
]
const DummyData = {
    reviewCount: 52,
    averageRating: 4.5,
    totalCustomers: 5200,
    reviews
}

export function TopReviewSection() {

    return (
        <section className="relative w-full ">
            <div
                className={cn("relative z-0 bg-primary pt-14 pb-50")}
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 4rem), 50% 100%, 0 calc(100% - 4rem))",
                }}
            >
                <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 pb-6 items-center">
                    <div className="text-center text-white">
                        <div className="font-sans text-4xl font-black space-y-2">
                            <span>{DummyData.reviewCount}</span>
                            {" "}Reviews
                        </div>
                        <p className="text-lg">from families and students like you... and counting</p>
                    </div>
                    <div className="text-center text-white">

                        <SolidStarRow className="justify-center" sizeClassName="size-10" />
                        <div className="font-sans text-4xl font-black">
                            <span>{DummyData.averageRating}</span> out of 5
                        </div>
                        <p className="mt-2 text-lg">Average customer satisfaction rating</p>
                    </div>
                    <div className="text-center text-white">
                        <div className="text-4xl font-black tabular-nums leading-none text-white">
                            <SlotCounter
                                value={DummyData.totalCustomers}
                                digitClassName="font-black font-sans text-4xl"
                                showCommas
                            />
                        </div>
                        <p className="text-lg ">Total students trained!</p>
                    </div>
                </div>
            </div>
            <div className={cn(
                "relative z-10 mx-auto -mt-42 grid max-w-6xl grid-cols-3 gap-6",
                " bg-transparent px-4 sm:px-6 lg:px-0"
            )}>
                {reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))}
            </div>
        </section>
    )
}

function ReviewCard({ review }: { review: Review }) {
    return (
        <div className=" rounded-lg bg-white shadow-md">
            <Image
                src={review.image}
                alt=""
                width={800}
                height={480}
                className="h-[240px] w-full object-cover rounded-t-lg"
            />
            <div className="p-6 space-y-2 ">
                <div>
                    <SolidStarRow className="mt-2" sizeClassName="size-5 text-amber-400" />
                    <p className="mt-2 text-lg text-black">{review.review}</p>
                </div>
                <div className="flex items-center gap-2  text-gray-500">
                    <b className="text-black">{review.name}</b>
                    <span>|</span>
                    <p>{review.title}</p>
                </div>
            </div>
        </div >
    );
}