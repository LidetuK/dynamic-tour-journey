
import { FormProvider, useFormContext } from "./tour-booking/context/FormContext";
import FormStepIndicator from "./tour-booking/FormStepIndicator";
import FormStepRenderer from "./tour-booking/FormStepRenderer";
import FormNavigation from "./tour-booking/FormNavigation";
import AnimatedPlane from "./tour-booking/AnimatedPlane";
import BookingSuccess from "./tour-booking/BookingSuccess";
import { submitBookingForm } from "./tour-booking/utils/formSubmission";
import { FORM_STEPS } from "./tour-booking/constants";

const TourBookingFormContent = () => {
  const { 
    bookingSubmitted, 
    resetForm, 
    formData, 
    currentStep,
    setIsSubmitting,
    setValidationErrors,
    setBookingSubmitted
  } = useFormContext();

  if (bookingSubmitted) {
    return <BookingSuccess resetForm={resetForm} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted, current step:", currentStep);
    
    // Only process form submission if we're on the last step (receipt upload)
    if (currentStep === FORM_STEPS.length) {
      await submitBookingForm(
        formData, 
        currentStep, 
        { setIsSubmitting, setValidationErrors, setBookingSubmitted }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-form-muted py-6 px-3 sm:py-12 sm:px-6 relative overflow-hidden">
      <AnimatedPlane />

      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-lg sm:rounded-2xl p-3 sm:p-8 transform transition-all duration-500 hover:shadow-xl">
          <div className="overflow-x-auto pb-2">
            <FormStepIndicator steps={FORM_STEPS} currentStep={currentStep} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <FormStepRenderer />
            <FormNavigation />
          </form>
        </div>
      </div>
    </div>
  );
};

const TourBookingForm = () => (
  <FormProvider>
    <TourBookingFormContent />
  </FormProvider>
);

export default TourBookingForm;
