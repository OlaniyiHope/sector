import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

export default function FormDialog() {
  const [sectors, setSectors] = useState([]);
  const [open, setOpen] = useState();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    selectedSectors: [],
    agreeToTerms: false,
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "http://localhost:4000/api/get-user", // Update the endpoint
          { headers: headers }
        );

        if (response.data) {
          // If user data is available, set the form data
          setFormData({
            username: response.data.username,
            email: response.data.email,
            selectedSectors: response.data.sectors,
            agreeToTerms: response.data.agreeToTerms,
          });

          // Set edit mode to true
          setIsEditMode(true);
        }

        const sectorsResponse = await axios.get(
          "http://localhost:4000/api/get-sectors",
          { headers: headers }
        );
        setSectors(sectorsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "selectedSectors") {
      setFormData({
        ...formData,
        selectedSectors: event.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      agreeToTerms: !formData.agreeToTerms,
    });
  };

  // const handleSubmit = async () => {
  //   // Validate input data
  //   if (
  //     !formData.username ||
  //     !formData.selectedSectors ||
  //     !formData.agreeToTerms
  //   ) {
  //     alert("All fields are mandatory");
  //     return;
  //   }

  //   try {
  //     // Retrieve the token from localStorage
  //     const token = localStorage.getItem("jwtToken");

  //     // Include the token in the request headers
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };

  //     // Store input data to the database with the provided headers
  //     const response = await axios.post(
  //       "http://localhost:4000/api/add-user-sector",
  //       {
  //         username: formData.username,
  //         email: formData.email,
  //         selectedSectors: formData.selectedSectors,
  //       },
  //       {
  //         headers: headers,
  //       }
  //     );

  //     // Refill the form using stored data
  //     setFormData({
  //       username: response.data.username,
  //       // selectedSector: response.data._id, // Assuming the sector ID is returned
  //       selectedSector: response.data.sectorId,
  //       agreeToTerms: formData.agreeToTerms,
  //     });

  //     toast.success("Data stored successfully!", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });

  //     handleClose();
  //   } catch (error) {
  //     console.error("Error storing data:", error);
  //     toast.error("Error storing data. Please try again.", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // };

  const handleSubmit = async () => {
    if (
      !formData.username ||
      !formData.selectedSectors ||
      !formData.agreeToTerms
    ) {
      alert("All fields are mandatory");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const headers = { Authorization: `Bearer ${token}` };
      let apiEndpoint;

      if (isEditMode) {
        // Update an existing user
        apiEndpoint = "/api/update-user";
      } else {
        // Add a new user
        apiEndpoint = "/api/add-user-sector";
      }

      const response = isEditMode
        ? await axios.put(
            `http://localhost:4000${apiEndpoint}`,
            {
              username: formData.username,
              email: formData.email,
              selectedSectors: formData.selectedSectors,
            },
            { headers: headers }
          )
        : await axios.post(
            `http://localhost:4000${apiEndpoint}`,
            {
              username: formData.username,
              email: formData.email,
              selectedSectors: formData.selectedSectors,
            },
            { headers: headers }
          );

      setFormData({
        username: response.data.username,
        email: response.data.email,
        selectedSectors: response.data.sectors,
        agreeToTerms: formData.agreeToTerms,
      });

      const successMessage = isEditMode
        ? "Data updated successfully!"
        : "Data stored successfully!";

      toast.success(successMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });

      handleClose();
    } catch (error) {
      console.error(`Error storing/updating data: ${error.message}`);
      toast.error("Error storing/updating data. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setIsEditMode(false); // Reset edit mode when opening the form
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {isEditMode ? "Edit Profile" : "Add new Sector"}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {isEditMode ? "Edit Profile" : "Add new Sector"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEditMode ? "Edit your profile data" : "Add a new sector"}
          </DialogContentText>

          <div>
            <TextField
              label="Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Email" // Update the label
              name="email"
              value={formData.email}
              onChange={handleChange} // Update the handler
              variant="outlined"
              fullWidth
            />
            <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
              <InputLabel id="select-sector-label">Sector</InputLabel>
              <Select
                label="Sectors"
                labelId="select-sector-label"
                name="selectedSectors"
                value={formData.selectedSectors || []}
                onChange={handleChange}
                multiple
                fullWidth
              >
                {sectors.map((sector) => (
                  <MenuItem key={sector._id} value={sector._id}>
                    {sector.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleCheckboxChange}
                />
                Agree to terms
              </label>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            {isEditMode ? "Save Changes" : "Add Sector"}
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}
