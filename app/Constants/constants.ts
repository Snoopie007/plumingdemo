import { HelpSquareIcon } from "@hugeicons/core-free-icons";
import type { QuizStep } from "@/types/quiz";

export const STEPS: QuizStep[] = [
    {
        id: "heater-type",
        question: "What type of water heater do you currently have?",
        image: "/images/tanktype.png",
        options: [
            { label: "Tank / Traditional Water Heater", value: "Tank / Traditional Water Heater" },
            { label: "Tankless Water Heater", value: "Tankless Water Heater" },
            { label: "Not Sure", value: "Not Sure", icon: HelpSquareIcon },
        ],
    },
    {
        id: "fuel-type",
        question: "What type of fuel does it use?",
        options: [
            { label: "Gas", value: "Gas" },
            { label: "Electric", value: "Electric" },
            { label: "Propane", value: "Propane" },
            { label: "Not Sure", value: "Not Sure", icon: HelpSquareIcon },
        ],
    },
    {
        id: "heater-size",
        question: "What size is your current water heater?",
        // Skip this step if the user selected Tankless — tankless units don't have a gallon size
        skipIf: (answers) => answers["heater-type"] === "Tankless Water Heater",
        options: [
            { label: "30 gallon", value: "30 gallon" },
            { label: "40 gallon", value: "40 gallon" },
            { label: "50 gallon", value: "50 gallon" },
            { label: "75 gallon", value: "75 gallon" },
            { label: "Not Sure", value: "Not Sure", icon: HelpSquareIcon },
        ],
    },
    {
        id: "location",
        question: "Where is your water heater located?",
        options: [
            { label: "Garage", value: "Garage" },
            { label: "Basement", value: "Basement" },
            { label: "Utility Room", value: "Utility Room" },
            { label: "Closet", value: "Closet" },
            { label: "Attic", value: "Attic" },
            { label: "Crawl Space", value: "Crawl Space" },
            { label: "Not Sure", value: "Not Sure", icon: HelpSquareIcon },
        ],
    },
    {
        id: "problem",
        question: "What seems to be the main problem?",
        options: [
            { label: "Leaking", value: "Leaking" },
            { label: "No hot water", value: "No hot water" },
            { label: "Rusty or discolored water", value: "Rusty or discolored water" },
            { label: "Strange noises", value: "Strange noises" },
            { label: "Water does not stay hot", value: "Water does not stay hot" },
            { label: "Old unit — considering replacement", value: "Old unit — considering replacement" },
            { label: "Other / Not sure", value: "Other / Not sure", icon: HelpSquareIcon },
        ],
    },
    {
        id: "urgency",
        question: "How soon do you need help?",
        options: [
            { label: "Today", value: "Today" },
            { label: "This week", value: "This week" },
            { label: "This month", value: "This month" },
            { label: "Just checking prices", value: "Just checking prices" },
        ],
    },
];

/** Shown on the quote confirmation screen and “Call Now” actions */
export const COMPANY_PHONE = "512-123-4567";
