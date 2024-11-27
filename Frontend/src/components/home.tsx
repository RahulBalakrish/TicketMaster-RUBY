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


const Home = () => {

  const { t } = useTranslation();
  const stripePromise = loadStripe('pk_test_51PvgSyP651cGMFPe8tF92ydwqZd3F5uqZiScWYOhDx7ARoknDHBbIhQj3bF5fRrjBOT5SzvyOzST1tem49IrZ0s4009Q6BQkvJ');
  sessionStorage.setItem('lastPageUrl', window.location.href);

  return (
    <div>
      <div className='home-banner'>
        <VideoBackground />
      </div>
      <div className="animated-title">
        <div className="text-top">
          <div>
            <span>{t(LOOKUP?.HOME_NEWS?.HEADER_1)}</span>
          </div>
        </div>
        <div className='text-bookNow'>
          <a href={LOOKUP?.PATHS?.TICKETMASTER} target='_blank'>{t(LOOKUP?.NEWS_COMPONENT?.READ_ARTICLE)}<ArrowOutwardRoundedIcon sx={launchIcon} /></a>
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <RegisterForm />
      </Elements>
      <HomeNews />
      <HomeAttractions />
      <Footer />
    </div>
  );
};

export default Home;
