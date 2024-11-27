import { useEffect, useState } from "react";
import { LOOKUP } from "../Static/lookup";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useSelector, useDispatch } from 'react-redux';
import { languageDropDown, languageMenuItem, popModal, subscribeButton } from "../Static/styles";
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { menuIcon } from "../Static/styles";
import { RootState } from '../Redux/store';
import { signOutUser } from "../Redux/features/userSlice";
import Modal from 'react-modal';
import { Button } from "@mui/material";


export default function Nav() {
    const [inHome, setInHome] = useState(true)
    const [lang, setLang] = useState<string | null>(LOOKUP?.LANGUAGES?.EN);
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const [openMenu, setOpenMenu] = useState(false);
    const userData = useSelector((state: RootState) => state.user as any);
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);




    useEffect(() => {
        if (location?.pathname === LOOKUP?.PATHS?.HOME || location?.pathname === LOOKUP?.PATHS?.DEFAULT_HOME) {
            setInHome(true)
        }
        else {
            setInHome(false)
        }
    }, [location])

    // console.log(userData);

    const signout = () => {
        console.log("reached")
        dispatch(signOutUser());
        navigate(LOOKUP?.PATHS?.HOME);
    }

    const handleChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        setLang(newValue)
    };

    useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang])

    const handleLoginClick = (path: any) => {   
        navigate(path);
    }



    const handleClick = (path: any) => {
        setOpenMenu(false);
        if (userData?.userData?.id) {
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
        <div className='nav home-background-nav'>
            <div className="logo" onClick={() => { handleClick(LOOKUP?.PATHS?.HOME) }}>
                {t(LOOKUP?.WEB_APP_NAME)}
            </div>
            <div className="navigation">
                <ul>
                    <li onClick={() => handleClick(LOOKUP?.PATHS?.HOME)}>{t(LOOKUP?.NAVBAR?.HOME)}</li>
                    <li onClick={() => handleClick(LOOKUP?.PATHS?.ATTRACTIONS)}>{t(LOOKUP?.NAVBAR?.CHECK_CARGO)}</li>
                    <li onClick={() => handleClick(LOOKUP?.PATHS?.NEWS)}>{t(LOOKUP?.NAVBAR?.NEWS)}</li>
                    <li onClick={() => handleClick(LOOKUP?.PATHS?.FAVORITES)}>{t(LOOKUP?.NAVBAR?.FAVORITES)}</li>
                    <li onClick={() => handleClick(LOOKUP?.PATHS?.ORDERS)}>{t(LOOKUP?.NAVBAR?.ORDERS)}</li>
                    {!userData?.userData.id ? (
                        <li onClick={() => handleLoginClick(LOOKUP?.PATHS?.LOGIN)}>{t(LOOKUP?.NAVBAR?.LOGIN)}</li>
                    ) : (
                        <li onClick={() => signout()}>{t(LOOKUP?.NAVBAR?.SIGNOUT)}</li>
                    )}
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
                </ul>
            </div>
            <div className="drawer-menu">
                <MenuIcon onClick={() => { setOpenMenu(true) }} sx={menuIcon}></MenuIcon>
                <Drawer
                    open={openMenu}
                    onClose={() => { setOpenMenu(false) }}
                    anchor="right"
                >
                    <div className="drawer-menus">
                        <ul>
                            <li onClick={() => handleClick(LOOKUP?.PATHS?.HOME)}>{t(LOOKUP?.NAVBAR?.HOME)}</li>
                            <li onClick={() => handleClick(LOOKUP?.PATHS?.GETPATH)}>{t(LOOKUP?.NAVBAR?.CHECK_CARGO)}</li>
                            <li onClick={() => handleClick(LOOKUP?.PATHS?.NEWS)}>{t(LOOKUP?.NAVBAR?.NEWS)}</li>
                            <li>{t(LOOKUP?.NAVBAR?.About)}</li>
                            <li onClick={() => handleClick(LOOKUP?.PATHS?.LOGIN)}>{t(LOOKUP?.NAVBAR?.LOGIN)}</li>
                            <div className="languageDropDown">
                                <Select defaultValue={LOOKUP?.LANGUAGES?.EN} onChange={handleChange} sx={languageDropDown}>
                                    <Option value={LOOKUP?.LANGUAGES?.EN} sx={languageMenuItem}>{LOOKUP?.LANGUAGES?.EN.toUpperCase()}</Option>
                                    <Option value={LOOKUP?.LANGUAGES?.FR} sx={languageMenuItem}>{LOOKUP?.LANGUAGES?.FR.toUpperCase()}</Option>
                                    <Option value={LOOKUP?.LANGUAGES?.KN} sx={languageMenuItem}>{LOOKUP?.LANGUAGES?.KN.toUpperCase()}</Option>
                                </Select>
                            </div>
                        </ul>
                    </div>
                </Drawer>
                <div></div>
            </div>
        </div>

    )
}