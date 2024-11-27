import React, { useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { done } from '../Static/styles';
import Button from '@mui/material/Button';
import { subscribeButton } from '../Static/styles';
import { LOOKUP } from '../Static/lookup';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { userSubscribe } from '../Services/userService';

const Subscriptions = () => {
    const stripePromise = loadStripe('pk_test_51PvgSyP651cGMFPe8tF92ydwqZd3F5uqZiScWYOhDx7ARoknDHBbIhQj3bF5fRrjBOT5SzvyOzST1tem49IrZ0s4009Q6BQkvJ');
    const user = useSelector((state: RootState) => state.user as any);
    const dispatch: any = useDispatch();
    const pre_email = user?.userData?.email;
    const handleBasicSubscription = async (subamount: any) => {
            const stripe = await stripePromise;
            sessionStorage.setItem('lastPageUrl', window.location.href);
            console.log(subamount);
            console.log(pre_email);
    
            if (!stripe) {
                console.error('Stripe failed to initialize');
                return;
            }
    
            // Call your backend to create the Stripe checkout session
            const response = await fetch('http://localhost:3002/payments/create_subscription_session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: subamount, // Example amount in cents (5000 = $50.00)
                    email: pre_email,
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


    return (
        <div className='sub_head'>
            <div className='sub_details'>
                <div className='sub_title'>Subscription Plans for TicketNinja</div>
                <div className='sub_title_desc'>Choose a Plan</div>
                <div className='sub_flex'>
                    <div >
                        <Box className='sub_plan_flex'>
                            <div className='sub_plan_title'>Basic</div>
                            <div className='sub_plan_price'>$20/Month</div>
                            <div className='sub_plan_desc'>
                                <div>
                                    <div className='items_done'>
                                        <DoneIcon sx={done} />
                                        <div>View All Events</div>
                                    </div>
                                    <div className='items_done'>
                                        <DoneIcon sx={done} />
                                        <div>View All Attractions</div>
                                    </div>
                                </div>
                            </div>
                                <Button 
                                onClick={() => handleBasicSubscription(LOOKUP?.SUBSCRIPRTIONS?.BASIC?.PRICE)}
                                 variant="outlined" sx={subscribeButton}>Subscribe</Button>
                        </Box>
                    </div>
                    <div >
                        <Box className='sub_plan_flex'>
                            <div className='sub_plan_title'>Premium</div>
                            <div className='sub_plan_price'>$40/Month</div>
                            <div className='sub_plan_desc'>
                                <div>
                                    <div className='items_done'>
                                        <DoneIcon sx={done} />
                                        <div>View All Events</div>
                                    </div>
                                    <div className='items_done'>
                                        <DoneIcon sx={done} />
                                        <div>View All Attractions</div>
                                    </div>
                                    <div className='items_done'>
                                        <DoneIcon sx={done} />
                                        <div>Curated Recommendations</div>
                                    </div>
                                    <div className='items_done'>
                                        <DoneIcon sx={done} />
                                        <div>Create New Event or Attractions</div>
                                    </div>
                                </div>
                            </div>
                            <Button 
                                onClick={() => handleBasicSubscription(LOOKUP?.SUBSCRIPRTIONS?.PREMIUM?.PRICE)}
                                 variant="outlined" sx={subscribeButton}>Subscribe</Button>
                        </Box>
                    </div>

                </div>
            </div>
            <div>
                <div className='sub_video'>
                    <video autoPlay loop muted className='bg-sub' src={LOOKUP?.VIDEO_BACKGROUNDS?.SUBSCRIPTIONS}>
                    </video>
                </div>
            </div>
        </div>
    );
}

export default Subscriptions;
