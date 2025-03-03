
import { ReactNode } from "react";

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  icon: ReactNode;
  color: string;
}

export interface FormStep {
  id: number;
  title: string;
  icon: ReactNode;
}

export interface TourFormData {
  destination: string;
  startDate: string;
  endTime: string;
  fullName: string;
  email: string;
  phone: string;
  participants: string;
  packageType: string;
  selectedPackage: string;
  receipt: File | null;
}
