import { useState, useEffect } from "react";
import { Calendar, MapPin, User, CreditCard, Upload, Check, Package, Plane, Building, Mountain, Landmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
    title: "Tour Package",
    icon: <Package className="w-5 h-5" />,
  },
  {
    id: 5,
    title: "Payment",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    id: 6,
    title: "Receipt",
    icon: <Upload className="w-5 h-5" />,
  },
];

const tourPackages = [
  {
    id: "rock-churches",
    title: "Explore the iconic rock-hewn churches of Ethiopia",
    description: "Journey through Ethiopia's spiritual wonders and ancient architecture with expert guides.",
    imageUrl: "/placeholder.svg",
    icon: <Landmark className="w-12 h-12 text-form-accent" />,
    color: "bg-purple-50",
  },
  {
    id: "walled-city",
    title: "Discover the ancient walled city and its fascinating heritage",
    description: "Step back in time as you explore traditional villages and experience authentic Ethiopian culture.",
    imageUrl: "/placeholder.svg",
    icon: <Building className="w-12 h-12 text-form-accent" />,
    color: "bg-blue-50",
  },
  {
    id: "erta-ale",
    title: "Witness the Otherworldly Beauty of Erta Ale",
    description: "Embark on an adventure to see the spectacular active lava lake of Erta Ale volcano.",
    imageUrl: "/placeholder.svg",
    icon: <Mountain className="w-12 h-12 text-form-accent" />,
    color: "bg-orange-50",
  },
];

const TourBookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endTime: "",
    fullName: "",
    email: "",
    phone: "",
    participants: "1",
    packageType: "",
    selectedPackage: "",
    receipt: null as File | null,
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [receiptError, setReceiptError] = useState(false);
  const [planePosition, setPlanePosition] = useState(-50);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Airplane animation
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setPlanePosition(prev => {
        // Reset position when the plane goes off screen
        if (prev > window.innerWidth) {
          return -50;
        }
        // Move the plane 5px to the right each interval
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(animationInterval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation errors when input changes
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
    const errors: string[] = [];
    
    switch (currentStep) {
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
        // No validation needed for payment information display
        break;
      case 6:
        if (!formData.receipt) {
          errors.push("Please upload your payment receipt");
          setReceiptError(true);
        }
        break;
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Show toast with validation errors
      toast({
        title: "Please complete all required fields",
        description: validationErrors.join(", "),
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Clear validation errors when going back
      setValidationErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation before submission
    if (!validateCurrentStep()) {
      toast({
        title: "Required Fields Missing",
        description: validationErrors.join(", "),
      });
      return;
    }
    
    // Form is valid, proceed with submission
    setIsSubmitting(true);
    
    try {
      // Create form data for web3forms API
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
      
      // Find the selected package title
      const selectedPackageInfo = tourPackages.find(pkg => pkg.id === formData.selectedPackage);
      if (selectedPackageInfo) {
        apiFormData.append('packageTitle', selectedPackageInfo.title);
      }
      
      // Append receipt file if available
      if (formData.receipt) {
        apiFormData.append('receipt', formData.receipt);
      }
      
      // Send data to web3forms API
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
                endTime: "",
                fullName: "",
                email: "",
                phone: "",
                participants: "1",
                packageType: "standard",
                selectedPackage: "",
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
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Where would you like to go?</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="Enter your dream destination"
                className={`w-full px-4 py-3 rounded-lg border ${
                  validationErrors.length > 0 ? "border-red-500" : "border-form-border"
                } bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-form-accent/20`}
              />
              {validationErrors.length > 0 && (
                <p className="text-red-500 text-sm">{validationErrors[0]}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">When are you planning to travel?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    validationErrors.includes("Please select a departure date") ? "border-red-500" : "border-form-border"
                  } bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-form-accent/20`}
                />
                {validationErrors.includes("Please select a departure date") && (
                  <p className="text-red-500 text-sm">Please select a departure date</p>
                )}
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Time
                </label>
                <input
                  id="endTime"
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    validationErrors.includes("Please select a departure time") ? "border-red-500" : "border-form-border"
                  } bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-form-accent/20`}
                />
                {validationErrors.includes("Please select a departure time") && (
                  <p className="text-red-500 text-sm">Please select a departure time</p>
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Tell us about yourself</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className={`w-full px-4 py-3 rounded-lg border ${
                  validationErrors.includes("Please enter your full name") ? "border-red-500" : "border-form-border"
                } bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-form-accent/20`}
              />
              {validationErrors.includes("Please enter your full name") && (
                <p className="text-red-500 text-sm">Please enter your full name</p>
              )}
              
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className={`w-full px-4 py-3 rounded-lg border ${
                  validationErrors.some(e => e.includes("email")) ? "border-red-500" : "border-form-border"
                } bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-form-accent/20`}
              />
              {validationErrors.some(e => e.includes("email")) && (
                <p className="text-red-500 text-sm">{validationErrors.find(e => e.includes("email"))}</p>
              )}
              
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className={`w-full px-4 py-3 rounded-lg border ${
                  validationErrors.includes("Please enter your phone number") ? "border-red-500" : "border-form-border"
                } bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-form-accent/20`}
              />
              {validationErrors.includes("Please enter your phone number") && (
                <p className="text-red-500 text-sm">Please enter your phone number</p>
              )}
              
              <div>
                <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Participants
                </label>
                <select
                  id="participants"
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-form-border bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-form-accent/20"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Person" : "People"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Select Your Tour Package</h2>
            <div className="space-y-6">
              {tourPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handlePackageSelect(pkg.id)}
                  className={`p-6 border rounded-lg transition-all duration-300 cursor-pointer hover-scale shadow-sm
                    ${formData.selectedPackage === pkg.id
                      ? "border-form-accent bg-form-accent/5 shadow-md"
                      : validationErrors.length > 0
                      ? "border-red-500 bg-white/50"
                      : `border-form-border ${pkg.color} bg-white/50`
                    }`}
                >
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/4 aspect-square md:aspect-auto md:h-auto rounded-lg overflow-hidden bg-form-muted flex items-center justify-center p-4">
                      {pkg.icon}
                    </div>
                    <div className="w-full md:w-3/4 space-y-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-xl">{pkg.title}</h3>
                        {formData.selectedPackage === pkg.id && (
                          <Check className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
                      <button 
                        className={`px-4 py-2 mt-2 rounded-md text-sm font-medium transition-colors ${
                          formData.selectedPackage === pkg.id 
                            ? "bg-form-accent text-white" 
                            : "bg-white text-form-accent border border-form-accent"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePackageSelect(pkg.id);
                        }}
                      >
                        {formData.selectedPackage === pkg.id ? "Selected" : "Select Package"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {validationErrors.includes("Please select a tour package") && (
                <p className="text-red-500 text-sm">Please select a tour package</p>
              )}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-lg space-y-6 text-center">
              <CreditCard className="w-16 h-16 text-form-accent mx-auto mb-2" />
              <h3 className="text-xl font-medium text-gray-800">Ready to complete your booking?</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Please make a bank transfer using the details below and upload the receipt in the next step.
              </p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <button className="px-6 py-3 bg-form-accent text-white rounded-lg font-medium shadow-md hover:bg-form-accent/90 transition-colors transform hover:scale-105 duration-200">
                    View Bank Details
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Bank Transfer Details</DialogTitle>
                    <DialogDescription>
                      Please use the following information to make your payment
                    </DialogDescription>
                  </DialogHeader>
                  <div className="bg-form-muted p-6 rounded-lg space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="font-medium text-right">Bank:</p>
                      <p>Commercial Bank of Ethiopia</p>
                      
                      <p className="font-medium text-right">Account Name:</p>
                      <p>Agaz General Trading PLC</p>
                      
                      <p className="font-medium text-right">Branch:</p>
                      <p>Gerji Mebrat Branch</p>
                      
                      <p className="font-medium text-right">Account Number:</p>
                      <p className="font-mono">1000105057303</p>
                    </div>
                  </div>
                  <div className="text-center mt-4 text-sm text-gray-500">
                    After making the payment, please take a screenshot or photo of the receipt 
                    to upload in the next step.
                  </div>
                </DialogContent>
              </Dialog>
              
              <div className="pt-4 text-sm text-gray-500">
                <p>For any payment issues, please contact us at support@example.com</p>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Upload Payment Receipt</h2>
            <div className={`border-2 border-dashed ${receiptError || validationErrors.length > 0 ? 'border-red-500' : 'border-form-border'} rounded-lg p-8 text-center`}>
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
                <Upload className={`w-12 h-12 ${receiptError || validationErrors.length > 0 ? 'text-red-500' : 'text-form-accent'}`} />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop your receipt here</p>
                  <p className="text-sm text-gray-500">or click to select file</p>
                  {(receiptError || validationErrors.length > 0) && (
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
    <div className="min-h-screen bg-gradient-to-br from-white to-form-muted py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Flying airplane animation */}
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
          <div className="flex justify-center mb-8 relative overflow-x-auto py-2">
            <div className="flex items-center w-full overflow-x-auto md:overflow-visible px-2 sm:px-0">
              {steps.map((step) => (
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
                    {step.icon}
                  </div>
                  {step.id !== steps.length && (
                    <div
                      className={`w-4 sm:w-8 h-0.5 transition-all duration-500 ${
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
                className={`px-3 sm:px-6 py-2 rounded-lg border border-form-accent text-form-accent hover:bg-form-accent/5 transition-colors ${
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
