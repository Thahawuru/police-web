"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Welcome from "../../components/navbar/navbar";
import { TextField, Button, Box, Typography } from "@mui/material";
import Image from 'next/image';
import profileAvatar from '../../../public/7309667.jpg'

interface Maintainer {
  id: number;
  name: string;
  dob: string;
  gender: string;
  nic: number;
  reasonForBeingWanted: string;
  color: string;
  height: string;
  bodyType:string;
  otherInfo: string;
  status: string;
  photo: string;
}

export default function Page() {
  const [activeItem, setActiveItem] = useState("Wanted Persons");
  const [maintainer, setMaintainer] = useState<Maintainer>({
    id: 1,
    name: 'diniru',
    dob: '2001-9-9',
    gender: "male",
    nic: 200117710551,
    reasonForBeingWanted: 'murder',
    color: 'black',
    height: '6ft',
    bodyType:'body builder',
    otherInfo:'fucking idiot' ,
    status: 'active',
    photo: '',
  });

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

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Handle form submission logic here, such as making an API call
    console.log("Creating maintainer:", maintainer);
  };

  return (
    <div className="w-full bg-white h-auto flex flex-row">
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
              <b>Wanted Person</b>
            </h1>
            <Box
              component="form"
              className="w-4/5 h-full"
              noValidate
              autoComplete="off"
            >
                  <Image
                    src={profileAvatar}
                    alt="image description"
                    width={150}  
                    height={150} 
                    className="rounded-full"
                  />
              <TextField
                fullWidth
                label="ID"
                variant="outlined"
                name="id"
                value={maintainer.id}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  style: {
                    height: "45px",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                name="name"
                value={maintainer.name}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  style: {
                    height: "45px",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Date of birth"
                variant="outlined"
                name="dob"
                value={maintainer.dob}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  style: {
                    height: "45px",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Gender"
                variant="outlined"
                name="gender"
                value={maintainer.gender}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  style: {
                    height: "45px",
                  },
                }}
              />
              <TextField
                fullWidth
                label="NIC"
                variant="outlined"
                name="nic"
                value={maintainer.nic}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  style: {
                    height: "45px",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Reason For Beign Wanted"
                variant="outlined"
                name="reasonForBeingWanted"
                value={maintainer.reasonForBeingWanted}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  style: {
                    height: "45px",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Color"
                variant="outlined"
                name="color"
                value={maintainer.color}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  style: {
                    height: "45px",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Height"
                variant="outlined"
                name="height"
                value={maintainer.height}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  style: {
                    height: "45px",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Body Type"
                variant="outlined"
                name="bodyType"
                value={maintainer.bodyType}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  style: {
                    height: "45px",
                  },
                }}
              /> 
              <TextField
                fullWidth
                label="Other Info"
                variant="outlined"
                name="otherInfo"
                value={maintainer.otherInfo}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  style: {
                    height: "45px",
                  },
                }} 
              /> 
              <TextField
                fullWidth
                label="status"
                variant="outlined"
                name="status"
                value={maintainer.status}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  style: {
                    height: "45px",
                  },
                }} 
              /> 
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}
