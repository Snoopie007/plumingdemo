import type { IconSvgElement } from "@hugeicons/react";

export type QuizOption = {
  label: string;
  icon?: IconSvgElement;
  value: string;
};

export type Quiz = {
  steps: QuizStep[];
};

export type QuizStep = {
  id: string;
  question: string;
  image?: string;
  description?: string;
  options: QuizOption[];
  /**
   * When this returns true the step is removed from the active flow.
   * Receives the answers collected so far (keyed by step id).
   */
  skipIf?: (answers: Record<string, string>) => boolean;
};

export type Screen = "quiz" | "estimate" | "contact";

export interface QuizProgressProps {
  /** 0-based index of the current step within the active (non-skipped) steps */
  activeIndex: number;
  /** Total number of active (non-skipped) steps */
  totalActive: number;
}

export interface QuizOptionProps {
  isSelected: boolean;
  option: QuizOption;
  onSelect: (option: string) => void;
}
