import * as React from "react";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import api from "../../api";

const theme = createTheme();
const Signup = () => {
  const [sdisDropdown, setSdisDropdown] = useState([]);
  const [groupDropDownValue, setGroupDropdownValue] = useState([]);
  const [serviceDropDownValue, setServiceDropdownValue] = useState([]);
  const [destinationDropdownValue, setDestinationDropdownValue] = useState([]);
  const [formValues, setFormValues] = useState({
    empFirstName: "",
    empLastName: "",
    email: "",
    cellNo: "",
    password: "",
    roleId: "",
    groupId: "",
    serviceId: "",
    isValidated: false,
    isAdmin: false,
  });

  const CHARACTER_LIMIT = 20;
  const PHONENO_LIMIT = 9;
  useEffect(() => {
    api("get", "/api/v1/sdis/dropdown").then((res) =>
      setSdisDropdown(res.data)
    );
    ///////getting value for dropdown sdis
    api("get", "/api/v1/roles/getall").then(
      (res) =>
        setDestinationDropdownValue(
          res.data.filter((elem) => elem.roleSerial > 3)
        ) //getting designation dropdown value roleId greater than 3
    );
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    let newFormData = { ...formValues, cellNo: "33" + formValues.cellNo };
    if (formValues.password !== formValues.confirmpassword) {
      toast.error("passwords must be same");
      return false;
    } else {
      api("post", "/api/v1/register", newFormData).then((res) =>
        res?.statusText === "OK"
          ? toast.success(res?.statusText)
          : toast.error(res?.statusText)
      );
    }
  };

  const handleChange = (event) => {
    const id = event.target.value;
    const name = event.target.name;
    setFormValues((preVal) => {
      return {
        ...preVal,
        [name]: event.target.value,
      };
    });
    if (name === "sdis") {
      api("get", `/api/v1/group/dropdown/${id}`).then(
        (res) => setGroupDropdownValue(res.data) ////getting dropdown values for group input
      );
    }
    if (name === "groupId") {
      api("get", `/api/v1/services/dropdown/${id}`).then(
        (res) => setServiceDropdownValue(res.data) ////getting dropdown values for group input
      );
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid className="signupForm-container" container component="main">
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={5}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={7}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width:"80%" }}>
                <Grid sx={{ py: 2}} item xs={12} sm={6} md={12}>
                  <TextField
                    inputProps={{
                      maxLength: CHARACTER_LIMIT,
                      pattern: "^[a-zA-Z]{3,}$",
                    }}
                    autoComplete="given-name"
                    name="empFirstName"
                    required
                    fullWidth
                    id="empFirstName"
                    label="First Name"
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid sx={{ py: 1 }} item xs={12} sm={12}>
                  <TextField
                    inputProps={{
                      maxLength: CHARACTER_LIMIT,
                      pattern: "^[a-zA-Z]{3,}$",
                    }}
                    required
                    fullWidth
                    id="empLastName"
                    label="Last Name"
                    name="empLastName"
                    autoComplete="family-name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid sx={{ py: 1 }} item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid sx={{ py: 1 }} item xs={12} sm={12}>
                  <div className="phoneno-input-container">
                    <label className="phoneno-input-label">+33</label>
                    <TextField
                      name="cellNo"
                      label="Cell no"
                      required
                      fullWidth
                      id="cellNo"
                      onChange={handleChange}
                      autoFocus
                      inputProps={{
                        style: { marginLeft: "10%" },
                        maxLength: PHONENO_LIMIT,
                      }}
                    />
                  </div>
                </Grid>
                <Grid sx={{ py: 1 }} item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    inputProps={{
                      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$",
                    }}
                  />
                </Grid>
                <Grid sx={{ py: 1 }} item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm password"
                    type="password"
                    id="confirmpassword"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid sx={{ py: 1 }} item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">SDIS</InputLabel>
                    <Select
                      labelId="sdis-simple-select-label"
                      id="sdis-simple-select"
                      label="SDIS"
                      name="sdis"
                      onChange={handleChange}
                      required
                    >
                      {sdisDropdown.map((item, i) => (
                        <MenuItem key={i} id={i} value={item.value}>
                          {item.text}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid sx={{ py: 1 }} item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Group</InputLabel>
                    <Select
                      labelId="group-simple-select-label"
                      id="demo-simple-select"
                      label="Group"
                      name="groupId"
                      onChange={handleChange}
                      required
                    >
                      {groupDropDownValue.map((item, i) => (
                        <MenuItem id={i} key={i} value={item.value}>
                          {item.text}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid sx={{ py: 1 }} item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Service
                    </InputLabel>
                    <Select
                      labelId="service-simple-select-label"
                      id="service-simple-select"
                      label="Service"
                      name="serviceId"
                      onChange={handleChange}
                      required
                    >
                      {serviceDropDownValue.map((item, i) => (
                        <MenuItem key={i} id={i} value={item.value}>
                          {item.text}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid sx={{ py: 1 }} item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Designation
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="designation-simple-select"
                      label="Designation"
                      name="roleId"
                      onChange={handleChange}
                      required
                    >
                      {destinationDropdownValue.map((item, i) => (
                        <MenuItem key={i} id={i} value={item.roleId}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Signup;
