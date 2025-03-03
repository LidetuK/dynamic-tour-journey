
import { MapPin, Calendar, User, CreditCard, Upload, Check, Package, Plane, Building, Mountain, Landmark } from "lucide-react";
import { FormStep, TourPackage } from "./types";

export const FORM_STEPS: FormStep[] = [
  {
    id: 1,
    title: "Destination",
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Travel Dates",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Personal Info",
    icon: <User className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Tour Package",
    icon: <Package className="w-5 h-5" />,
  },
  {
    id: 5,
    title: "Payment",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    id: 6,
    title: "Receipt",
    icon: <Upload className="w-5 h-5" />,
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "rock-churches",
    title: "Explore the iconic rock-hewn churches of Ethiopia",
    description: "Journey through Ethiopia's spiritual wonders and ancient architecture with expert guides.",
    imageUrl: "/placeholder.svg",
    icon: <Landmark className="w-12 h-12 text-form-accent" />,
    color: "bg-purple-50",
  },
  {
    id: "walled-city",
    title: "Discover the ancient walled city and its fascinating heritage",
    description: "Step back in time as you explore traditional villages and experience authentic Ethiopian culture.",
    imageUrl: "/placeholder.svg",
    icon: <Building className="w-12 h-12 text-form-accent" />,
    color: "bg-blue-50",
  },
  {
    id: "erta-ale",
    title: "Witness the Otherworldly Beauty of Erta Ale",
    description: "Embark on an adventure to see the spectacular active lava lake of Erta Ale volcano.",
    imageUrl: "/placeholder.svg",
    icon: <Mountain className="w-12 h-12 text-form-accent" />,
    color: "bg-orange-50",
  },
];

export const INITIAL_FORM_DATA: TourFormData = {
  destination: "",
  startDate: "",
  endTime: "",
  fullName: "",
  email: "",
  phone: "",
  participants: "1",
  packageType: "",
  selectedPackage: "",
  receipt: null
};
