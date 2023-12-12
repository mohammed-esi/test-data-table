import axios, { AxiosResponse } from 'axios';
import { Pokemon } from '../types/pokemon';

export const fetchData = async (): Promise<Pokemon[]> => {
  try {
    const response: AxiosResponse<Pokemon[]> = await axios.get<Pokemon[]>(
      '/public/pokemon.json',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};
