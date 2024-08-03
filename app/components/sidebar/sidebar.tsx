"use client";
import React, { useState } from "react";
import {
  BiHome,
  BiTask,
  BiUser,
  BiCog,
  BiGroup,
  BiLogOut,
  BiShield,
  BiAlarmExclamation,
  BiDollarCircle,
  BiAlarm,
} from "react-icons/bi";

import Link from "next/link";

const menuItems = [
  {
    category: "Dashboard",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: <BiHome />,
        badge: null,
      },
    ],
  },
  {
    category: "Police Officers",
    items: [
      {
        title: "Police Officers",
        href: "/officers",
        icon: <BiGroup />,
        badge: null,
      },
    ],
  },
  {
    category: "Wanted Persons",
    items: [
      {
        title: "Wanted Persons",
        href: "/wpersons",
        icon: <BiTask />,
        badge: null,
      },
    ],
  },
  {
    category: "Wanted Vehicles",
    items: [
      {
        title: "Wanted Vehicles",
        href: "/wvehicles",
        icon: <BiTask />,
        badge: null,
      },
    ],
  },
  // {
  //   category: "Settings",
  //   items: [
  //     {
  //       title: "Settings",
  //       href: "/admin/settings",
  //       icon: <BiCog />,
  //       badge: null,
  //     },
  //   ],
  // },
  {
    category: "Logout",
    items: [
      {
        title: "Logout",
        href: "/admin/logout",
        icon: <BiLogOut />,
        badge: null,
      },
    ],
  },
];

type SidebarProps = {
  activeItem: string;
  onSetActiveItem: (item: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onSetActiveItem }) => {
  return (
    <aside className="fixed top-0 left-0 flex-shrink-0 w-64 bg-primary shadow-lg border-r border-gray-200 lg:block h-full z-60">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center flex-shrink-0 px-4 py-5">
          <a
            href="#"
            className="px-2 text-xl font-black leading-5 text-secondaryTwo"
          >
            <b>තහවුරු Police</b>
          </a>
        </div>
        <div className="flex flex-col flex-grow px-4">
          <nav className="flex-1 space-y-4">
            {menuItems.map((category, index) => (
              <div key={index}>
                <div className="text-xs font-bold text-black uppercase px-4 mt-4 mb-2">
                  {category.category}
                </div>
                {category.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-custom-1 transition ease-in-out duration-150 border border-transparent ${
                      activeItem === item.title
                        ? "bg-secondaryTwo text-white border-secondaryTwo"
                        : "bg-white text-gray-500  hover:bg-white hover:text-secondaryTwo mb-1"
                    }`}
                    onClick={() => onSetActiveItem(item.title)}
                  >
                    {item.icon}
                    <span className="ml-3">
                      {activeItem === item.title ? (
                        <b>{item.title}</b>
                      ) : (
                        item.title
                      )}
                    </span>
                    {item.badge}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
