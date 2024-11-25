import axios from "axios";
import apiClient from "./apiClient";

export const useApiKeys = () => {
    const createPoliceOfficer = async (data) => {

        try {
          console.log('data',data);
          const response = await apiClient.post(`/admin/createpolice`, {
            name: data.name,
            email: data.email,
            password: data.password,
            nic: data.nic,
            policeBadgeNumber: data.badgeNumber,
            rank: data.rank,
            position: data.position,
            department: data.department,
            dateOfJoining: data.doj,
            status: "Active",
            photo: data.photo
          });

          console.log("THis is the response",response);
        } catch (error) {
          console.log("This is the error",error)
          throw new Error(error);
        }
    };

    const createWantedPerson = async (data) => {
        try{
            const response = await apiClient.post(`/wantedPerson/createWantedPerson`, {
                name: data.name,
                dob: data.dob,
                gender: data.gender,
                nic: data.nic,
                reasonForBeingWanted: data.reasonForBeingWanted,
                color: data.color,
                height: data.height,
                bodyType: data.bodyType,
                otherInfo: data.otherInfo,
                status: data.status,
                photo: data.photo,
            });
            console.log("THis is the response",response);
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }

    const fetchAllPoliceOfficers = async () => {
        try {
          const response = await apiClient.get(`/police`);

          const policeOfficersData = response.data.data;
          console.log("Police Officers Data:", policeOfficersData);

          return policeOfficersData;
        } catch (error) {
          console.log("Police Officer Fetch error",error)
          throw new Error(error);
        }
    };

    const fetchAllWantedPersons = async () => {
        try{
            const response = await apiClient.get(`/wantedPerson`);
            const wantedPersonData = response.data.data;
            console.log("Wanted Data:", wantedPersonData);
            return wantedPersonData;
        }catch(e){
            console.log("This is the error",e);
            throw new Error(e);
        }
    }

    const deletePoliceOfficer = async (id) => {
      try{
        console.log("Police Officer ID:", id);
        const response = await apiClient.delete(`/police/delete/${id}`);
        console.log("Police Officer Deleted:", response);

      }catch(error){
        console.log("Police Officer Delete error",error)
        throw new Error(error);
      }
    };

    const fetchOffcierDetails = async (id) => {
        try{
          console.log("Police Officer ID:", id);
            const response = await apiClient.get(`/police/${id}`);
            console.log("Officer Details:", response);
            return response.data.data;
        }catch(e){
            console.log("This is the error",e);
            throw new Error(e);
        }
    };

    const fetchWantedPersonDetails = async (id) => {
      try{
        console.log(" Wperson ID:", id);
          const response = await apiClient.get(`/wantedPerson/${id}`);
          console.log("Wperson Details:", response);
          return response.data.data;
      }catch(e){
          console.log("This is the error",e);
          throw new Error(e);
      }
  };


    return{
        createPoliceOfficer,
        createWantedPerson,
        fetchAllPoliceOfficers,
        fetchAllWantedPersons,
        deletePoliceOfficer,
        fetchOffcierDetails,
        fetchWantedPersonDetails
    };

};
