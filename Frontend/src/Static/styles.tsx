import exp from "constants"


export const inputAutocomplete = {
    '& .MuiInputBase-root': {
    width:250,
    marginLeft:"0.8rem",
    marginRight:"0.8rem",
    padding:"4px",
    fontSize:"14px",
    marginTop:"12px"
    },

    '& .MuiInputLabel-root': {
        textAlign: "center",
        fontSize: "14px",
        bottom: "25px",
        left: "15px",
        marginTop:"12px"
    },
    '& .MuiAutocomplete-listbox': {
        fontSize: '12px', 
        marginTop:"12px"
    },
}

export const primaryBtn = {
    backgroundColor:"#68a7f7",
    color: "black",
    fontSize: 12,
    fontWeight: 400,
    textTransform:'none'
}

export const launchIcon = {
    width:18,
    marginLeft:"2px",
    color: "#162552"
}

export const favIcon = {
    width:18,
    marginLeft:"2px",
    color: "#162552"
}

export const pagination = {
    '& .MuiPaginationItem-root': {
        color: 'black', 
      },
}

export const infoIcon = {
    fontSize:'14px',
    marginLeft:'4px',

}

export const savedRouteBox = { 
    m: 2,
    borderBottom:"solid 0.1px #d5d5d5"
    // boxShadow: 'rgba(147, 211, 240, 0.5) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.5) 0px 18px 36px -18px inset',
 }

export const newsImageBox = { 
    padding: 3, 
    display: 'flex', 
    alignItems: 'center', 
    margin: '20px' 
}

export const newsContentBox = { 
    display: 'flex', 
    flexDirection: 'column', 
    width: '50%', 
    justifyContent: 'space-between' 
}

export const newsImageSkeleton = { 
    marginRight: 2 
}

export const languageDropDown = {
    marginTop:"0px",
    color:'#5097f4',
    border:'none',
    fontSize: '10px', 
    minHeight:'auto',
    '& .MuiSelect-select': {
      color:'#5097f4',
      border:'none'
    },
    '& .MuiMenuItem': {
        fontSize: '10px', 
    },  
    '& .MuiInput-underline::before': {
      borderBottom: 'none', 
    },
    '& .MuiInput-underline::after': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled)::before': {
      borderBottom: 'none',
    },
  };

export const languageMenuItem = {
    fontSize:'10px',
    color:'#5097f4'
}
export const menuIcon = {
    fontSize:'12px'
}

export const inputBox ={
    fontSize:"10px",
    '&. MuiInputLabel':{
        fontSize:'10px'
    }
}

export const savedIcon = {
    color:"#FEF16A",
    fontSize:"16px",
    marginLeft:"20px"
}


export const bookNow = {
    backgroundColor: "transparent",
    color: "white",
    padding: '10px 20px',
    border: "none",
    cursor: "pointer"
}

export const done = {
    fontSize: 'small'
}

export const subscribeButton = {
    marginTop: '20px',
    borderColor: 'black',
    color: 'black',
    '&:hover': {
            borderColor: 'black',
            backgroundColor: 'black', 
            color: 'white'        
          }
}

export const popModal = {
    content: {
        width: '400px',  // Set the width of the modal
        height: '300px', // Set the height of the modal
        margin: 'auto',   // Center the modal
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Optional: dark overlay
      }
}