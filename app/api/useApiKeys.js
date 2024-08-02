import axios from "axios";
import apiClient from "./apiClient";
import Toast from "../components/utils/toaster";
import dotenv from 'dotenv';
import { Password } from "@mui/icons-material";

export const useApiKeys = () => {
    const createPoliceOfficer = async (data) => {

        try {
          console.log('data',data);
          const response = await apiClient.post(`/admin/createpolice`, {
            email: data.email,
            Password:process.env.DEFAULT_PASSWORD,
            id: data.id,
            badgeNumber: data.badgeNumber,
            name: data.name,
            rank: data.rank,
            position: data.position,
            department: data.department,
            status: 1,
            doj: data.doj,
            number: data.number
          });

          console.log("THis is the response",response);
          // try {
          //   const responseData = JSON.parse(response.data);
          //   console.log('Response Data:', responseData);
          //   return responseData;
          // } catch (jsonError) {
          //   console.error('Response is not valid JSON:', response.data);
          //   throw new Error('Invalid JSON response');
          // }
          // return response;
        } catch (error) {
          console.log("Thisi is the error",error)
          throw new Error(error);
        }
      };

      return{
        createPoliceOfficer
      };
};