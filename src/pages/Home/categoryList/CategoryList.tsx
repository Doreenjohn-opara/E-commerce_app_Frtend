import { IoPhonePortraitOutline, IoCameraOutline, IoGameControllerOutline, IoHomeOutline } from "react-icons/io5";
import { IoIosLaptop } from "react-icons/io";
import { PiTelevisionSimpleThin, PiWatch  } from "react-icons/pi";
import { CiApple, CiCircleMore } from "react-icons/ci";
import { LuCarFront } from "react-icons/lu";

export const categories = [
    {
        name: 'Phones & Tablets',
        icon: <IoPhonePortraitOutline size={25} />
    },

    {
        name: 'Appliances',
        icon: <PiTelevisionSimpleThin size={25} />
    },

    {
        name: 'Computing',
        icon: <IoIosLaptop size={25} />
    }, 

    {
        name: 'Wearable Tech',
        icon: <PiWatch size={25} />
    },

    {
        name: 'Supermarket',
        icon: <CiApple size={25} />
    },

    {
        name: 'Cameras',
        icon: <IoCameraOutline size={25} />
    },

    {
        name: 'Gaming',
        icon: <IoGameControllerOutline size={25} />
    },

    {
        name: 'Land & Properties',
        icon: <IoHomeOutline size={25} />
    },

    {
        name: 'Automobile',
        icon: <LuCarFront size={25} />
    },

    {
        name: 'Other Categories',
        icon: <CiCircleMore size={25} />
    }
]

