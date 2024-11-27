import { attractionsLoading,attractionsReceived } from '../Redux/features/attractionsSlice';
import axios from 'axios';
import { favoritesLoading, favoritesReceived } from '../Redux/features/favoritesSlice';


export const loadFavorites = (body: any) => {
    return async (dispatch:any) => {
      dispatch(favoritesLoading());
      try {
        console.log(body)
        const response = await axios.post("http://localhost:3002/customer/getFavorites", body);
        console.log(response)
        if (response.status === 200) {
          dispatch(favoritesReceived(response?.data?.favorites));
        } else {
          dispatch(favoritesReceived({})); 
        }
      } catch (error) {
        console.error('Error loading attractions Data:', error);
        dispatch(favoritesReceived({})); 
      }
    };
  };


export const removeFavorites = (body: any) => {
    return async (dispatch:any) => {
        dispatch(favoritesLoading());
        try {
            console.log(body)
          const response = await axios.post("http://localhost:3002/customer/removeFavorites", body);
          console.log(response)
          if (response.status === 200) {
              console.log(response)
            dispatch(favoritesReceived(response?.data?.favorites));
          } else {
            dispatch(favoritesReceived({})); 
          }
        } catch (error) {
          console.error('Error loading attractions Data:', error);
          dispatch(favoritesReceived({})); 
        }
      };
};

