
import React from "react";
import { Check } from "lucide-react";

interface BookingSuccessProps {
  resetForm: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ resetForm }) => {
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
          onClick={resetForm}
          className="px-6 py-3 rounded-lg bg-form-accent text-white hover:bg-form-accent/90 transition-colors"
        >
          Book Another Tour
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
