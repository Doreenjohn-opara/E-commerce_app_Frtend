import { CiApple, CiCircleMore } from "react-icons/ci";
import { FaMobileAlt, FaUtensils, FaBook, FaBicycle, FaHeart, FaGamepad, FaCamera, FaShoppingBag } from "react-icons/fa";
import { IoCameraOutline, IoHomeOutline } from "react-icons/io5";
import { LuCarFront } from "react-icons/lu";
import { PiTelevisionSimpleThin, PiWatch } from "react-icons/pi";

// Define the possible category names
export type CategoryName =
  | "Phones"
  | "Appliances"
  | "Computing"
  | "Wearable"
  | "Supermarket"
  | "Cameras"
  | "Gaming"
  | "Land"
  | "Automobile"
  | "Default"
  | "Others";

// Define Category Type
export type Category = {
  name: CategoryName;
  icon: JSX.Element;
};

// Category Icons
export const categoryIcons: Record<string, JSX.Element> = {
  Phones: <FaMobileAlt />,
  Appliances: <PiTelevisionSimpleThin />,
  Computing: <FaUtensils />,
  Wearable: <PiWatch />,
  Supermarket: <CiApple />,
  Cameras: <IoCameraOutline />,
  Gaming: <FaGamepad />,
  Land: <IoHomeOutline />,
  Automobile: <LuCarFront />,
  Others: <CiCircleMore />,
  Default: <FaShoppingBag />, // Fallback icon
};

// Category List with Icons
export const categories: Category[] = [
  { name: "Phones", icon: categoryIcons["Phones"] },
  { name: "Appliances", icon: categoryIcons["Appliances"] },
  { name: "Computing", icon: categoryIcons["Computing"] },
  { name: "Wearable", icon: categoryIcons["Wearable"] },
  { name: "Supermarket", icon: categoryIcons["Supermarket"] },
  { name: "Cameras", icon: categoryIcons["Cameras"] },
  { name: "Gaming", icon: categoryIcons["Gaming"] },
  { name: "Land", icon: categoryIcons["Land"] },
  { name: "Automobile", icon: categoryIcons["Automobile"] },
  { name: "Default", icon: categoryIcons["Default"] },
  { name: "Others", icon: categoryIcons["Others"] },
];

// Category List with Icons
export const categoryList: Category[] = Object.keys(categoryIcons).map(
  (key) => ({
    name: key as CategoryName,
    icon: categoryIcons[key as CategoryName], // Explicit casting prevents errors
  })
);