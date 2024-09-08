import React, { useState } from "react";
import {
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    Typography,
    Button,
    Container,
    Paper,
    AppBar,
    IconButton
} from "@mui/material";
import {
    AccountCircle,
    PrivacyTip,
    Gavel,
    HelpOutline,
    Payments,
    ReportProblem,
    Notifications,
    RestaurantMenu,
    ExitToApp,
} from "@mui/icons-material";
import BottomNavBar from "./BottomNavBar";
import { ToastContainer } from "react-toastify";
import { styled } from '@mui/system';
import AdminSidebar from './AdminSidebar';
import { Link } from "react-router-dom";


const HeaderContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 4,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '14px 16px',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    zIndex: 1000,
});

const StayText = styled(Typography)({
    fontFamily: '"Sofia", sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'orange',
});

const BuddieText = styled(Typography)({
    fontFamily: '"Sofia", sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
});

const ProfileIcon = styled(IconButton)({
    borderRadius: '50%',
    backgroundColor: '#ddd',
    width: '40px',
    height: '40px',
});


const Settings = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);


    const handleProfileIconClick = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <AppBar position="static">
                <HeaderContainer>
                    <Box display="flex" alignItems="center">
                        <StayText variant="h4" component="h1">
                            Stay
                        </StayText>
                        <BuddieText variant="h4" component="h1">
                            Buddie
                        </BuddieText>
                    </Box>
                    <ProfileIcon onClick={handleProfileIconClick}>
                        {/* <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} /> */}
                        <AdminSidebar open={drawerOpen} onClose={handleDrawerClose} />
                    </ProfileIcon>
                </HeaderContainer>
            </AppBar>
            <Typography variant="h5" align="center" gutterBottom mt={10}>
                Settings
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} component={Link} to="/admin/profile">
                    <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                        <AccountCircle fontSize="large" />
                        <Typography variant="subtitle1">Profile</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} component={Link} to="/admin/hostel-fees">
                    <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                        <Payments fontSize="large" />
                        <Typography variant="subtitle1">Hostel Fees</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                        <ReportProblem fontSize="large" />
                        <Typography variant="subtitle1">Complaints</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} component={Link} to="/admin/food-menu">
                    <Paper elevation={3} sx={{ p: 2, textAlign: "center" }} >
                        <RestaurantMenu fontSize="large" />

                        <Typography variant="subtitle1">Food Menu</Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
                <List sx={{ py: 0 }}>
                    <ListItem button sx={{ py: 2 }}>
                        <ListItemIcon>
                            <Notifications />
                        </ListItemIcon>
                        <ListItemText primary="Notifications" />
                    </ListItem>
                    <Divider />
                    <ListItem button sx={{ py: 2 }}>
                        <ListItemIcon>
                            <Gavel />
                        </ListItemIcon>
                        <ListItemText primary="Terms and Conditions" />
                    </ListItem>
                    <Divider />
                    <ListItem button sx={{ py: 2 }}>
                        <ListItemIcon>
                            <HelpOutline />
                        </ListItemIcon>
                        <ListItemText primary="FAQs" />
                    </ListItem>
                    <Divider />
                    <ListItem button sx={{ py: 2 }}>
                        <ListItemIcon>
                            <PrivacyTip />
                        </ListItemIcon>
                        <ListItemText primary="Privacy Policy" />
                    </ListItem>
                </List>
            </Box>

            <Box sx={{ p: 2, mt: 3, display: "flex", justifyContent: "center", mb: 0, position: 'static' }}>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<ExitToApp />}
                    fullWidth
                >
                    Logout
                </Button>
            </Box>
            <BottomNavBar />
            <ToastContainer />
        </Container>
    );
};

export default Settings;
