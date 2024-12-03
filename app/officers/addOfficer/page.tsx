"use client";
import React, {useState, ChangeEvent, MouseEvent, useEffect, useContext} from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Welcome from "../../components/navbar/navbar";
import { TextField, Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import profileAvatar from "../../../public/7309667.jpg";
import { useApiKeys } from "../../api/useApiKeys";
import Toast from "../../components/utils/toaster";
import Link from "next/link";

interface PoliceMan {
  email: string;
  badgeNumber: string;
  name: string;
  password: string;
  NIC: string; // Changed to NIC
  rank: string;
  position: string;
  department: string;
  doj: string; // date of joining
  status: string;
  photo: string;
}

const fields = [
  { label: "Email", name: "email", type: "email", required: true },
  { label: "Name", name: "name", type: "text", required: true },
  { label: "Password", name: "password", type: "password", required: true },
  { label: "NIC", name: "nic", type: "text", required: true },
  { label: "Badge Number", name: "badgeNumber", type: "text", required: true },
  { label: "Rank", name: "rank", type: "text", required: true },
  { label: "Position", name: "position", type: "text", required: true },
  { label: "Department", name: "department", type: "text", required: true },
  { label: "Date of Joining", name: "doj", type: "date", required: true },
  { label: "Status", name: "status", type: "text", required: true },
  { label: "Photo URL", name: "photo", type: "text", required: false },
];

export default function Page() {
  const { createPoliceOfficer } = useApiKeys();
  const [activeItem, setActiveItem] = useState("Police Officers");
  const [policeman, setPoliceman] = useState<PoliceMan>({
    email: "",
    badgeNumber: "",
    name: "",
    password: "",
    NIC: "",
    rank: "",
    position: "",
    department: "",
    doj: "",
    status: "Active",
    photo: "photo",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSetActiveItem = (itemTitle: string) => {
    setActiveItem(itemTitle);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPoliceman((prevPoliceman) => ({
      ...prevPoliceman,
      [name === "nic" ? "NIC" : name]: value, // Map nic to NIC
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    fields.forEach((field) => {
      if (field.required && !(policeman as any)[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.name === "email" && policeman.email && !/\S+@\S+\.\S+/.test(policeman.email)) {
        newErrors.email = "Email is invalid";
      }
      if (field.name === "password" && policeman.password && policeman.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) {
      Toast({ type: "fail", message: "Please fill all the required fields correctly" });
      return;
    }

    console.log("Creating police officer:", policeman);
    try {
      const response = await createPoliceOfficer(policeman);
      console.log("Response:", response);
      } catch (error) {
        console.log(error);
      }
  };

  // Breadcrumbs Component
  function BasicBreadcrumbs() {
    return (
      <div className="text-2xl font-bold text-secondaryTwo w-full text-left pl-10 mb-4">
        <Link href="/officers" className="text-secondaryTwo text-sm font-semibold">
        View Officers/
        </Link>
        <Link href="" className="text-secondaryTwo text-sm font-semibold">
        Add Officers
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white h-auto flex flex-row ">
      <div className="h-screen flex flex-col justify-between items-center">
        <Sidebar
          activeItem={activeItem}
          onSetActiveItem={handleSetActiveItem}
        />
      </div>
      <div className="flex flex-col w-5/6 ml-[250px]">
        <Welcome />
        <div className="flex flex-col justify-center items-center w-full h-min p-4 mt-20">
          <Box className="w-full flex flex-col justify-center items-center">
            <BasicBreadcrumbs />
            <h1 className="text-2xl font-bold text-secondaryTwo w-full text-left pl-10 mb-4">
              <b>Create Police Officer Account</b>
            </h1>
            <Box
              component="form"
              className="w-4/5 h-full"
              noValidate
              autoComplete="off"
            >
              {fields.map((field, index) => (
                <div key={index}>
                  <TextField
                    fullWidth
                    label={field.label}
                    variant="outlined"
                    name={field.name}
                    value={(policeman as any)[field.name]}
                    onChange={handleInputChange}
                    margin="normal"
                    type={field.type}
                    InputProps={{
                      style: {
                        height: "45px",
                      },
                    }}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]}
                  />
                </div>
              ))}
              <Button
                type="submit"
                onClick={handleSubmit}
                className="flex-none rounded-custom-3 bg-secondaryTwo hover:bg-secondaryTwo px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 mt-8"
              >
                Create Account
              </Button>
              {message && <p>{message}</p>}
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}
