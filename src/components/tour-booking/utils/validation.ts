
import { TourFormData } from "../types";

export const validateStep = (step: number, formData: TourFormData): string[] => {
  const errors: string[] = [];
  
  console.log(`Running validation for step ${step}`);
  
  switch (step) {
    case 1:
      if (!formData.destination.trim()) {
        errors.push("Please enter your destination");
      }
      break;
    case 2:
      if (!formData.startDate) {
        errors.push("Please select a departure date");
      }
      if (!formData.endTime) {
        errors.push("Please select a departure time");
      }
      break;
    case 3:
      if (!formData.fullName.trim()) {
        errors.push("Please enter your full name");
      }
      if (!formData.email.trim()) {
        errors.push("Please enter your email address");
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.push("Please enter a valid email address");
      }
      if (!formData.phone.trim()) {
        errors.push("Please enter your phone number");
      }
      break;
    case 4:
      if (!formData.selectedPackage) {
        errors.push("Please select a tour package");
      }
      break;
    case 5:
      // No validation needed for payment information step
      // This step is just informational
      break;
    case 6:
      if (!formData.receipt) {
        errors.push("Please upload your payment receipt");
      }
      break;
    default:
      break;
  }

  console.log(`Validation for step ${step} completed with errors:`, errors);
  return errors;
};
