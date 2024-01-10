import axios, { AxiosResponse } from 'axios';

const apiUrl = import.meta.env.VITE_API_URL 

console.log('apiUrl', apiUrl)

export const sendRequest = async (queryOrMutation: string, variables?: Record<string, any>): Promise<AxiosResponse> => {
    console.log('sendRequest()');
    console.log('queryOrMutation', queryOrMutation)
    console.log('variables', JSON.stringify(variables))
    
    try {
        const requestData = {
            query: queryOrMutation,
            variables,
        };

        return await axios.post(
            apiUrl,
            requestData,
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
