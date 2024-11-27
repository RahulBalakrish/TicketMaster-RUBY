import React, { useState, useEffect } from 'react';
import HomeNews from './homeEvents';
import RegisterForm from './registrationForm';
import VideoBackground from './videoBackground';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Embed from 'react-embed';
import { LOOKUP } from '../Static/lookup';
import { useTranslation } from 'react-i18next';
import HomeAttractions from './homeAttractions';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { launchIcon, bookNow } from "../Static/styles";
import Footer from './footer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { useNavigate } from 'react-router-dom';
import { createTickets } from '../Services/ticketsService';
import { tokenLogin } from '../Services/userService';


const PaymentSuccess = () => {

    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.user as any);
    const email = user?.userData?.email;
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.userData?.id) {
            try {
                const loginBody = {
                    token: new URLSearchParams(window.location.search).get('token')
                }
                dispatch(tokenLogin(loginBody));
            } catch (error: any) {
                console.error(error.response ? error.response.data : error.message);
            }
        }
    });

    const handleNavigate = async () => {
        navigate(LOOKUP?.PATHS?.HOME);
    }
    return (
        <div className='payment_tabs'>
            <h1>Payment Successful</h1>
            <p>You were redirected here because your payment is Successful. Please Navigate to Home</p>
            <a onClick={handleNavigate} className='text-bottom' target='_blank'>{t(LOOKUP?.NEWS_COMPONENT?.HOME)}<ArrowOutwardRoundedIcon sx={launchIcon} /></a>
        </div>
    );
};

export default PaymentSuccess;
