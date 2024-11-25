"use client";
import React, {useState, ChangeEvent, MouseEvent, useEffect} from "react";
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
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {useApiKeys} from "@/app/api/useApiKeys";
import {number, string} from "prop-types";

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
}

const initialMaintainers: Maintainer[] = [
  {
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
  },
];

export default function Page() {
  const [activeItem, setActiveItem] = useState("Wanted Persons");
  const handleSetActiveItem = (itemTitle: any) => {
    setActiveItem(itemTitle);
  };

  const [maintainers, setMaintainers] = useState<Maintainer[]>(initialMaintainers);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {fetchAllWantedPersons} = useApiKeys();

  const fetchWantedPersons = async () => {
    const res = await fetchAllWantedPersons();
    console.log("All wanted Persons",res);

    const fetchedPersons = res.map((person: {
      userid: string;
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
    }) => ({
      id: person.userid,
      name: person.name,
      dob: person.dob,
      gender: person.gender,
      nic: person.nic,
      reasonForBeingWanted: person.reasonForBeingWanted,
      color: person.color,
      height: person.height,
      bodyType: person.bodyType,
      otherInfo: person.otherInfo,
      status: person.status,
    }));
    setMaintainers(fetchedPersons);
  };

  useEffect(() => {
    fetchWantedPersons();
  },[]);

  const handleDelete = (id: number): void => {
    setMaintainers(maintainers.filter((maintainer) => maintainer.id !== id));
  };

  const handleRevoke = (id: number): void => {
    console.log(`Revoke permissions for maintainer with id ${id}`);
  };

  const handlePreview = (id: number): void => {
    console.log(`Preview maintainer with id ${id}`);
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
        maintainer.nic.toString().includes(searchQuery) ||
        maintainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        maintainer.dob.toLowerCase().includes(searchQuery.toLowerCase()) ||
        maintainer.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
        maintainer.height.toLowerCase().includes(searchQuery.toLowerCase()) ||
        maintainer.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        maintainer.bodyType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        maintainer.gender.toLowerCase().includes(searchQuery.toLowerCase())
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
              <b>Fugitve Persons</b>
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
        <Link href="/wpersons/addwperson" className="w-3/4">
              <button
                type="submit"
                className="flex-none rounded-custom-3 bg-secondary hover:bg-secondaryTwo  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform ml-10 mb-2"
              >
                Add Fugitive Person
              </button>
            </Link>
        <div className="w-full flex flex-row justify-center items-center">
          <div className="w-full min-h-[550px] h-auto mb-10 ml-10 mr-10">
            <Paper sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
              <TableContainer>
                <Table aria-label="maintainer table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Date Of Birth</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>NIC</TableCell>
                      <TableCell>Height</TableCell>
                      <TableCell>Color</TableCell>
                      <TableCell>Status</TableCell>
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
                          <TableCell>{maintainer.id}</TableCell>
                          <TableCell>{maintainer.name}</TableCell>
                          <TableCell>{maintainer.dob}</TableCell>
                          <TableCell>{maintainer.gender}</TableCell>
                          <TableCell>{maintainer.nic}</TableCell>
                          <TableCell>{maintainer.height}</TableCell>
                          <TableCell>{maintainer.color}</TableCell>
                          <TableCell>{maintainer.status}</TableCell>
                          <TableCell align="right">
                            <Link href={`wpersons/${maintainer.id}`}>
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
