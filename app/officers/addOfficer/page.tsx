"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Welcome from "../../components/navbar/navbar";
import { TextField, Box, Button, Typography } from "@mui/material";
import Image from 'next/image';
import profileAvatar from '../../../public/7309667.jpg';
import { useApiKeys } from "../../api/useApiKeys";

// interface Maintainer {
//   id: number;
//   badgeNumber: number;
//   name: string;
//   rank: string;
//   position: string;
//   department: string;
//   status: string;
//   doj: string; // date of joining
//   number: number;
// }

interface Maintainer {
  email: string;
  password: string;
  NIC: string;
}

export default function Page() {
  const {createPoliceOfficer} = useApiKeys();
  const [activeItem, setActiveItem] = useState("Police Officers");
  const [maintainer, setMaintainer] = useState<Maintainer>({
   email: '',
   password: '',
   NIC:''
  });

  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>('');

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
    console.log("Creating maintainer:", maintainer);
    try{
      const response = await createPoliceOfficer(maintainer);
      // Toast({ type: "success", message: "Police officer added successfully" });
      console.log(response);
    }catch(error){
      console.log(error);
      // Toast({ type: "fail", message: "Failed to add police officer" });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileType = file.type;
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (validImageTypes.includes(fileType)) {
          setFiles((prevFiles) => [...prevFiles, file]);
        } else {
          setMessage("Only images are accepted");
        }
      }
    }
  };

  const removeImage = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
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
              <TextField
                fullWidth
                label="email"
                variant="outlined"
                name="email"
                value={maintainer.email}
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
                label="password"
                variant="outlined"
                name="password"
                value={maintainer.password}
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
                name="NIC"
                value={maintainer.NIC}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  style: {
                    height: "45px",
                  },
                }}
              />
              {/* <TextField
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
              <TextField
                fullWidth
                label="Upload Photos"
                variant="outlined"
                name="doj"
                value={maintainer.doj}
                onChange={handleInputChange}
                margin="normal"
                InputProps={{
                  style: {
                    height: "45px",
                  },
                  disabled: true
                }} 
              />  */}
              {/* <div className="p-3 md:w-1/2 w-[360px] rounded-md">
                <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">{message}</span>
                <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer border-gray-400 border-dotted">
                  <input type="file" onChange={handleFileChange} className="h-full w-full opacity-0 z-10 absolute" multiple />
                  <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
                    <div className="flex flex-col">
                      <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                      <span className="text-[12px]">Drag and Drop a file</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {files.map((file, key) => (
                    <div key={key} className="w-full h-16 flex items-center justify-between rounded p-3 bg-white">
                      <div className="flex flex-row items-center gap-2">
                        <div className="h-12 w-12">
                          <img className="w-full h-full rounded" src={URL.createObjectURL(file)} alt={file.name} />
                        </div>
                        <span className="truncate w-44">{file.name}</span>
                      </div>
                      <div onClick={() => removeImage(file.name)} className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm">
                        <i className="mdi mdi-trash-can text-white text-[14px]"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
              <Button
                type="submit"
                onClick={handleSubmit}
                className="flex-none rounded-custom-3 bg-secondary hover:bg-secondaryTwo px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 mt-8"
              >
                Create Account
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}

function Toast(arg0: { type: string; message: string; }) {
  throw new Error("Function not implemented.");
}
