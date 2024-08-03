"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Welcome from "../../components/navbar/navbar";
import { TextField, Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import profileAvatar from "../../../public/7309667.jpg";
import { useApiKeys } from "../../api/useApiKeys";
import Toast from "../../components/utils/toaster";

interface PoliceMan {
  email: string;
  badgeNumber: number;
  name: string;
  rank: string;
  position: string;  
  department: string;
  doj: string; // date of joining
  number: number;
}

const fields = [
  { label: "Email", name: "email", type: "email" },
  { label: "Name", name: "name", type: "text" },
  { label: "Badge Number", name: "badgeNumber", type: "number" },
  { label: "Rank", name: "rank", type: "text" },
  { label: "Position", name: "position", type: "text" },
  { label: "Department", name: "department", type: "text" },
  { label: "Date of Joining", name: "doj", type: "date" },
  { label: "Phone Number", name: "number", type: "number" },
];

export default function Page() {
  const { createPoliceOfficer } = useApiKeys();
  const [activeItem, setActiveItem] = useState("Police Officers");
  const [policeman, setPoliceman] = useState<PoliceMan>({
    email: "",
    badgeNumber: 0,
    name: "",
    rank: "",
    position: "",
    department: "",
    doj: "",
    number: 0,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleSetActiveItem = (itemTitle: string) => {
    setActiveItem(itemTitle);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPoliceman({
      ...policeman,
      [name]: value,
    });
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Creating police officer:", policeman);
    try {
      const response = await createPoliceOfficer(policeman);
      Toast({ type: "success", message: "Police officer added successfully" });
      console.log(response);
    } catch (error) {
      console.log(error);
      Toast({ type: "fail", message: "Failed to add police officer" });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileType = file.type;
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (validImageTypes.includes(fileType)) {
          setFiles((prevFiles) => [...prevFiles, file]);
        } else {
          setMessage("Only images are accepted");
        }
      }
    }
  };

  const removeImage = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

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
          <Box className="w-full flex flex-col justify-between items-center">
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
                <TextField
                  key={index}
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
                />
              ))}
              <Button
                type="submit"
                onClick={handleSubmit}
                className="flex-none rounded-custom-3 bg-secondary hover:bg-secondaryTwo px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 mt-8"
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
