
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
};

export default StepReceipt;
