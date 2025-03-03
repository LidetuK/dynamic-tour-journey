
import React from "react";
import { Check } from "lucide-react";
import { FormStep } from "./types";

interface FormStepIndicatorProps {
  steps: FormStep[];
  currentStep: number;
}

const FormStepIndicator: React.FC<FormStepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center mb-8 relative overflow-x-auto py-2">
      <div className="flex items-center w-full overflow-x-auto md:overflow-visible px-2 sm:px-0">
        {steps.map((step) => {
          const IconComponent = step.icon;
          return (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <div
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300 transform ${
                  step.id === currentStep
                    ? "bg-form-accent text-white scale-110"
                    : step.id < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-form-muted text-gray-400"
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <IconComponent className="w-5 h-5" />
                )}
              </div>
              {step.id !== steps.length && (
                <div
                  className={`w-4 sm:w-8 h-0.5 transition-all duration-500 ${
                    step.id < currentStep ? "bg-green-500" : "bg-form-muted"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormStepIndicator;
