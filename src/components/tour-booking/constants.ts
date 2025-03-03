
import { MapPin, Calendar, User, CreditCard, Upload, Check, Package, Plane, Building, Mountain, Landmark } from "lucide-react";
import { FormStep, TourPackage } from "./types";

export const FORM_STEPS: FormStep[] = [
  {
    id: 1,
    title: "Destination",
    icon: MapPin,
  },
  {
    id: 2,
    title: "Travel Dates",
    icon: Calendar,
  },
  {
    id: 3,
    title: "Personal Info",
    icon: User,
  },
  {
    id: 4,
    title: "Tour Package",
    icon: Package,
  },
  {
    id: 5,
    title: "Payment",
    icon: CreditCard,
  },
  {
    id: 6,
    title: "Receipt",
    icon: Upload,
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "rock-churches",
    title: "Explore the iconic rock-hewn churches of Ethiopia",
    description: "Journey through Ethiopia's spiritual wonders and ancient architecture with expert guides.",
    imageUrl: "/placeholder.svg",
    icon: Landmark,
    color: "bg-purple-50",
  },
  {
    id: "walled-city",
    title: "Discover the ancient walled city and its fascinating heritage",
    description: "Step back in time as you explore traditional villages and experience authentic Ethiopian culture.",
    imageUrl: "/placeholder.svg",
    icon: Building,
    color: "bg-blue-50",
  },
  {
    id: "erta-ale",
    title: "Witness the Otherworldly Beauty of Erta Ale",
    description: "Embark on an adventure to see the spectacular active lava lake of Erta Ale volcano.",
    imageUrl: "/placeholder.svg",
    icon: Mountain,
    color: "bg-orange-50",
  },
];

export const INITIAL_FORM_DATA = {
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
