
import React from "react";
import { useFormContext } from "./context/FormContext";
import StepDestination from "./steps/StepDestination";
import StepTravelDates from "./steps/StepTravelDates";
import StepPersonalInfo from "./steps/StepPersonalInfo";
import StepTourPackage from "./steps/StepTourPackage";
import StepPayment from "./steps/StepPayment";
import StepReceipt from "./steps/StepReceipt";

const FormStepRenderer: React.FC = () => {
  const { 
    currentStep, 
    formData, 
    handleInputChange, 
    handleFileChange, 
    handlePackageSelect, 
    receiptError, 
    validationErrors 
  } = useFormContext();

  // Add console log to debug the current step
  console.log("Current step:", currentStep);

  switch (currentStep) {
    case 1:
      return (
        <StepDestination 
          formData={formData} 
          handleInputChange={handleInputChange} 
          validationErrors={validationErrors} 
        />
      );
    case 2:
      return (
        <StepTravelDates 
          formData={formData} 
          handleInputChange={handleInputChange} 
          validationErrors={validationErrors} 
        />
      );
    case 3:
      return (
        <StepPersonalInfo 
          formData={formData} 
          handleInputChange={handleInputChange} 
          validationErrors={validationErrors} 
        />
      );
    case 4:
      return (
        <StepTourPackage 
          formData={formData}
          validationErrors={validationErrors}
          handlePackageSelect={handlePackageSelect}
        />
      );
    case 5:
      return <StepPayment />;
    case 6:
      return (
        <StepReceipt 
          formData={formData}
          handleFileChange={handleFileChange}
          receiptError={receiptError}
          validationErrors={validationErrors}
        />
      );
    default:
      return null;
  }
};

export default FormStepRenderer;
