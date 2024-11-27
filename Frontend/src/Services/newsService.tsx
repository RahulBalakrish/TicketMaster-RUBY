import { newsLoading,newsReceived } from '../Redux/features/newsSlice';
import axios from 'axios';


export const loadNews = () => {
    return async (dispatch:any) => {
      dispatch(newsLoading());
      try {
        const response = await axios.get("http://localhost:3002/events/fetch_data");
        if (response.status === 200) {
            console.log(response)
          dispatch(newsReceived(response.data));
        } else {
          dispatch(newsReceived({})); 
        }
      } catch (error) {
        console.error('Error loading News Data:', error);
        dispatch(newsReceived({})); 
      }
    };
  };
