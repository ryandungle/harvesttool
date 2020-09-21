import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from "src/redux/types"

import validate from 'validate.js'
import constraints from "../../data/constraints";
import authentication from "../../services/authentication";

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));



const LoginView = (props) => {
  const { user1 } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.user);

  const [user, setUser] = useState({ emailAddress: "", password: "" });
  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    user.[e.target.name] = e.target.value
  }

  const handleClick = () => {
    dispatch({ type: actions.INC })
    console.log(user1)
  }

  const signIn = () => {

    const errors = validate(
      {
        emailAddress: user.emailAddress,
        password: user.password,
      },
      {
        emailAddress: constraints.emailAddress,
        password: constraints.password,
      }
    );
    if (errors) {
      setErrors(errors);
    } else {
      setErrors("");
      authentication
        .signIn(user.emailAddress, user.password)
        .then((user) => {
          const displayName = user.displayName;
          const emailAddress = user.email;
          navigate('/app/dashboard', { replace: true });
        })
        .catch((reason) => {
          const code = reason.code;
          const message = reason.message;

          switch (code) {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
            case "auth/wrong-password":
              console.log(message)
              return;

            default:
              console.log(message)
              return;
          }
        })
        .finally(() => {
        });
    }
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Box mb={3}>
            <Typography
              color="textPrimary"
              variant="h2"
            >
              Sign in
                  </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Sign in on the internal platform
                  </Typography>
          </Box>
          {/* <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              md={6}
            >
              <Button
                color="primary"
                fullWidth
                startIcon={<FacebookIcon />}
                size="large"
                variant="contained"
              >
                Login with Facebook
                    </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              <Button
                fullWidth
                startIcon={<GoogleIcon />}
                size="large"
                variant="contained"
              >
                Login with Google
                    </Button>
            </Grid>
          </Grid> */}
          <Box
            mt={3}
            mb={1}
          >
            <Typography
              align="center"
              color="textSecondary"
              variant="body1"
            >
              Login with email address
                  </Typography>
          </Box>
          <TextField
            fullWidth
            error={(errors && errors.emailAddress)}
            helperText={
              errors && errors.emailAddress
                ? errors.emailAddress[0]
                : ""
            }
            label="Email Address"
            margin="normal"
            name="emailAddress"
            onChange={handleChange}
            type="email"
            variant="outlined"
          />
          <TextField
            fullWidth
            error={(errors && errors.password)}
            helperText={
              errors && errors.password ? errors.password[0] : ""
            }
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            variant="outlined"
          />
          <Box my={2}>
            {/* <Typography>{userLogin.number}</Typography>
            <Button onClick={handleClick}>Testing</Button> */}
            <Button
              color="primary"
              disabled={false}
              fullWidth
              onClick={signIn}
              size="large"
              variant="contained"
            >
              Sign in now
                  </Button>
          </Box>
          {/* <Typography
            color="textSecondary"
            variant="body1"
          >
            Don&apos;t have an account?
                  {' '}
            <Link
              component={RouterLink}
              to="/register"
              variant="h6"
            >
              Sign up
                  </Link>
          </Typography> */}
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
