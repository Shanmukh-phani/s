import React, { useEffect, useState } from 'react';
import { AppBar, Box, Typography, Card, CardContent, Grid, Chip, IconButton } from '@mui/material';
import { Bar, Pie, Line, Doughnut, Radar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { People, Chair, Home } from '@mui/icons-material';
import profileImage from '../assets/buddie.jpg';
import { styled } from '@mui/system';
import BottomNavBar from './BottomNavBar';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';

// Styled Components
const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
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
  color: '#006399',
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

// Dashboard Component
const Dashboard = () => {
  const [data, setData] = useState({totalVacancies: 0,totalRooms: 0,totalBuddies: 0, sharingCounts: {},});
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);



  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const hostel_id = localStorage.getItem('hostel_id');
        const response = await fetch(`${process.env.REACT_APP_URL}/admin/dashboard?hostel_id=${hostel_id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const result = await response.json();
        console.log('Fetched Data:', result); // Debugging log
        setData(result); // Update state with the fetched data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };
    fetchDashboard();
  }, []);
  

  useEffect(() => {
    const fetchTopFacilities = async () => {
      try {
        const hostel_id = localStorage.getItem('hostel_id');
        const token = localStorage.getItem('auth_token'); // Assuming token is stored in localStorage

        const response = await axios.get(`${process.env.REACT_APP_URL}/admin/top-facilities`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: { hostel_id }
        });

        const { topFacilities } = response.data;

        setChartData({
          labels: topFacilities.map(facility => facility.name),
          datasets: [{
            label: 'Top 5 Facilities',
            data: topFacilities.map(facility => facility.count),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        });
      } catch (error) {
        console.error('Error fetching top facilities:', error);
      }
    };

    fetchTopFacilities();
  }, []); // Empty dependency array ensures it runs once on component mount

  
  // Bar Chart Data
  const barData = {
    labels: Object.keys(data.sharingCounts),
    datasets: [
      {
        label: 'Number of Shares',
        data: Object.values(data.sharingCounts),
        backgroundColor: '#36A2EB',
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Top 5 Facilities',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  });


  // const pieData = {
  //   labels: ['Five Shares', 'Four Shares', 'One Share'],
  //   datasets: [
  //     {
  //       data: [data.fiveShare, data.fourShare, data.oneShare],
  //       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  //       borderColor: '#ffffff',
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const lineData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Replace with dynamic labels if needed
  //   datasets: [
  //     {
  //       label: 'Monthly Occupancy',
  //       data: [data.vacancies, data.rooms, data.buddies, 80, 90, 100, 110], // Example dynamic data, replace with actual
  //       borderColor: '#FF6384',
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       fill: true,
  //     },
  //   ],
  // };

  // const doughnutData = {
  //   labels: ['Vacancies', 'Occupied'],
  //   datasets: [
  //     {
  //       data: [data.vacancies, data.rooms - data.vacancies],
  //       backgroundColor: ['#FF6384', '#36A2EB'],
  //       borderColor: '#ffffff',
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const radarData = {
  //   labels: ['Room Quality', 'Hygiene', 'Food', 'Power', 'Wi-Fi'], // Replace with dynamic labels if needed
  //   datasets: [
  //     {
  //       label: 'Facilities Rating',
  //       data: [4, 5, 3, 4, 5], // Example dynamic data, replace with actual
  //       backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //       borderColor: '#36A2EB',
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const handleProfileIconClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
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
          </ProfileIcon>
          <AdminSidebar open={drawerOpen} onClose={handleDrawerClose} />
        </HeaderContainer>
      </AppBar>

      <Box padding={4} mt={10}>
        <Typography variant="h4" gutterBottom>
          Hostel Dashboard
        </Typography>

 {/* Key Metrics */}
  <Grid container spacing={2} mb={4}>
    <Grid item xs={6} sm={6} md={4}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>Vacancies</Typography>
      <Chip
        icon={<Home />}
        label={`: ${data.totalVacancies}`}
        color="primary"
        variant="outlined"
        sx={{
          borderRadius: '20px',
          fontSize: '1rem',
          padding: '12px 24px',
          backgroundColor: '#e3f2fd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          mb: 1,
        }}
      />
    </Grid>
    <Grid item xs={6} sm={6} md={4}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>Rooms</Typography>
      <Chip
        icon={<Chair />}
        label={`: ${data.totalRooms}`}
        color="secondary"
        variant="outlined"
        sx={{
          borderRadius: '20px',
          fontSize: '1rem',
          padding: '12px 24px',
          backgroundColor: '#fce4ec',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          mb: 1,
        }}
      />
    </Grid>
    <Grid item xs={6} sm={6} md={4}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>Buddies</Typography>
      <Chip
        icon={<People />}
        label={`: ${data.totalBuddies}`}
        color="success"
        variant="outlined"
        sx={{
          borderRadius: '20px',
          fontSize: '1rem',
          padding: '12px 24px',
          backgroundColor: '#e8f5e9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          mb: 1,
        }}
      />
    </Grid>
  </Grid>


  <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5">Sharing Types Bar Chart</Typography>
                <Bar data={barData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>



        <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.raw} rooms`;
                }
              }
            }
          }
        }}
      />



        {/* Charts Section */}
        {/* <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Occupancy Bar Chart</Typography>
                <Bar data={barData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Room Share Pie Chart</Typography>
                <Pie data={pieData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Monthly Occupancy Line Chart</Typography>
                <Line data={lineData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Occupancy Doughnut Chart</Typography>
                <Doughnut data={doughnutData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5">Facilities Radar Chart</Typography>
                <Radar data={radarData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}
      </Box>
      <BottomNavBar/>
    </div>
  );
};

export default Dashboard;
