import { attractionsLoading,attractionsReceived } from '../Redux/features/attractionsSlice';
import axios from 'axios';


export const loadattractions = () => {
    return async (dispatch:any) => {
      dispatch(attractionsLoading());
      try {
        const response = await axios.get("http://localhost:3002/attractions/fetch_data");
        if (response.status === 200) {
            console.log(response)
          dispatch(attractionsReceived(response.data));
        } else {
          dispatch(attractionsReceived({})); 
        }
      } catch (error) {
        console.error('Error loading attractions Data:', error);
        dispatch(attractionsReceived({})); 
      }
    };
  };
