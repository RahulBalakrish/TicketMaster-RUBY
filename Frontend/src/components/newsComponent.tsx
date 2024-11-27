import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../Redux/store';
import moment from "moment";
import { Events } from "../Static/types";
import NewsCard from "./newsCard";
import { LOOKUP } from "../Static/lookup";
import { useState, useEffect, useTransition } from "react";
import { loadNews } from "../Services/newsService";
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { launchIcon, pagination, newsImageBox, newsContentBox, newsImageSkeleton, favIcon, subscribeButton } from "../Static/styles";
import Skeleton from '@mui/material/Skeleton';
import { useTranslation } from "react-i18next";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { loadStripe } from "@stripe/stripe-js";
import { saveFavorites } from "../Services/userService";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { removeFavorites } from "../Services/favoritesService";
import Modal from 'react-modal';
import { Button } from "@mui/material";


const NewsComponent = () => {

    const dispatch: any = useDispatch();
    const { t } = useTranslation();
    const stripePromise = loadStripe('pk_test_51PvgSyP651cGMFPe8tF92ydwqZd3F5uqZiScWYOhDx7ARoknDHBbIhQj3bF5fRrjBOT5SzvyOzST1tem49IrZ0s4009Q6BQkvJ');
    const news = useSelector((state: RootState) => state.news as any);
    const user = useSelector((state: RootState) => state.user as any);
    const pre_email = user?.userData?.email;
    const [currentPage, setCurrentPage] = useState(0);
    const newsPerPage = 9;
    const [isFavorite, setIsFavorite] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const indexOfLastNews = (currentPage + 1) * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = news?.newsData?.slice(indexOfFirstNews, indexOfLastNews);

    const handleChangePage = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        setCurrentPage(pageNumber - 1);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => {
            if (news?.newsData?.length === 0) {
                dispatch(loadNews());
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [])

    if (news?.newsData?.length === 0) {
        console.log("Displaying Skeletons, news data is empty.");
        return (
            <Box sx={newsImageBox}>
                <Skeleton variant="rectangular" height={380} width="55%" sx={newsImageSkeleton} />
                <Box sx={newsContentBox}>
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    <Skeleton width="100%" height={110} />
                    <Skeleton width="100%" height={110} />
                    <Skeleton width="100%" height={70} />
                    <Skeleton width="30%" height={30} />
                </Box>
            </Box>
        );
    }

    const handleFavorites = () => {
        const requestBody = {
            email: pre_email,
            events: currentNews[0],
            order_id: currentNews[0]?.id
        }
        try {
            console.log(requestBody);
            dispatch(saveFavorites(requestBody));
        } catch (error: any) {
            console.error(error.response ? error.response.data : error.message);
        }
        setShowPopup(true);
    }




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
                event: currentNews[0],
                orderId: currentNews[0]?.id,
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
        <div className="attractions">
            {currentNews ? (
                <>
                    <section className="featured-article">
                        <article>
                            <img src={currentNews[0]?.image} alt={currentNews[0]?.title} />
                            <div className="article-info">
                                <div className='article-header'>
                                    <span>{currentNews[0]?.source?.name}</span>
                                    <a onClick={handleFavorites} className="favorites" target='_blank'>Add to Favorites<FavoriteBorderIcon sx={favIcon} /></a>
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
                                            backgroundColor: '1B3150', // Optional: dark overlay
                                        }
                                    }}
                                        isOpen={showPopup} onRequestClose={() => setShowPopup(false)}>
                                        <div>
                                            <h2>Favorites Saved</h2>
                                            <p>Please check Favorites for more..</p>
                                            <Button onClick={() => setShowPopup(false)} variant="outlined" sx={subscribeButton}>Close</Button>
                                        </div>
                                    </Modal>
                                </div>
                                <h2>{currentNews[0]?.name}</h2>
                                <p className="description">{currentNews[0]?.segment}</p>
                                <p className="newsContent">{currentNews[0]?.genre}</p>
                                <a className='text-bottom-fav read-article' href={currentNews[0]?.url}>{t(LOOKUP?.NEWS_COMPONENT?.READ_ARTICLE)}<ArrowOutwardRoundedIcon sx={launchIcon} /></a>
                                <a onClick={handleCheckout} className='text-bottom-fav book' target='_blank'>{t(LOOKUP?.NEWS_COMPONENT?.PRICE)}<ArrowOutwardRoundedIcon sx={launchIcon} /></a>
                            </div>
                        </article>
                    </section>
                    <div className="otherNews-container">
                        {currentNews?.slice(1).map((otherNews: Events, index: number) => (
                            <NewsCard key={index} otherNews={otherNews} />
                        ))}

                    </div>
                    <Box className="Pagination-Box">
                        <Pagination
                            count={Math.ceil(news?.newsData?.length / newsPerPage)}
                            page={currentPage + 1}
                            onChange={handleChangePage}
                            color="primary"
                            size='large'
                            sx={pagination}
                        />
                    </Box>
                </>
            ) : (
                <Box sx={newsImageBox}>
                    <Skeleton variant="rectangular" height={380} width="55%" sx={newsImageSkeleton} />
                    <Box sx={newsContentBox}>
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                        <Skeleton width="100%" height={110} />
                        <Skeleton width="100%" height={110} />
                        <Skeleton width="100%" height={70} />
                        <Skeleton width="30%" height={30} />
                    </Box>
                </Box>
            )}
        </div>
    )
}

export default NewsComponent;