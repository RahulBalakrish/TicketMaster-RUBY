import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import "leaflet/dist/leaflet.css";
import GoogleSignIn from './components/GoogleSignIn';
import NewsComponent from './components/newsComponent';
import Nav from './components/nav';
import { loadPortData } from "../src/Services/portService";
import { useDispatch } from 'react-redux';
import Home from './components/home';
import Login from './components/login';
import AttractionsComponent from './components/attractionsComponent';
import UserLogin from './components/userLogin';
import { LOOKUP } from './Static/lookup';
import { loadNews } from './Services/newsService';
import { loadattractions } from './Services/attractionsService';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Subscriptions from './components/subscriptions';
import PaymentCancel from './components/paymentCancel';
import Favorites from './components/favorites';
import Orders from './components/orders';
import PaymentSuccess from './components/paymentSuccess';


function App() {
  const dispatch: any = useDispatch();
  
  useEffect(() => {
    dispatch(loadPortData());
    dispatch(loadNews());
    dispatch(loadattractions());
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
          <Route path={LOOKUP?.PATHS?.NEWS} element={<NewsComponent />} />
          <Route path={LOOKUP?.PATHS?.ATTRACTIONS} element={<AttractionsComponent />} />
          <Route path={LOOKUP?.PATHS?.LOGIN} element={<Login />} />
          <Route path={LOOKUP?.PATHS?.USERLOGIN} element={<UserLogin/>} />
          <Route path={LOOKUP?.PATHS?.SUBSCRIPIONS} element={<Subscriptions/>} />
          <Route path={LOOKUP?.PATHS?.CANCEL} element={<PaymentCancel/>} />
          <Route path={LOOKUP?.PATHS?.SUCCESS} element={<PaymentSuccess/>} />
          <Route path={LOOKUP?.PATHS?.ORDERS} element={<Orders/>} />
          <Route path={LOOKUP?.PATHS?.FAVORITES} element={<Favorites />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
