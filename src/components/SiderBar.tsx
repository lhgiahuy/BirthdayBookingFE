import { Box, Button, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryIcon from '@mui/icons-material/History';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
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
                    <ListItemText primary="Back to Home" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AccountCircleIcon sx={{
                            color: 'white'
                        }} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button href="/orderhistory">
                    <ListItemIcon>
                        <HistoryIcon sx={{
                            color: 'white'
                        }} />
                    </ListItemIcon>
                    <ListItemText primary="Order History" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ChangeCircleIcon sx={{
                            color: 'white'
                        }} />
                    </ListItemIcon>
                    <ListItemText primary="Change Password" />
                </ListItem>
            </List>
            <Divider />
        </Box>

    );
}

export default Siderbar;






