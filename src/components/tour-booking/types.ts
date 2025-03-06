
import { LucideIcon } from "lucide-react";

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  icon: LucideIcon;
  color: string;
}

export interface FormStep {
  id: number;
  title: string;
  icon: LucideIcon;
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
  receiptInfo: string; // Text-based receipt information
}
