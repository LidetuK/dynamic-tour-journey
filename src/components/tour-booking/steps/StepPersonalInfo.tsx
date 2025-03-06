
import React from "react";
import { TourFormData } from "../types";

interface StepPersonalInfoProps {
  formData: TourFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  validationErrors: string[];
}

const StepPersonalInfo: React.FC<StepPersonalInfoProps> = ({ 
  formData, 
  handleInputChange, 
  validationErrors 
}) => {
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
};

export default StepPersonalInfo;
