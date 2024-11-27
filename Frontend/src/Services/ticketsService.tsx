import { attractionsLoading, attractionsReceived } from '../Redux/features/attractionsSlice';
import axios from 'axios';
import { ticketsLoading, ticketsReceived } from '../Redux/features/ticketsSlice';


export const loadTickets = (body: any) => {
  return async (dispatch: any) => {
    dispatch(ticketsLoading());
    try {
      const response = await axios.post("http://localhost:3002/customer/tickets", body);
      if (response.status === 200) {
        console.log(response)
        dispatch(ticketsReceived(response?.data?.Tickets));
      } else {
        dispatch(ticketsReceived({}));
      }
    } catch (error) {
      console.error('Error loading attractions Data:', error);
      dispatch(ticketsReceived({}));
    }
  };
};

export const createTickets = (body: any) => {
  return async (dispatch: any) => {
    dispatch(ticketsLoading());
    try {
      const response = await axios.post("http://localhost:3002/customer/create_tickets", body);
      if (response.status === 200) {
        console.log(response)
        dispatch(ticketsReceived({}));
      } else {
        dispatch(ticketsReceived({}));
      }
    } catch (error) {
      console.error('Error loading attractions Data:', error);
      dispatch(ticketsReceived({}));
    }
  };
};

