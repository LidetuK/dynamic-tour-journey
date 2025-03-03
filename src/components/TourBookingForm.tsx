
import { useState, useEffect } from "react";
import { Plane } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import constants and types
import { FORM_STEPS, TOUR_PACKAGES, INITIAL_FORM_DATA } from "./tour-booking/constants";
import { TourFormData } from "./tour-booking/types";

// Import components
import FormStepIndicator from "./tour-booking/FormStepIndicator";
import StepDestination from "./tour-booking/steps/StepDestination";
import StepTravelDates from "./tour-booking/steps/StepTravelDates";
import StepPersonalInfo from "./tour-booking/steps/StepPersonalInfo";
import StepTourPackage from "./tour-booking/steps/StepTourPackage";
import StepPayment from "./tour-booking/steps/StepPayment";
import StepReceipt from "./tour-booking/steps/StepReceipt";
import BookingSuccess from "./tour-booking/BookingSuccess";

// Import validation utilities
import { validateStep } from "./tour-booking/utils/validation";

const TourBookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TourFormData>(INITIAL_FORM_DATA);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [receiptError, setReceiptError] = useState(false);
  const [planePosition, setPlanePosition] = useState(-50);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setPlanePosition(prev => {
        if (prev > window.innerWidth) {
          return -50;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(animationInterval);
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      toast({
        title: "Required Fields Missing",
        description: validationErrors.join(", "),
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
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
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: apiFormData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setBookingSubmitted(true);
        toast({
          title: "Booking Submitted!",
          description: "We'll process your booking and contact you soon.",
        });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "Failed to submit the form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setBookingSubmitted(false);
    setCurrentStep(1);
    setFormData(INITIAL_FORM_DATA);
  };

  if (bookingSubmitted) {
    return <BookingSuccess resetForm={resetForm} />;
  }

  const renderStep = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-form-muted py-12 px-4 sm:px-6 relative overflow-hidden">
      <div 
        className="absolute transform -translate-y-1/2"
        style={{ 
          left: `${planePosition}px`, 
          top: '15%',
          transition: 'left 0.05s linear',
          zIndex: 10
        }}
      >
        <Plane className="w-8 h-8 text-form-accent transform rotate-90" />
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-4 sm:p-8 transform transition-all duration-500 hover:shadow-xl">
          <FormStepIndicator steps={FORM_STEPS} currentStep={currentStep} />

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStep()}

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
          </form>
        </div>
      </div>
    </div>
  );
};

export default TourBookingForm;
