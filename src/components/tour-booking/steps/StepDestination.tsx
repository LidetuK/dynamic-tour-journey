
import React from "react";
import { TourFormData } from "../types";

interface StepDestinationProps {
  formData: TourFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  validationErrors: string[];
}

const StepDestination: React.FC<StepDestinationProps> = ({ 
  formData, 
  handleInputChange, 
  validationErrors 
}) => {
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
};

export default StepDestination;
