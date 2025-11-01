"use client";

import { cn } from "@/src/lib/utils";
import { Check } from "lucide-react";

interface Step {
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full py-8 text-sm">
      {/* Container dos círculos e linhas */}
      <div className="mb-4 flex items-center justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-1 items-center last:flex-initial"
          >
            {/* Círculo do Step */}
            <div
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                index < currentStep &&
                  "text-accent border-orange-500 bg-orange-500",
                index === currentStep &&
                  "border-orange-500 bg-white text-orange-500",
                index > currentStep && "border-gray-300 bg-white text-gray-400",
              )}
            >
              {index < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                <span className="font-semibold">{index + 1}</span>
              )}
            </div>

            {/* Linha conectora */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-4 h-0.5 flex-1 transition-all",
                  index < currentStep ? "bg-orange-500" : "bg-gray-300",
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Container dos labels */}
      <div className="flex items-start justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex-1 text-center first:text-left last:text-right"
          >
            <p
              className={cn(
                "text-sm font-medium",
                index <= currentStep
                  ? "text-primary"
                  : "text-accent-foreground",
              )}
            >
              {step.title}
            </p>
            {step.description && (
              <p className="mt-1 text-xs text-gray-500">{step.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
