import Home from "../components/home";

export  const LOOKUP = {
    WEB_APP_NAME :"TicketNinja",
    NAVBAR:{
        HOME:"Home",
        NEWS:"Events",
        FAVORITES: "Favorites",
        ORDERS: "Orders",
        TRACK_VESSEL :"Track Vessel",
        CHECK_CARGO:"Attractions",
        About:"About",
        LOGIN:"Login",
        SIGNOUT:"Signout"
    },
    PATHS:{
        GETPATH:"/path",
        TRACK_VESSEL:"trackVessel",
        NEWS:"/events",
        ATTRACTIONS: "/attractions",
        HOME:"/home",
        LOGIN:"/login",
        USERLOGIN:"/userLogin",
        SUBSCRIPIONS:"/subscriptions",
        CANCEL: "/cancel",
        SUCCESS: "/success",
        ORDERS: "/orders",
        SUBSCRIPTIONS:"/subscriptions",
        DEFAULT_HOME:"/",
        FAVORITES:"/favorites",
        TICKETMASTER: "https://www.ticketmaster.com/"
    },
    SUBSCRIPRTIONS:{
        BASIC: {
            PRICE: 2000
        },
        PREMIUM: {
            PRICE: 4000
        }
    },  
    NEWS_COMPONENT:{
        DATE_FORMAT:"DD-MM-YYYY ddd",
        DATE_FORMAT_2:"MMM , DD ddd",
        BBC_ID:"bbc-news",
        ABC_ID:"abc-news",
        VERGE_ID:"the-verge",
        READ_ARTICLE:"Read Article",
        PRICE:"Buy Tickets",
        HOME:"Home",
        FAVORITE: "Favorite",
    },
    HOME_NEWS:{
        LATEST_NEWS:"Latest Events",
        LATEST_ATTRACTIONS:"Latest Attractions",
        VIEW_ALL:"View All",
        HEADER_1:"Get in the Game, Secure Your Spot!"
    },
    LOGIN_PAGE:{
        CREATE_ACCOUNT:"Create New Account",
        FIRST_NAME_PH: "Username",
        LAST_NAME_PH: "Last name",
        EMAIL_PH:"Email",
        PASSWORD_PH:"Password",
        LOGIN:"Log in",
        ALREADY_A_MEMBER:"Already A Member ?"
    },
    VIDEO_BACKGROUNDS:{
        LOGIN_BACKGROUND:"https://res.cloudinary.com/dbj2t1fde/video/upload/v1726159397/TicketMaster/jljwtr91f3d9nof9v758.mp4",
        HOME_BACKGROUND:"https://res.cloudinary.com/dzhlmx3ec/video/upload/v1713058689/coswklrvi83fjb6sru3q.mp4",
        HOME:"https://res.cloudinary.com/dbj2t1fde/video/upload/v1725890667/TicketMaster/cl0jcttm4tmtsk7pqall.mp4",
        ABOUT_BACKGROUND: "https://asset.cloudinary.com/dtnykietv/1b2a24c28b2d28a661518ff35e63e91c",
        SUBSCRIPTIONS: "https://res.cloudinary.com/dbj2t1fde/video/upload/v1726158817/TicketMaster/ovttgf13hopacdblva7c.mp4"
    },
    MAP_INPUTS:{
        ADD_FILTERS:"Add Filters",
        SEARCH:"Search",
        BLOCK_AREAS:"Block Areas",
        BLOCK_ICE_AREAS:"Block Ice Areas",
        PANAMA_CANAL:"Panama Canal",
        SUEZ_CANAL:"Suez Canal",
        SAVE: "SAVE",
        IN:"in",
        ZOOM_INTO:"Zoom into",
        ID_INFO:"Use this id, to add to Block Areas",
        DURATION:"Duration",
        DISTANCE:"Distance",
        MID_POINTS:"Zones Passed",
        VIA:"via",
        HOURS:"hours",
        KM:"km",
        ADDITIONAL_PARAMETERS_FOR_CO2:"Additional Parameters for CO2 calculations",
        CONTAINERS_SIZE_TYPE_CODE:"CSTC",
        NO_OF_CONTAINERS:"Number of Containers"
    },
 
    NGO:{
        TITLE:"Working for the Oceans",
        BUTTON:"LEARN MORE",
        OCEAN:"The Clean Up Project",
        OCEAN_CONTENT:"The Ocean Cleanup is cleaning up floating plastics caught swirling in the Great Pacific Garbage Patch, a plastic accumulation zone with over 100,000,000 kilograms of plastic.",
        CORAL: "Save coral reefs",
        CORAL_CONTENT:"Millions of people and species of wildlife depend on coral reefs. While climate change threatens their future, science shows that corals can adapt and survive if we keep them healthy.",
        AWARE:"PADI Awarness Foundation",
        AWARE_CONTENT:"The mission is to 'Drive local action for global ocean conservation' is carried out through citizen science, public policy, and community grants",
    },
    CARBON_EMISSIONS:{
        CO2_EMISSIONS_STATISTICS: "Carbon Emission Statistics",
        AVERAGE: "Average",
        MINIMUM: "Minimum",
        MAXIMUM: "Maximum",
        STANDARD_DEVIATION: "Standard Deviation",
        WELL_TO_WHEELS_EMISSIONS: "Well-to-Wheels (WTW) Emissions",
        STANDARD_DEVIATION_WTW_EMISSIONS: "Standard deviation of WTW emissions",
        TANK_TO_WHEELS_EMISSIONS: "TTW (Tank-to-Wheels) Emissions",
        AVERAGE_TTW_EMISSIONS: "Average TTW emissions",
        MINIMUM_TTW_EMISSIONS: "Minimum TTW emissions",
        MAXIMUM_TTW_EMISSIONS: "Maximum TTW emissions",
        WELL_TO_TANK_EMISSIONS: "WTT (Well-to-Tank) Emissions",
        AVERAGE_WTT_EMISSIONS: "Average WTT emissions",
        MINIMUM_WTT_EMISSIONS: "Minimum WTT emissions",
        MAXIMUM_WTT_EMISSIONS: "Maximum WTT emissions",
        GPT:"gpt",
        GRAMS_PER_TEU: "(grams per TEU)",
        KG_OF_CO2_PER_TON_KILOMETER: "kg of CO2 per ton.kilometer"
    },
    SPECIAL_CHARS:{
        COMMA:",",
        SPACE:" ",
    },
    LANGUAGES:{
        EN:'en',
        FR:'fr',
        KN:'kn',
        SELECT_LANGUAGE:"Select Language"
    }
}