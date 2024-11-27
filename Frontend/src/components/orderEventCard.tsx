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

const OrderEventCard: React.FC<{ otherNews: Events }> = ({ otherNews }, { page }) => {
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.user as any);
    const dispatch: any = useDispatch();
    const email = user?.userData?.email;


    return (
        <div className='otherNews-card'>
            <div>
                <img src={otherNews?.image} className='news-Image ticket_image' />
            </div>
            <div className='otherNews-title'>
                {`'${otherNews?.name}'`}
            </div>
            <div className='otherNews-desc'>
                {otherNews?.segment}
            </div>
            <div className='checkout_tabs'>
                <a href={otherNews?.url} className='text-bottom' target='_blank'>{t(LOOKUP?.NEWS_COMPONENT?.READ_ARTICLE)}<ArrowOutwardRoundedIcon sx={launchIcon} /></a>
            </div>
        </div>
    );
};

export default OrderEventCard;
