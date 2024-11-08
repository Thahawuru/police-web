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
            status: "active",
            photo: data.photo
          });

          console.log("THis is the response",response);
        } catch (error) {
          console.log("This is the error",error)
          throw new Error(error);
        }
    };

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

    return{
        createPoliceOfficer,
        fetchAllPoliceOfficers
    };

};