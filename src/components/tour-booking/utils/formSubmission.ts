
import { TourFormData } from "../types";
import { TOUR_PACKAGES } from "../constants";
import { validateStep } from "./validation";
import { toast } from "@/hooks/use-toast";

export const submitBookingForm = async (
  formData: TourFormData,
  currentStep: number,
  callbacks: {
    setIsSubmitting: (value: boolean) => void;
    setValidationErrors: (errors: string[]) => void;
    setBookingSubmitted: (value: boolean) => void;
  }
) => {
  const { setIsSubmitting, setValidationErrors, setBookingSubmitted } = callbacks;
  
  console.log("Submitting form at step:", currentStep);
  
  // Validate the final step
  const errors = validateStep(currentStep, formData);
  setValidationErrors(errors);
  
  if (errors.length > 0) {
    toast({
      title: "Required Fields Missing",
      description: errors.join(", "),
    });
    return false;
  }
  
  setIsSubmitting(true);
  
  try {
    console.log("Preparing form data for submission...");
    const apiFormData = new FormData();
    apiFormData.append('access_key', '3333d230-1703-4f1f-a301-39c2b6a8c048');
    apiFormData.append('destination', formData.destination);
    apiFormData.append('startDate', formData.startDate);
    apiFormData.append('endTime', formData.endTime);
    apiFormData.append('fullName', formData.fullName);
    apiFormData.append('email', formData.email);
    apiFormData.append('phone', formData.phone);
    apiFormData.append('participants', formData.participants);
    apiFormData.append('selectedPackage', formData.selectedPackage);
    
    const selectedPackageInfo = TOUR_PACKAGES.find(pkg => pkg.id === formData.selectedPackage);
    if (selectedPackageInfo) {
      apiFormData.append('packageTitle', selectedPackageInfo.title);
    }
    
    if (formData.receipt) {
      apiFormData.append('receipt', formData.receipt);
    }
    
    console.log("Sending API request...");
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: apiFormData,
    });
    
    const data = await response.json();
    console.log("API response:", data);
    
    if (data.success) {
      setBookingSubmitted(true);
      toast({
        title: "Booking Submitted!",
        description: "We'll process your booking and contact you soon.",
      });
      return true;
    } else {
      throw new Error(data.message || 'Something went wrong');
    }
  } catch (error) {
    console.error("Submission error:", error);
    toast({
      title: "Submission Error",
      description: error instanceof Error ? error.message : "Failed to submit the form. Please try again.",
    });
    return false;
  } finally {
    setIsSubmitting(false);
  }
};
