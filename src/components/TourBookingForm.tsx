
import { useState, useEffect } from "react";
import { Calendar, MapPin, User, CreditCard, Upload, Check, Package, Plane } from "lucide-react";
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
  },
  {
    id: "walled-city",
    title: "Discover the ancient walled city and its fascinating heritage",
    description: "Step back in time as you explore traditional villages and experience authentic Ethiopian culture.",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "erta-ale",
    title: "Witness the Otherworldly Beauty of Erta Ale",
    description: "Embark on an adventure to see the spectacular active lava lake of Erta Ale volcano.",
    imageUrl: "/placeholder.svg",
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

  const handleSubmit = (e: React.FormEvent) => {
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
            <div className="space-y-4">
              {tourPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handlePackageSelect(pkg.id)}
                  className={`p-4 border rounded-lg transition-all duration-300 cursor-pointer hover-scale
                    ${formData.selectedPackage === pkg.id
                      ? "border-form-accent bg-form-accent/5"
                      : validationErrors.length > 0
                      ? "border-red-500 bg-white/50"
                      : "border-form-border bg-white/50"
                    }`}
                >
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="w-full md:w-1/4 aspect-square md:aspect-auto md:h-24 rounded-lg overflow-hidden bg-form-muted flex items-center justify-center">
                      <img
                        src={pkg.imageUrl}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full md:w-3/4">
                      <h3 className="font-medium text-lg mb-2">{pkg.title}</h3>
                      <p className="text-gray-600">{pkg.description}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-white to-form-muted py-12 px-4 relative overflow-hidden">
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
        <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 transform transition-all duration-500 hover:shadow-xl">
          <div className="flex justify-center mb-8 relative">
            <div className="flex items-center">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 transform ${
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
                      className={`w-8 h-0.5 transition-all duration-500 ${
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
                  className="px-6 py-2 rounded-lg bg-form-accent text-white hover:bg-form-accent/90 transition-colors transform hover:scale-105 transition-transform duration-200"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-form-accent text-white hover:bg-form-accent/90 transition-colors transform hover:scale-105 transition-transform duration-200"
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
