import React, { useState, useEffect } from 'react';
import { AppBar, IconButton, Typography, Box, Card, Chip, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, Skeleton, TextField, InputAdornment } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';
import { ArrowBack, FilterList as FilterListIcon, Wifi as WifiIcon, LocalDining as LocalDiningIcon, LocalParking as LocalParkingIcon, LocalLaundryService as LocalLaundryServiceIcon, BatteryChargingFull as BatteryChargingFullIcon, CleanHands as CleanHandsIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import ImgHostel1 from './assets/hostel1.jpg';
import ImgHostel2 from './assets/hostel2.jpg';
import ImgHostel3 from './assets/hostel3.jpg';
import profileImage from './assets/buddie.jpg';
import Header from './Header';

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

const LocationChip = styled(Chip)({
    marginTop: '100px',
    fontFamily: 'Anta',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#006399',
    padding: '20px 22px',
    borderRadius: '100px',
});

const FilterButton = styled(IconButton)({
    marginRight: '16px',
    marginTop: '100px',
    color: '#006399',
});

const HostelCard = styled(Card)({
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    // borderRadius: '10px',
    position: 'relative',
});

const FacilityChip = styled(Chip)({
    margin: '4px',
    display: 'flex',
    alignItems: 'center',
});

const HostelCardContent = styled(CardContent)({
    padding: '16px',
});

const FacilityIcon = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginRight: '8px',
});

const SkeletonCard = styled(Card)({
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    // borderRadius: '10px',
    position: 'relative',
});

const HostelsScreen = () => {
    const [hostels, setHostels] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Added loading state
    const [search, setSearch] = useState('');


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cityName = queryParams.get('city');

    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        // Fetch hostel data from your backend API based on city
        const fetchHostels = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/hostels`, {
                    params: { city: cityName }
                });
                setHostels(response.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching hostels:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchHostels();
    }, [cityName]);

    const filters = [
        { value: 'wifi', label: 'Wi-Fi' },
        { value: 'dining', label: 'Dining' },
        { value: 'parking', label: 'Parking' },
        { value: 'laundry', label: 'Laundry' },
        { value: 'charging', label: 'Charging' },
        { value: 'cleaning', label: 'Cleaning' }
    ];

    const handleFilterClick = () => {
        setIsFilterDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsFilterDialogOpen(false);
    };

    const handleFilterChange = (event) => {
        const { value, checked } = event.target;
        setSelectedFilters(prevFilters =>
            checked
                ? [...prevFilters, value]
                : prevFilters.filter(filter => filter !== value)
        );
    };

    const handleFilterApply = () => {
        // Apply filters here
        setIsFilterDialogOpen(false);
    };

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleHostelClick = (hostelId) => {
        navigate(`/hostel/${hostelId}`); // Navigate to the hostel detail page
    };



      // Filtered rooms based on search term
  const filteredHostels = hostels.filter(hostel => {
    const searchLower = search.toLowerCase();
    const hostelName = String(hostel.hostel_name).toLowerCase();
    const hostelType = String(hostel.hostel_type).toLowerCase();

    return hostelName.includes(searchLower) || hostelType.includes(searchLower);
  });




    return (
        <div>
            <AppBar position="static">
                <HeaderContainer>
                    <Box display="flex" alignItems="center">
                        <IconButton edge="start" color="inherit" aria-label="back" style={{ color: 'black' }} onClick={handleBackClick}>
                            <ArrowBack />
                        </IconButton>
                        <StayText variant="h4" component="h1" style={{ marginLeft: '25px', color: '#006399' }}>
                            Stay
                        </StayText>
                        <BuddieText variant="h4" component="h1">
                            Buddie
                        </BuddieText>
                    </Box>

                    <Box>
                        <ProfileIcon>
                            <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%' }} />
                        </ProfileIcon>
                    </Box>
                </HeaderContainer>
            </AppBar>





            <Box display="flex" alignItems="center" justifyContent="space-between">
                <LocationChip label={cityName || 'Select City'} />
                <FilterButton onClick={handleFilterClick}>
                    <FilterListIcon />
                </FilterButton>
            </Box>



        {/* Search Bar */}
        <Box padding={2}>
          <TextField
            fullWidth
            label="Search Hostels"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

            <Box>
                {loading ? (
                    [...Array(3)].map((_, index) => (
                        <SkeletonCard key={index}>
                            <Skeleton variant="rectangular" height={200} />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </SkeletonCard>
                    ))
                ) : (
                    filteredHostels.map((hostel) => (
                        <HostelCard
                            key={hostel._id}
                            onClick={() => handleHostelClick(hostel._id)}
                        >
                            <Box position="relative">
                                <img
                                    src={`data:image/jpeg;base64,${hostel.hostel_image}`} // Assuming hostel_image is base64-encoded
                                    alt={hostel.hostel_name}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                                <Box
                                    position="absolute"
                                    top="10px"
                                    right="10px"
                                    bgcolor="#ffd700"
                                    color="#000"
                                    padding="8px 12px"
                                    fontWeight="bold"
                                    fontSize="14px"
                                    boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
                                >
                                    {hostel.hostel_type} {/* Replaced hostel_year with hostel_type */}
                                </Box>
                            </Box>
                            <HostelCardContent>
                                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                                    {hostel.hostel_name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '16px' }}>
                                    {hostel.hostel_area}, {hostel.hostel_city}
                                </Typography>

                                <Box display="flex" flexWrap="wrap" marginBottom="16px">
                                    {hostel.hostel_facilities.slice(0, 6).map((facility, index) => {
                                        const icons = {
                                            wifi: <WifiIcon />,
                                            dining: <LocalDiningIcon />,
                                            parking: <LocalParkingIcon />,
                                            laundry: <LocalLaundryServiceIcon />,
                                            charging: <BatteryChargingFullIcon />,
                                            cleaning: <CleanHandsIcon />
                                        };
                                        return (
                                            <FacilityChip key={index} label={facility} icon={icons[facility]} />
                                        );
                                    })}
                                </Box>
                                <Typography variant="body2" color="textSecondary">
                                    Security Deposit: ₹{hostel.hostel_security_deposit}
                                </Typography>
                            </HostelCardContent>
                        </HostelCard>
                    ))
                )}
            </Box>

            <Dialog open={isFilterDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Filter Hostels</DialogTitle>
                <DialogContent>
                    {filters.map((filter) => (
                        <FormControlLabel
                            key={filter.value}
                            control={
                                <Checkbox
                                    checked={selectedFilters.includes(filter.value)}
                                    onChange={handleFilterChange}
                                    value={filter.value}
                                />
                            }
                            label={filter.label}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleFilterApply} color="primary">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default HostelsScreen;
