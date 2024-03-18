import { Box, Button, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryIcon from '@mui/icons-material/History';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { Link } from "react-router-dom";
function Siderbar() {
    return (
        <Box className="sidebar " >
            <List component="nav" className="w-2/3" >
                <ListItem button>
                    <ListItemIcon>
                        <ArrowBackIcon sx={{
                            color: 'white'
                        }} />
                    </ListItemIcon>
                    <ListItemText primary={<Link to="/Event" style={{ textDecoration: 'none', color: 'inherit' }}>Back to Home</Link>} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AccountCircleIcon sx={{
                            color: 'white'
                        }} />
                    </ListItemIcon>
                    <ListItemText primary={<Link to="/Editprofile" style={{ textDecoration: 'none', color: 'inherit' }}>Profile</Link>} />
                </ListItem>
                <ListItem button >
                    <ListItemIcon>
                        <HistoryIcon sx={{
                            color: 'white'
                        }} />
                    </ListItemIcon>
                    <ListItemText primary={<Link to="/OrderHistory" style={{ textDecoration: 'none', color: 'inherit' }}>Order History</Link>} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ChangeCircleIcon sx={{
                            color: 'white'
                        }} />
                    </ListItemIcon>
                    <ListItemText primary={<Link to="/Changepassword" style={{ textDecoration: 'none', color: 'inherit' }}>Change Password</Link>} />
                </ListItem>
            </List>
            <Divider />
        </Box>

    );
}

export default Siderbar;






