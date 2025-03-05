
import React from "react";
import { Upload } from "lucide-react";
import { TourFormData } from "../types";

interface StepReceiptProps {
  formData: TourFormData;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  receiptError: boolean;
  validationErrors: string[];
}

const StepReceipt: React.FC<StepReceiptProps> = ({
  formData,
  handleFileChange,
  receiptError,
  validationErrors
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Upload Payment Receipt</h2>
      <div className={`border-2 border-dashed ${receiptError || validationErrors.length > 0 ? 'border-red-500' : 'border-form-border'} rounded-lg p-4 sm:p-8 text-center`}>
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
          className="cursor-pointer flex flex-col items-center space-y-3 sm:space-y-4"
        >
          <Upload className={`w-10 h-10 sm:w-12 sm:h-12 ${receiptError || validationErrors.length > 0 ? 'text-red-500' : 'text-form-accent'}`} />
          <div className="space-y-1 sm:space-y-2">
            <p className="text-base sm:text-lg font-medium">Drop your receipt here</p>
            <p className="text-xs sm:text-sm text-gray-500">or click to select file</p>
            {(receiptError || validationErrors.length > 0) && (
              <p className="text-red-500 text-xs sm:text-sm font-medium">Please upload your payment receipt</p>
            )}
          </div>
        </label>
        {formData.receipt && (
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-form-accent break-words max-w-full">
            Selected: {formData.receipt.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default StepReceipt;
