
import React, { createContext, useContext, useState } from "react";
import { TourFormData } from "../types";
import { INITIAL_FORM_DATA } from "../constants";

interface FormContextType {
  currentStep: number;
  formData: TourFormData;
  bookingSubmitted: boolean;
  receiptError: boolean;
  validationErrors: string[];
  isSubmitting: boolean;
  setCurrentStep: (step: number) => void;
  setFormData: React.Dispatch<React.SetStateAction<TourFormData>>;
  setBookingSubmitted: (submitted: boolean) => void;
  setReceiptError: (error: boolean) => void;
  setValidationErrors: (errors: string[]) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePackageSelect: (packageId: string) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TourFormData>(INITIAL_FORM_DATA);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [receiptError, setReceiptError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, receipt: e.target.files[0] });
      setReceiptError(false);
      setValidationErrors([]);
    }
  };

  const handlePackageSelect = (packageId: string) => {
    setFormData({ ...formData, selectedPackage: packageId });
    setValidationErrors([]);
  };

  const resetForm = () => {
    setBookingSubmitted(false);
    setCurrentStep(1);
    setFormData(INITIAL_FORM_DATA);
    setValidationErrors([]);
    setReceiptError(false);
  };

  return (
    <FormContext.Provider
      value={{
        currentStep,
        formData,
        bookingSubmitted,
        receiptError,
        validationErrors,
        isSubmitting,
        setCurrentStep,
        setFormData,
        setBookingSubmitted,
        setReceiptError,
        setValidationErrors,
        setIsSubmitting,
        handleInputChange,
        handleFileChange,
        handlePackageSelect,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
