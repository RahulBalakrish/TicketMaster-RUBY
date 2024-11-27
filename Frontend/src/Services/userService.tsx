import { usersLoggingIn, loginUser, loginUserError, saveUserRoute, makeFavorites, savesTickets } from '../Redux/features/userSlice';
import axios from 'axios';

export const userSignupFunction = (body: any) => {
    return async (dispatch: any) => {
        dispatch(usersLoggingIn());
        try {
            const response = await axios.post('http://localhost:3002/customer/register', body);
            if (response.status === 201) {
                dispatch(loginUser(response?.data?.user));
            }
            else {
                dispatch(loginUser({}));
            }
        } catch (error: any) {
            console.error('Error Signing up the user:', error);
            dispatch(loginUserError(error?.response?.data?.message));
        }
    };
};


export const userLoginFunction = (body: any) => {
    return async (dispatch: any) => {
        dispatch(usersLoggingIn());
        try {
            const response = await axios.post('http://localhost:3002/customer/login', body);
            if (response.status === 200) {
                console.log(response.data?.user);
                dispatch(loginUser(response.data?.user));
            } else {
                dispatch(loginUser({}));
            }
        } catch (error) {
            console.error('Error Logging into the user:', error);
            dispatch(loginUser({}));
        }
    };
};

export const googleSignIn = (token: string) => {
    return async (dispatch: any) => {
        dispatch(usersLoggingIn());
        try {
            const config = {
                headers: { authorization: `Bearer ${token}` }
            };
            const response = await axios.post('http://localhost:8080/user/googleLogin', {}, config);
            if (response.status === 200 && response.data && response.data.data) {
                dispatch(loginUser(response.data.data));
            } else {
                dispatch(loginUser({}));
            }
        } catch (error) {
            console.error('Error loading User:', error);
            dispatch(loginUser({}));
        }
    };
};

export const userSaveRoutes = (body: any) => {
    return async (dispatch: any) => {
        dispatch(usersLoggingIn());
        try {
            const response = await axios.put('http://localhost:8080/user/saveRoute', body);
            if (response.status === 200) {
                console.log(response);
                dispatch(saveUserRoute(response.data?.result));
            } else {
                dispatch(saveUserRoute({}));
            }
        } catch (error) {
            console.error('Error Updating User Data:', error);
            dispatch(saveUserRoute({}));
        }
    };
};


export const saveFavorites = (body: any) => {
    return async (dispatch: any) => {
        dispatch(usersLoggingIn()); // Pass an empty object as the argument
        try {
            const response = await axios.post('http://localhost:3002/customer/favorites', body);
            if (response.status === 200) {
                console.log(response.data?.user);
                dispatch(makeFavorites(response.data?.user));
            } else {
                dispatch(makeFavorites({}));
            }
        } catch (error) {
            console.error('Error making favorites:', error);
        }
    }
};


export const saveTickets = (body: any) => {
    return async (dispatch: any) => {
        dispatch(usersLoggingIn()); // Pass an empty object as the argument
        try {
            const response = await axios.post('http://localhost:3002/customer/tickets', body);
            if (response.status === 200) {
                console.log(response.data?.user);
                dispatch(savesTickets(response.data?.user));
            } else {
                dispatch(savesTickets({}));
            }
        } catch (error) {
            console.error('Error making tickets:', error);
        }
    }
}

export const userSubscribe = (body: any) => {
    return async (dispatch: any) => {
        dispatch(usersLoggingIn()); // Pass an empty object as the argument
        try {
            const response = await axios.post('http://localhost:3002/customer/subscription', body);
            if (response.status === 200) {
                console.log(response.data?.user);
                dispatch(savesTickets(response.data?.user));
            } else {
                dispatch(savesTickets({}));
            }
        } catch (error) {
            console.error('Error making tickets:', error);
        }
    }
}


export const tokenLogin = (body: any) => {
    return async (dispatch: any) => {
        dispatch(usersLoggingIn());
        console.log(body);
        try {
            const response = await axios.post('http://localhost:3002/customer/userSessionLogin', body);
            if (response.status === 200) {
                console.log(response.data?.user);
                dispatch(loginUser(response.data?.user));
            } else {
                dispatch(loginUser({}));
            }
        } catch (error) {
            console.error('Error Logging into the user:', error);
            dispatch(loginUser({}));
        }
    };
};