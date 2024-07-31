import axios from "axios";
import apiClient from "./apiClient";
import Toast from "../components/utils/toaster";

export const useApiKeys = () => {
    const createPoliceOfficer = async (data) => {

        try {
          console.log('data',data);
          const response = await apiClient.post(`/admin/createpolice`, {
            email : data.email,
            password : data.password,
            NIC : data.NIC,
            policeBadgeNumber: "3E4A",
            rank: "DIG",
            department:"colombo"
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