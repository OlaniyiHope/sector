import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  Checkbox,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: "#042954",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

// inital login credentials
const initialValues = {
  email: "",
  password: "",
  fullname: "",
  company_name: "",
  phone: "",
  address: "",
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (values) => {
    setLoading(true);

    try {
      register(
        values.fullname,
        values.company_name,
        values.email,
        values.phone,
        values.address,
        values.password
      );
      navigate("/");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="60%"
                alt="Register"
                src="/assets/images/illustrations/save.png"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <bold>
                      <h6
                        style={{
                          fontWeight: "700",
                          fontSize: "20px",
                          textAlign: "center",
                        }}
                      >
                        Sign up to Sector
                      </h6>
                    </bold>

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="fullname"
                      label="Full Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.fullname}
                      id="fullname"
                      onChange={handleChange}
                      helperText={touched.fullname && errors.fullname}
                      error={Boolean(errors.fullname && touched.fullname)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="company_name"
                      label="Company Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.company_name}
                      onChange={handleChange}
                      id="company_name"
                      helperText={touched.company_name && errors.company_name}
                      error={Boolean(
                        errors.company_name && touched.company_name
                      )}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      select
                      label="Select a class"
                      variant="outlined"
                      name="classname" // Make sure the name matches your form field
                      // value={values.classname}
                      // onChange={handleChange}
                      sx={{ mb: 3 }}
                    >
                      <MenuItem value="Class 1">Class 1</MenuItem>
                      <MenuItem value="Class 2">Class 2</MenuItem>
                      <MenuItem value="Class 3">Class 3</MenuItem>
                      {/* Add more MenuItem components as needed */}
                    </TextField>

                    <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        I have read and agree to the terms of service.
                      </Paragraph>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                      style={{ width: "100%", borderRadius: "50px" }}
                    >
                      Agree and continue
                    </LoadingButton>

                    <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/session/signin"
                        style={{
                          color: theme.palette.primary.main,
                          marginLeft: 5,
                        }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
