import axios from 'axios';

const exercisesDbAPI = axios.create({
  baseURL: 'https://exercisedb.p.rapidapi.com',
  headers: {
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    'x-rapidapi-key': 'ca9ad8f5f7mshd50ed0e48c8da36p1c6754jsnd4f9403403f1',
  },
});

export default exercisesDbAPI;
