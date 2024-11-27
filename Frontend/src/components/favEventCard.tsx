import React, { useState, useEffect } from 'react';
import { Events } from '../Static/types';
import { LOOKUP } from '../Static/lookup';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { launchIcon, subscribeButton } from "../Static/styles";
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { saveFavorites } from '../Services/userService';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { removeFavorites } from '../Services/favoritesService';

const stripePromise = loadStripe('pk_test_51PvgSyP651cGMFPe8tF92ydwqZd3F5uqZiScWYOhDx7ARoknDHBbIhQj3bF5fRrjBOT5SzvyOzST1tem49IrZ0s4009Q6BQkvJ');

const FavEventCard: React.FC<{ otherNews: Events }> = ({ otherNews },{page}) => {
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.user as any);
    const dispatch: any = useDispatch();
    const pre_email = user?.userData?.email;
    const handleCheckout = async () => {
        const stripe = await stripePromise;
        sessionStorage.setItem('lastPageUrl', window.location.href);
        console.log(pre_email);

        if (!stripe) {
            console.error('Stripe failed to initialize');
            return;
        }

        // Call your backend to create the Stripe checkout session
        const response = await fetch('http://localhost:3002/payments/create_checkout_session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 10000, // Example amount in cents (5000 = $50.00)
                email: pre_email,
                event: otherNews,
                orderId: otherNews?.id,
                token: user?.userData?.login_token 
            }),
        });

        const session = await response.json();

        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (error) {
            console.error('Error during redirect:', error);
        }
    }

    const handleFavorites = async () => {
        const requestBody = {
            email: user?.userData?.email,
            remove_event_id: otherNews.id,
            order_id: otherNews?.id
        }
        try {
            console.log(requestBody);
            dispatch(removeFavorites(requestBody));
        } catch (error: any) {
            console.error(error.response ? error.response.data : error.message);
        }
    };


    return (
        <div className='otherNews-card'>
            <div>
                <img src={otherNews?.image} className='news-Image ticket_image' />
            </div>
            <div className='otherNews-title'>
                {`'${otherNews?.name}'`}
                <a onClick={handleFavorites} className='text-bottom favorites' target='_blank'><RemoveCircleOutlineIcon /></a>
            </div>
            <div className='otherNews-desc'>
                {otherNews?.segment}
            </div>
            <div className='otherNews-desc'>
                {otherNews?.genre}
            </div>
            <div className='checkout_tabs'>
                <a href={otherNews?.url} className='text-bottom' target='_blank'>{t(LOOKUP?.NEWS_COMPONENT?.READ_ARTICLE)}<ArrowOutwardRoundedIcon sx={launchIcon} /></a>
                <a onClick={handleCheckout} className='text-bottom' target='_blank'>{t(LOOKUP?.NEWS_COMPONENT?.PRICE)}</a>
            </div>
        </div>
    );
};

export default FavEventCard;
