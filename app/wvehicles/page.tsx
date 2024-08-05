"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";
import Sidebar from "../components/sidebar/sidebar";
import Welcome from "../components/navbar/navbar";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Vehicle {
  id: number;
  plateNumber: string;
  color: string;
  type: string;
  currentOwner: string;
  district: string;
  status: string; // e.g., "Wanted", "Recovered"
}

const initialVehicles: Vehicle[] = [
  {
    id: 1,
    plateNumber: 'ABC-1234',
    color: 'Red',
    type: 'CHR',
    currentOwner: 'G.W.D. Banuka',
    district: 'Colombo',
    status: 'Wanted',
  },
];

export default function Page() {
  const [activeItem, setActiveItem] = useState("Wanted Vehicles");

  const handleSetActiveItem = (itemTitle: any) => {
    setActiveItem(itemTitle);
  };

  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleDelete = (id: number): void => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };

  const handleRevoke = (id: number): void => {
    console.log(`Revoke permissions for vehicle with id ${id}`);
  };

  const handlePreview = (id: number): void => {
    console.log(`Preview vehicle with id ${id}`);
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.currentOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-white min-h-screen h-auto flex flex-row items-end justify-center">
      <div className="h-screen flex flex-col justify-between items-center">
        <Sidebar
          activeItem={activeItem}
          onSetActiveItem={handleSetActiveItem}
        />
      </div>
      <div className="flex flex-col w-5/6 ml-[250px]">
        <Welcome />
        <div className="flex flex-row w-full h-auto p-4 mt-20">
          <div className="flex flex-row justify-start items-center w-2/3">
            <h1 className="text-2xl font-bold text-secondaryTwo w-full text-left pl-10">
              <b>Wanted Vehicles</b>
            </h1>
          </div>

          <div className="flex flex-row justify-end items-center w-1/2">
            <div className="flex flex-row justify-between items-center w-1/2">
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  style: {
                    height: "40px",
                  },
                }}
              />
            </div>
          </div>
        </div>
        <Link href="/admin/accounts/addAccount" className="w-3/4">
          <button
            type="submit"
            className="flex-none rounded-custom-3 bg-secondary hover:bg-secondaryTwo  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform ml-10 mb-2"
          >
            Add Vehicle
          </button>
        </Link>
        <div className="w-full flex flex-row justify-center items-center">
          <div className="w-full min-h-[550px] h-auto mb-10 ml-10 mr-10">
            <Paper sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
              <TableContainer>
                <Table aria-label="vehicle table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Vehicle Plate No</TableCell>
                      <TableCell>Colour</TableCell>
                      <TableCell>Vehicle</TableCell>
                      <TableCell>Current Owner</TableCell>
                      <TableCell>District</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredVehicles
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((vehicle) => (
                        <TableRow key={vehicle.id}>
                          <TableCell>{vehicle.plateNumber}</TableCell>
                          <TableCell>{vehicle.color}</TableCell>
                          <TableCell>{vehicle.type}</TableCell>
                          <TableCell>{vehicle.currentOwner}</TableCell>
                          <TableCell>{vehicle.district}</TableCell>
                          <TableCell>{vehicle.status}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              color="primary"
                              onClick={() => handlePreview(vehicle.id)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleRevoke(vehicle.id)}
                            >
                              <BlockIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(vehicle.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredVehicles.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}
