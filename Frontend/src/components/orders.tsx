import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../Redux/store';
import moment from "moment";
import { Attractions, Events } from "../Static/types";
import NewsCard from "./newsCard";
import { LOOKUP } from "../Static/lookup";
import { useState, useEffect, useTransition } from "react";
import { loadNews } from "../Services/newsService";
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { launchIcon, pagination, newsImageBox, newsContentBox, newsImageSkeleton, favIcon } from "../Static/styles";
import Skeleton from '@mui/material/Skeleton';
import { useTranslation } from "react-i18next";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { loadFavorites } from "../Services/favoritesService";
import FavEventCard from "./favEventCard";
import FavAttractionCard from "./favAttractionCard";
import { loadTickets } from "../Services/ticketsService";
import OrderEventCard from "./orderEventCard";


const Orders = () => {

    const dispatch: any = useDispatch();
    const { t } = useTranslation();

    const user = useSelector((state: RootState) => state.user as any);
    const favorites = useSelector((state: RootState) => state.tickets as any);
    const [currentPage, setCurrentPage] = useState(0);
    const newsPerPage = 4;


    const indexOfLastNews = (currentPage + 1) * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentEvents = favorites?.ticketsData?.events?.slice(indexOfFirstNews, indexOfLastNews);
    const currentAttractions = favorites?.ticketsData?.attractions?.slice(indexOfFirstNews, indexOfLastNews);

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
        const requestBody = {
            email: user?.userData?.email
        }
        try {
            console.log(requestBody);
            dispatch(loadTickets(requestBody));
            console.log(favorites?.ticketsData?.events);
        } catch (error: any) {
            console.error(error.response ? error.response.data : error.message);
        }
    }, [])

    if (favorites?.events?.length === 0 && favorites?.attractions?.length === 0) {
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

    return (
        <>
    {/* Display Events if currentEvents exists */}
    {currentEvents?.length ? (
        <div className="order-div-events">
            <h1>Orders</h1>
            <div className="otherNews-container-fav">
                {currentEvents.slice(0).map((otherNews: Events, index: number) => (
                    <OrderEventCard key={index} otherNews={otherNews} />
                ))}
            </div>
            <Box className="Pagination-Box">
                <Pagination
                    count={Math.ceil(favorites?.ticketsData?.events?.length / newsPerPage)}
                    page={currentPage + 1}
                    onChange={handleChangePage}
                    color="primary"
                    size='large'
                    sx={pagination}
                />
            </Box>
        </div>
    ) : (
        // Skeleton for events if no currentEvents exist
        <div className="favorites-div">
            <h1>Orders</h1>
            <h5 className="NoFav">There are No Orders</h5>
        </div>
    )}
</>
    )
}

export default Orders;