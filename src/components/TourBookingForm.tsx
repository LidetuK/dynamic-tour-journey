
import { useState } from "react";
import { Calendar, MapPin, User, CreditCard, Upload, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const steps = [
  {
    id: 1,
    title: "Destination",
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Travel Dates",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Personal Info",
    icon: <User className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Payment",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    id: 5,
    title: "Receipt",
    icon: <Upload className="w-5 h-5" />,
  },
];

const TourBookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    fullName: "",
    email: "",
    phone: "",
    participants: "1",
    packageType: "standard",
    receipt: null as File | null,
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [receiptError, setReceiptError] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, receipt: e.target.files[0] });
      setReceiptError(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate receipt upload
    if (!formData.receipt) {
      setReceiptError(true);
      toast({
        title: "Upload Required",
        description: "Please upload your payment receipt before submitting.",
      });
      return;
    }
    
    // Form is valid, proceed with submission
    setBookingSubmitted(true);
    toast({
      title: "Booking Submitted!",
      description: "We'll process your booking and contact you soon.",
    });
  };

  // Thank you message after successful submission
  if (bookingSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-form-muted py-12 px-4 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-form-accent mb-4">Thank You!</h1>
          <p className="text-xl mb-6">Your booking has been successfully submitted.</p>
          <p className="text-gray-600 mb-8">
            We have received your tour booking information and payment receipt. Our team will review your details
            and contact you shortly to confirm your amazing journey!
          </p>
          <button
            onClick={() => {
              setBookingSubmitted(false);
              setCurrentStep(1);
              setFormData({
                destination: "",
                startDate: "",
                endDate: "",
                fullName: "",
                email: "",
                phone: "",
                participants: "1",
                packageType: "standard",
                receipt: null,
              });
            }}
            className="px-6 py-3 rounded-lg bg-form-accent text-white hover:bg-form-accent/90 transition-colors"
          >
            Book Another Tour
          </button>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 animate-step-in">
            <h2 className="text-2xl font-semibold mb-6">Where would you like to go?</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="Enter your dream destination"
                className="w-full px-4 py-3 rounded-lg border border-form-border bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-form-accent/20"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-step-in">
            <h2 className="text-2xl font-semibold mb-6">When are you planning to travel?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-form-border bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-form-accent/20"
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-form-border bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-form-accent/20"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-step-in">
            <h2 className="text-2xl font-semibold mb-6">Tell us about yourself</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg border border-form-border bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-form-accent/20"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg border border-form-border bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-form-accent/20"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg border border-form-border bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-form-accent/20"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-step-in">
            <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
            <div className="bg-form-muted p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-medium">Bank Transfer Details:</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Bank:</span> Commercial Bank of Ethiopia</p>
                <p><span className="font-medium">Account Name:</span> Agaz General Trading PLC</p>
                <p><span className="font-medium">Branch:</span> Gerji Mebrat Branch</p>
                <p><span className="font-medium">Account Number:</span> 1000105057303</p>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-step-in">
            <h2 className="text-2xl font-semibold mb-6">Upload Payment Receipt</h2>
            <div className={`border-2 border-dashed ${receiptError ? 'border-red-500' : 'border-form-border'} rounded-lg p-8 text-center`}>
              <input
                type="file"
                name="receipt"
                onChange={handleFileChange}
                className="hidden"
                id="receipt"
                accept="image/*,.pdf"
              />
              <label
                htmlFor="receipt"
                className="cursor-pointer flex flex-col items-center space-y-4"
              >
                <Upload className={`w-12 h-12 ${receiptError ? 'text-red-500' : 'text-form-accent'}`} />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop your receipt here</p>
                  <p className="text-sm text-gray-500">or click to select file</p>
                  {receiptError && (
                    <p className="text-red-500 font-medium">Please upload your payment receipt</p>
                  )}
                </div>
              </label>
              {formData.receipt && (
                <p className="mt-4 text-sm text-form-accent">
                  Selected: {formData.receipt.name}
                </p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-form-muted py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      step.id === currentStep
                        ? "bg-form-accent text-white"
                        : step.id < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-form-muted text-gray-400"
                    }`}
                  >
                    {step.icon}
                  </div>
                  {step.id !== steps.length && (
                    <div
                      className={`w-8 h-0.5 ${
                        step.id < currentStep ? "bg-green-500" : "bg-form-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStep()}

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-2 rounded-lg border border-form-accent text-form-accent hover:bg-form-accent/5 transition-colors ${
                  currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </button>
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 rounded-lg bg-form-accent text-white hover:bg-form-accent/90 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-form-accent text-white hover:bg-form-accent/90 transition-colors"
                >
                  Submit Booking
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
