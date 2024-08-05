"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";
import Sidebar from "../components/sidebar/sidebar";
import Welcome from "../components/navbar/navbar";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useApiKeys } from "../api/useApiKeys";
import apiClient from "@/app/api/apiClient";

interface Maintainer {
  nic:string,
  key:string
}

export default function Page() {
  const { createPoliceOfficer } = useApiKeys();
  const [activeItem, setActiveItem] = useState("Create Key");
  const [maintainer, setMaintainer] = useState<Maintainer>({
    nic:'',
    key:''
  });

  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleSetActiveItem = (itemTitle: string) => {
    setActiveItem(itemTitle);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMaintainer({
      ...maintainer,
      [name]: value,
    });
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      console.log(maintainer);
      const response = await apiClient.post(`/admin/createpolice`, maintainer);
      console.log('Response Data:', response.data);
      setMessage("Police officer added successfully");
    } catch (error : any) {
      if (error.response) {
        console.error('Response Error:', error.response.data);
        console.error('Response Status:', error.response.status);
      } else if (error.request) {
        console.error('Request Error:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
      setMessage("Failed to add police officer");
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
              <b>Create a Key</b>
            </h1>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label="NIC"
                variant="outlined"
                name="nic"
                value={maintainer.nic}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Key"
                variant="outlined"
                name="key"
                value={maintainer.key}
                onChange={handleInputChange}
                margin="normal"
              />
              <Button type="submit" onClick={handleSubmit} className="mt-4">
                Create Key
              </Button>
              {message && <p>{message}</p>}
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}

function Toast(arg0: { type: string; message: string }) {
  throw new Error("Function not implemented.");
}
