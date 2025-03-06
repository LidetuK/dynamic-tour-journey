
import React from "react";
import { TourFormData } from "../types";

interface StepTravelDatesProps {
  formData: TourFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  validationErrors: string[];
}

const StepTravelDates: React.FC<StepTravelDatesProps> = ({ 
  formData, 
  handleInputChange, 
  validationErrors 
}) => {
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
};

export default StepTravelDates;
