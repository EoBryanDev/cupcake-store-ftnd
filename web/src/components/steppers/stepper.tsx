import React, { useState } from "react";
import { Check } from "lucide-react";

export interface Step {
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full py-8">
      {/* Container dos círculos e linhas */}
      <div className="relative mb-8 flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Círculo do Step */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                  index < currentStep &&
                    "border-orange-500 bg-orange-500 text-white",
                  index === currentStep &&
                    "border-orange-500 bg-white text-orange-500",
                  index > currentStep &&
                    "border-gray-300 bg-white text-gray-400",
                )}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Label do step - agora diretamente abaixo do círculo */}
              <div className="absolute top-12 w-24 text-center">
                <p
                  className={cn(
                    "text-sm font-medium whitespace-nowrap",
                    index <= currentStep ? "text-gray-900" : "text-gray-400",
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="mt-1 text-xs whitespace-nowrap text-gray-500">
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Linha conectora */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 transition-all",
                  index < currentStep ? "bg-orange-500" : "bg-gray-300",
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export { Stepper };
