// import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css"

// function Navbar() {
//     let userId = 5;
//     return(
//         <div>
//             <ul>
//                 <li><Link to={"/"}>Home</Link></li>
//                 <li><Link to={{pathname :"/users/"+userId}}>Profile</Link></li>
//             </ul>
//         </div>
//     )
// }

// export default Navbar;

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    let userId = 5;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
          <Link to={"/"} className="link">Home</Link> 
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
          <Link to={{pathname :"/users/"+userId}} className="link">Profile</Link>
          </Typography>
          
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
