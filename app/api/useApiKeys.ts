import apiClient from "./apiClient";

interface MaintainerData {
  email: string;
  password: string;
  NIC: string;
  policeBadgeNumber?: string;
  rank?: string;
  department?: string;
}

export const useApiKeys = () => {
  const createPoliceOfficer = async (data: MaintainerData) => {
    try {
      console.log('data',data);
      const response = await apiClient.post(`/admin/createpolice`, {
        email: data.email,
        password: data.password,
        nic: data.NIC,
        policeBadgeNumber: data.policeBadgeNumber || '3E4A', // Use default if not provided
        rank: data.rank || 'DIG', // Use default if not provided
        department: data.department || 'colombo' // Use default if not provided
      });
      console.log('Response Data:', response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status code different from 2xx
        console.error('Response Error:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Request Error:', error.request);
      } else {
        // Something else went wrong
        console.error('Error Message:', error.message);
      }
      throw error;
    }
  };

  return {
    createPoliceOfficer
  };
};