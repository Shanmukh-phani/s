import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Edit, Save, Delete } from '@mui/icons-material';

const HostelFees = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState([]);

  // Fetch profile data (including hostel fee details)
  const getProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const hostel_id = localStorage.getItem('hostel_id');
      const token = localStorage.getItem('authToken');

      if (!hostel_id || !token) {
        toast.error('No hostel_id or token found.');
        setError('No hostel_id or token found.');
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_URL}/admin/hostelProfile`, {
        params: { hostel_id },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setProfile(response.data);
        setFormValues(response.data.sharing_prices || []);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to fetch profile. Please try again.');
      setError('Failed to fetch profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const hostel_id = localStorage.getItem('hostel_id');
      const token = localStorage.getItem('authToken');

      const response = await axios.put(
        `${process.env.REACT_APP_URL}/admin/updateHostelFees`,
        { hostel_id, sharing_prices: formValues },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Prices updated successfully');
        setIsEditing(false);
        getProfile();  // Refresh the data after saving
      } else {
        throw new Error('Failed to update prices');
      }
    } catch (error) {
      console.error('Error updating prices:', error);
      toast.error('Failed to update prices. Please try again.');
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFormValues = [...formValues];
    updatedFormValues[index][name] = value;
    setFormValues(updatedFormValues);
  };

  const handleAddNewClick = () => {
    setFormValues([...formValues, { share_type: '', price: '' }]);
  };

  const handleDeleteClick = (index) => {
    const updatedFormValues = formValues.filter((_, i) => i !== index);
    setFormValues(updatedFormValues);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Sharing Prices
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3, marginBottom: '40px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff' }}>Share Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff' }}>Price per Month</TableCell>
                {isEditing && <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff' }}>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {formValues.length > 0 ? (
                formValues.map((price, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          name="share_type"
                          value={price.share_type}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                      ) : (
                        price.share_type
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          name="price"
                          value={price.price}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                      ) : (
                        price.price
                      )}
                    </TableCell>
                    {isEditing && (
                      <TableCell>
                        <IconButton onClick={() => handleDeleteClick(index)} color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={isEditing ? 3 : 2}>No sharing prices available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        {isEditing ? (
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Save Prices
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleEditClick}>
            Edit Prices
          </Button>
        )}
        <Button variant="contained" color="info" onClick={handleAddNewClick}>
          Add New Share
        </Button>
      </Box>
    </Box>
  );
};

export default HostelFees;
