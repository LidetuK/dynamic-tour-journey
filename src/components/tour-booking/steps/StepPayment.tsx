
import React from "react";
import { CreditCard } from "lucide-react";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";

const StepPayment: React.FC = () => {
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
};

export default StepPayment;
