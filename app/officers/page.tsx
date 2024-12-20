"use client";
import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react";
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
import { useApiKeys } from "../api/useApiKeys";

interface Maintainer {
  id: number;
  badgeNumber: number;
  name: string;
  rank: string;
  position: string;
  department: string;
  status: string;
  doj: string; // date of joining
}

const initialMaintainers: Maintainer[] = [
  {
    id: 1,
    badgeNumber: 1,
    name: 'diniru',
    rank: 'dig',
    position: 'zdx',
    department: 'mount lavinia',
    status: 'active',
    doj: '2001-06-12',
  },
];

export default function Page() {
  const [maintainers, setMaintainers] = useState<Maintainer[]>(initialMaintainers);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeItem, setActiveItem] = useState("Police Officers");
  const { fetchAllPoliceOfficers } = useApiKeys();
  const handleSetActiveItem = (itemTitle: any) => {
    setActiveItem(itemTitle);
  };

  const {deletePoliceOfficer} = useApiKeys();

  const fetchOfficers = async () => {
    const res = await fetchAllPoliceOfficers();
    console.log('all police officers', res);

    const fetchedMaintainers = res.map((officer: {
      policeId: number;
      policeBadgeNumber: number;
      nic: string;
      rank: string;
      position: string;
      department: string;
      status: string;
      doj: string;
    }) => ({
      id: officer.policeId,
      badgeNumber: officer.policeBadgeNumber,
      name: officer.nic,
      rank: officer.rank,
      position: officer.position,
      department: officer.department,
      status: officer.status,
      doj: officer.doj,
    }));

    setMaintainers(fetchedMaintainers);
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deletePoliceOfficer(id);
      await fetchOfficers();
    } catch (error) {
      console.error("Error deleting officer:", error);
    }
  };

  const handleRevoke = (id: number): void => {
    console.log(`Revoke permissions for maintainer with id ${id}`);
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

  const filteredMaintainers = maintainers.filter(
    (maintainer) =>
      maintainer.badgeNumber.toString().includes(searchQuery) ||
      maintainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      maintainer.rank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      maintainer.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      maintainer.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      maintainer.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      maintainer.doj.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePreview = (id: number): void => {
    // Ensure the function is only called on the client side
  };

  return (
    <div className="w-full bg-white h-auto flex flex-row items-end justify-center">
      <div className="h-screen flex flex-col justify-between items-center">
        <Sidebar
          activeItem={activeItem}
          onSetActiveItem={handleSetActiveItem}
        />
      </div>
      <div className="flex flex-col w-5/6 ml-[250px]">
        <Welcome />
        {/* Add Breadcrumbs here */}

        <div className="flex flex-row w-full h-min p-4 mt-20">
          <div className="flex flex-col justify-start w-2/3">
            {/* <BasicBreadcrumbs /> */}
            <h1 className="text-2xl font-bold text-secondaryTwo w-full text-left pl-10">
              <b>Existing Accounts</b>
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
        <Link href="officers/addOfficer" className="w-3/4">
          <button
            type="submit"
            className="flex-none rounded-custom-3 bg-secondary hover:bg-secondaryTwo  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform ml-10 mb-2"
          >
            Add Officer
          </button>
        </Link>
        <div className="w-full flex flex-row justify-center items-center">
          <div className="w-full min-h-[550px] h-auto mb-10 ml-10 mr-10">
            <Paper sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
              <TableContainer>
                <Table aria-label="maintainer table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Badge Number</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Rank</TableCell>
                      <TableCell>Position</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date of joining</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredMaintainers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((maintainer) => (
                        <TableRow key={maintainer.id}>
                          <TableCell>{maintainer.badgeNumber}</TableCell>
                          <TableCell>{maintainer.name}</TableCell>
                          <TableCell>{maintainer.rank}</TableCell>
                          <TableCell>{maintainer.position}</TableCell>
                          <TableCell>{maintainer.department}</TableCell>
                          <TableCell>{maintainer.status}</TableCell>
                          <TableCell>{maintainer.doj}</TableCell>
                          <TableCell align="right">
                            <Link href={`officers/${maintainer.id}`}>
                                <IconButton
                                color="primary"
                                onClick={() => handlePreview(maintainer.id)}
                                >
                                <VisibilityIcon />
                                </IconButton>
                            </Link>

                            <IconButton
                              color="error"
                              onClick={() => handleRevoke(maintainer.id)}
                            >
                              <BlockIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(maintainer.id)}
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
                count={filteredMaintainers.length}
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
