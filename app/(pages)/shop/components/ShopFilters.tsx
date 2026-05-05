'use client';
import { Button, Tabs, TabsList, TabsTrigger } from "@/components/ui"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const filters = [
    { label: "Courses", value: "courses" },
    { label: "Gear", value: "gear" },
]
export function ShopFilters() {
    return (
        <div className="flex flex-row items-center gap-2">
            <Tabs defaultValue="courses">
                <TabsList className="">
                    {filters.map((filter) => (
                        <TabsTrigger key={filter.value} value={filter.value}
                            className="text-sm px-4 font-roboto font-bold"
                        >
                            {filter.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
            <div className="flex flex-row items-center gap-2">
                <Button variant="outline" size="icon" className="size-7">
                    <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-5" />
                </Button>
                <Button variant="outline" size="icon" className="size-7">
                    <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-5" />
                </Button>
            </div>
        </div>
    );
}