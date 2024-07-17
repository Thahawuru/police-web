import React, { useState } from "react";
import Image from "next/image";
import { BiSearch, BiBell } from "react-icons/bi"; // Import the notification icon
// import ProfileImage from "../../public/profilePicDefault.png";

const Navbar = () => {
  const [isBellClicked, setIsBellClicked] = useState(false);

  const handleBellClick = () => {
    setIsBellClicked(!isBellClicked);
    setTimeout(() => {
      setIsBellClicked(false); // Reset the click state after the effect
    }, 300);
  };

  return (
    <div className="bg-white h-[75px] flex items-center justify-end px-4 fixed top-0 left-[250px] w-5/6 z-50 border border-primary-600 ml-1">
      <div className="flex items-center w-full">
        <div className="w-full">
          <div className="relative w-full flex flex-row justify-center items-center">
            <input
              type="text"
              placeholder="Search..."
              className="px-10 py-3 rounded-custom-1 w-1/2 text-secondaryTwo focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center w-1/6 justify-center">
        <div className="flex flex-col justify-center items-center mr-2">
          <p className="text-gray-500 text-xs font-bold">Kasun Udara</p>
        </div>
        {/* <Image
          src={ProfileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-4"
        /> */}
        <BiBell
          className={`w-6 h-6 cursor-pointer transition-colors duration-300 ${
            isBellClicked ? "text-red-500" : "text-secondaryTwo"
          }`}
          onClick={handleBellClick}
        />
      </div>
    </div>
  );
};

export default Navbar;
