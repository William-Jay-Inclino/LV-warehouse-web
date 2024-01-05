import axios, { AxiosResponse } from 'axios';

const apiUrl = import.meta.env.VITE_API_URL 

console.log('apiUrl', apiUrl)

export const sendRequest = async(queryOrMutation: string): Promise<AxiosResponse> => {
    console.log('queryOrMutation', queryOrMutation)
    try {
        return await axios.post(
            apiUrl,
            { query: queryOrMutation },
            { headers: { 'Content-Type': 'application/json' } }
        );
      } catch (error) {
            console.error(error);
            throw error;
    }
}