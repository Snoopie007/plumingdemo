"use client";

import * as React from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { HugeiconsIcon } from "@hugeicons/react";
import { Clock01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import QuizEstimate from "./QuizEstimate";
import QuizProgress from "./QuizProgress";
import QuizQuote from "./QuizQuote";
import QuizTrigger from "./QuizTrigger";
import QuizOption from "./QuizOption";
import { STEPS } from "@/app/Constants/constants";
import type { Screen, QuizStep } from "@/types/quiz";

// ── helpers ──────────────────────────────────────────────────────────────────

/** Steps that are not skipped given the answers collected so far. */
function getActiveSteps(steps: QuizStep[], answers: Record<string, string>) {
  return steps.filter((s) => !s.skipIf?.(answers));
}

/** Next step in the *full* list that should not be skipped. Returns null when the quiz is done. */
function getNextStep(
  steps: QuizStep[],
  currentId: string,
  answers: Record<string, string>
): QuizStep | null {
  const idx = steps.findIndex((s) => s.id === currentId);
  for (let i = idx + 1; i < steps.length; i++) {
    if (!steps[i].skipIf?.(answers)) return steps[i];
  }
  return null;
}

function getEstimate(answers: Record<string, string>) {
  const type = answers["heater-type"] ?? "";
  const fuel = answers["fuel-type"] ?? "";
  if (type.includes("Tankless")) return { lo: "$2,200", hi: "$4,800" };
  if (fuel === "Propane") return { lo: "$1,400", hi: "$3,200" };
  if (fuel === "Electric") return { lo: "$900", hi: "$2,100" };
  return { lo: "$1,200", hi: "$2,800" };
}

// ── component ─────────────────────────────────────────────────────────────────

export function QuizPopup() {
  const [open, setOpen] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(STEPS[0]);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [screen, setScreen] = React.useState<Screen>("quiz");

  const activeSteps = getActiveSteps(STEPS, answers);
  const activeIndex = activeSteps.findIndex((s) => s.id === currentStep.id);
  const estimate = getEstimate(answers);

  function handleSelect(value: string) {
    const next = { ...answers, [currentStep.id]: value };
    setAnswers(next);
    const nextStep = getNextStep(STEPS, currentStep.id, next);
    if (nextStep) {
      setCurrentStep(nextStep);
    } else {
      setScreen("estimate");
    }
  }

  function reset() {
    setCurrentStep(STEPS[0]);
    setAnswers({});
    setScreen("quiz");
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) reset();
  }

  return (
    <>
      <QuizTrigger onClick={() => setOpen(true)} />

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="flex w-[400px] flex-col gap-0 overflow-hidden rounded-xl p-0"
        >
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </VisuallyHidden>
          </DialogHeader>

          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="size-11 absolute top-2 right-3">
              <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-6 text-gray-500" aria-hidden />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>

          {screen === "quiz" && (
            <div className="flex flex-col px-4 pb-8 pt-12">
              <h2 className="mb-4 text-xl font-black leading-snug text-center text-foreground">
                {currentStep.question}
              </h2>

              {currentStep.image && (
                <div className="flex justify-center">
                  <Image
                    src={currentStep.image}
                    alt={currentStep.question}
                    width={600}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              )}

              <div className="p-3 bg-gray-50 rounded-lg gap-3 flex flex-col">
                <QuizProgress activeIndex={activeIndex} totalActive={activeSteps.length} />
                <div className="flex max-h-[46vh] flex-col gap-2 overflow-y-auto">
                  {currentStep.options.map((option) => (
                    <QuizOption
                      key={option.value}
                      isSelected={answers[currentStep.id] === option.value}
                      option={option}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end mt-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} className="size-3.5" />
                  <span>Takes 30 seconds</span>
                </div>
              </div>
            </div>
          )}

          {screen === "estimate" && (
            <QuizEstimate estimate={estimate} onContinue={() => setScreen("contact")} />
          )}

          {screen === "contact" && (
            <QuizQuote />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
