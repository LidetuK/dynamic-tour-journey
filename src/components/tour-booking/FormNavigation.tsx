
import React from "react";
import { useFormContext } from "./context/FormContext";
import { FORM_STEPS } from "./constants";
import { validateStep } from "./utils/validation";
import { useToast } from "@/hooks/use-toast";

const FormNavigation: React.FC = () => {
  const { 
    currentStep, 
    setCurrentStep, 
    formData, 
    validationErrors, 
    setValidationErrors,
    isSubmitting
  } = useFormContext();
  const { toast } = useToast();

  const validateCurrentStep = (): boolean => {
    const errors = validateStep(currentStep, formData);
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < FORM_STEPS.length) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast({
        title: "Please complete all required fields",
        description: validationErrors.join(", "),
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setValidationErrors([]);
    }
  };

  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={prevStep}
        className={`px-3 sm:px-6 py-2 rounded-lg border border-form-accent text-form-accent hover:bg-form-accent/5 transition-colors ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentStep === 1}
      >
        Previous
      </button>
      {currentStep < FORM_STEPS.length ? (
        <button
          type="button"
          onClick={nextStep}
          className="px-3 sm:px-6 py-2 rounded-lg bg-form-accent text-white hover:bg-form-accent/90 transition-colors transform hover:scale-105 transition-transform duration-200"
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-3 sm:px-6 py-2 rounded-lg bg-form-accent text-white hover:bg-form-accent/90 transition-colors transform hover:scale-105 transition-transform duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Booking"}
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
