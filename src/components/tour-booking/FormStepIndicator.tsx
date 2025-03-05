
import React from "react";
import { Check } from "lucide-react";
import { FormStep } from "./types";

interface FormStepIndicatorProps {
  steps: FormStep[];
  currentStep: number;
}

const FormStepIndicator: React.FC<FormStepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-6 sm:mb-8 relative overflow-hidden">
      <div className="flex items-center w-full min-w-max">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isLastStep = index === steps.length - 1;
          
          return (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded-full transition-all duration-300 transform ${
                  step.id === currentStep
                    ? "bg-form-accent text-white scale-110"
                    : step.id < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-form-muted text-gray-400"
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </div>
              
              {!isLastStep && (
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 sm:w-8 h-0.5 transition-all duration-500 ${
                      step.id < currentStep ? "bg-green-500" : "bg-form-muted"
                    }`}
                  />
                  <span className="hidden sm:inline text-xs mt-1 font-medium text-gray-600">
                    {step.title}
                  </span>
                </div>
              )}
              
              {isLastStep && (
                <span className="hidden sm:inline text-xs mt-1 font-medium text-gray-600 ml-1">
                  {step.title}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormStepIndicator;
