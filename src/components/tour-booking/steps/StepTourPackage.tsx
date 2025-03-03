
import React from "react";
import { Check } from "lucide-react";
import { TourFormData } from "../types";
import { TOUR_PACKAGES } from "../constants";

interface StepTourPackageProps {
  formData: TourFormData;
  validationErrors: string[];
  handlePackageSelect: (packageId: string) => void;
}

const StepTourPackage: React.FC<StepTourPackageProps> = ({
  formData,
  validationErrors,
  handlePackageSelect
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">Select Your Tour Package</h2>
      <div className="space-y-6">
        {TOUR_PACKAGES.map((pkg) => {
          const IconComponent = pkg.icon;
          return (
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
                  <IconComponent className="w-12 h-12 text-form-accent" />
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
          );
        })}
        {validationErrors.includes("Please select a tour package") && (
          <p className="text-red-500 text-sm">Please select a tour package</p>
        )}
      </div>
    </div>
  );
};

export default StepTourPackage;
