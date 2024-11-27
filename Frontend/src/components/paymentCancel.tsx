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
import { tokenLogin } from '../Services/userService';
import { RootState } from '../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const PaymentCancel = () => {

    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.user as any);
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const log_token = new URLSearchParams(window.location.search).get('token');
        const orderId = new URLSearchParams(window.location.search).get('orderId');
        if(log_token) {
            const requestBody = {
                token: log_token,
                cancel: true,
                remove_event_id: orderId
            };
            console.log(requestBody);
            try {
                dispatch(tokenLogin(requestBody));
            } catch (error: any) {
                console.error(error.response ? error.response.data : error.message);
            }
        }
    }, []);
    const handleNavigate = async () => {
        navigate(LOOKUP?.PATHS?.HOME);
    }


    return (
        <div className='payment_tabs'>
            <h1>Payment Canceled</h1>
            <p>You were redirected here because you canceled the payment.</p>
            <a onClick={handleNavigate} className='text-bottom' target='_blank'>{t(LOOKUP?.NEWS_COMPONENT?.HOME)}<ArrowOutwardRoundedIcon sx={launchIcon} /></a>
        </div>
    );
};

export default PaymentCancel;


