
import React from "react";
import { Upload, Info } from "lucide-react";
import { TourFormData } from "../types";

interface StepReceiptProps {
  formData: TourFormData;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  receiptError: boolean;
  validationErrors: string[];
}

const StepReceipt: React.FC<StepReceiptProps> = ({
  formData,
  handleFileChange,
  handleInputChange,
  receiptError,
  validationErrors
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Payment Verification</h2>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              You can either provide receipt details as text or upload an image. 
              At least one option is required.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="receiptInfo" className="block text-sm font-medium text-gray-700 mb-1">
            Receipt Information
          </label>
          <textarea
            id="receiptInfo"
            name="receiptInfo"
            rows={3}
            value={formData.receiptInfo}
            onChange={handleInputChange}
            placeholder="Enter your receipt details, transaction ID, or payment confirmation"
            className={`w-full px-3 py-2 border ${
              receiptError && !formData.receiptInfo && !formData.receipt ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-form-accent focus:border-form-accent`}
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>
        
        <div className={`border-2 border-dashed ${
          receiptError && !formData.receiptInfo && !formData.receipt ? 'border-red-500' : 'border-form-border'
        } rounded-lg p-4 sm:p-6 text-center`}>
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
            className="cursor-pointer flex flex-col items-center space-y-2 sm:space-y-3"
          >
            <Upload className={`w-8 h-8 sm:w-10 sm:h-10 ${
              receiptError && !formData.receiptInfo && !formData.receipt ? 'text-red-500' : 'text-form-accent'
            }`} />
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-medium">Upload receipt (optional)</p>
              <p className="text-xs text-gray-500">File types: images, PDF</p>
            </div>
          </label>
          {formData.receipt && (
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-form-accent break-words max-w-full">
              Selected: {formData.receipt.name}
            </p>
          )}
        </div>
      </div>
      
      {receiptError && !formData.receiptInfo && !formData.receipt && (
        <p className="text-red-500 text-xs sm:text-sm">
          Please provide either receipt details or upload a receipt file
        </p>
      )}
    </div>
  );
};

export default StepReceipt;
