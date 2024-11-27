import React, { useState, useEffect } from 'react';
import AttractionsCard from './attractionsCard';
import { useSelector } from "react-redux";
import { RootState } from '../Redux/store';
import { Attractions, Events } from '../Static/types';
import { LOOKUP } from "../Static/lookup";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { Button } from "@mui/material";
import { subscribeButton } from '../Static/styles';


const HomeAttractions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const news = useSelector((state: RootState) => state.attractions as any);
  const user = useSelector((state: RootState) => state.user as any);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (path: any) => {
    if (user?.userData?.isSuscribed) {
        navigate(path)
    } else {
        if (path === LOOKUP?.PATHS?.HOME) {
            navigate(LOOKUP?.PATHS?.HOME)
        }
        else {
            setShowPopup(true);
            navigate(LOOKUP?.PATHS?.LOGIN)
        }
    }
};

  return (
    <div className='home-news-container'>
      <div className='homeNews-header'>
        <h1>{t(LOOKUP?.HOME_NEWS?.LATEST_ATTRACTIONS)}</h1>
        <h3 onClick={() => (handleClick(LOOKUP?.PATHS?.ATTRACTIONS))}>{t(LOOKUP?.HOME_NEWS?.VIEW_ALL)}</h3>
        <Modal style={{
                        content: {
                            width: '300px',  // Set the width of the modal
                            height: '200px', // Set the height of the modal
                            margin: 'auto',   // Center the modal
                            background: 'linear-gradient(75deg, #cfcfcf, #e0e0e0, #e3e0e0, #d7d7d7)', 
                            borderRadius: '5px', 
                            border: '1px solid #000',
                            padding: '20px',
                        },
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Optional: dark overlay
                        }
                    }}
                        isOpen={showPopup} onRequestClose={() => setShowPopup(false)}>
                        <div>
                            <h2>User Not Logged In</h2>
                            <p>Please Login to Continue</p>
                            <Button onClick={() => setShowPopup(false)} variant="outlined" sx={subscribeButton}>Close</Button>
                        </div>
                    </Modal>
      </div>
      <div className='home-news'>
        {news?.attractionsData?.slice(0, 4).map((latest: Attractions, index: number) => (
          <AttractionsCard otherNews={latest} />
        ))}
      </div>
    </div>
  );
};

export default HomeAttractions;
