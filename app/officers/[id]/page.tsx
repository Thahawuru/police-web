"use client";
import React, { useState, ChangeEvent, MouseEvent , useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Welcome from "../../components/navbar/navbar";
import { TextField, Button, Box, Typography } from "@mui/material";
import Image from 'next/image';
import profileAvatar from '../../../public/7309667.jpg'
import { useApiKeys } from "../../api/useApiKeys";
import { useSearchParams } from "next/navigation";
import { strict } from "assert";

interface Maintainer {
  id: string;
  badgeNumber: string;
  name: string;
  rank: string;
  position: string;
  department: string;
  status: string;
  doj: string; // date of joining
  number: string;
}

export default function Page() {
  const { fetchOffcierDetails } = useApiKeys();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.pathname;
      const id = url.split("/").pop();
      officerDetails(id);
    }
  }, []);

  const [activeItem, setActiveItem] = useState("Police Officers");
  const [maintainer, setMaintainer] = useState<Maintainer>({
    id: '',
  badgeNumber: '',
  name: '',
  rank: '',
  position: '',
  department: '',
  status: '',
  doj: '', // date of joining
  number: '',
  });

  const officerDetails = async (id: string | undefined) => {
    if (!id) return;
    const res = await fetchOffcierDetails(id);
    console.log(res);

    if (res) {
      setMaintainer({
        id: res.policeId,
        badgeNumber: res.policeBadgeNumber,
        name: res.nic,
        rank: res.rank,
        position: res.position,
        department: res.department,
        status: res.status,
        doj: res.doj,
        number: res.number,
      });
  }
  };

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
              <b>Officer Name</b>
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
                label="Police Badge Number"
                variant="outlined"
                name="badgeNumber"
                value={maintainer.badgeNumber}
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
                label="Phone Number"
                variant="outlined"
                name="number"
                value={maintainer.number}
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
                label="Rank"
                variant="outlined"
                name="rank"
                value={maintainer.rank}
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
                label="Position"
                variant="outlined"
                name="position"
                value={maintainer.position}
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
                label="Department"
                variant="outlined"
                name="department"
                value={maintainer.department}
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
                label="Status"
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
              <TextField
                fullWidth
                label="Date Of Join"
                variant="outlined"
                name="doj"
                value={maintainer.doj}
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
