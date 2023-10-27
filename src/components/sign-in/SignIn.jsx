import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';


export default function SignIn() {
    const [errorState, setErrorState] = useState({ email: { error: false, errorMessage: '' }, password: { error: false, errorMessage: '' } })
    const [errorWithFindUser, setErrorWithFindUser] = useState({ error: false, errorMessage: '' })
    const [login, setLogin] = useState(false)
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const password = data.get('password')
        const email = data.get('email')
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (email === '') {
            setErrorState((prevState) => {
                return { ...prevState, email: { error: true, errorMessage: 'Email is required' } }
            })
        } else if (!mailFormat.test(email)) {
            setErrorState((prevState) => {
                return { ...prevState, email: { error: true, errorMessage: 'Please enter a valid email address.' } }
            })

        } else if (errorState.email.error === true) {
            setErrorState((prevState) => {
                return { ...prevState, email: { error: false, errorMessage: '' } }
            })
        }

        if (password === '') {
            setErrorState((prevState) => {
                return { ...prevState, password: { error: true, errorMessage: 'Password is required' } }
            })
            return;
        } else if (password.length < 8 || password.length > 12) {
            setErrorState((prevState) => {
                return { ...prevState, password: { error: true, errorMessage: 'Password length must be greater than 7 and less than 13' } }
            })
            return;

        } else if (errorState.password.error === true) {
            setErrorState((prevState) => {
                return { ...prevState, password: { error: false, errorMessage: '' } }
            })
        }

        setLogin(true)

        // setTimeout(() => {

        //     let usersData = JSON.parse(localStorage.getItem('usersData') || "null")

        //     console.log(usersData)
        //     if (usersData === null) {
        //         setErrorWithFindUser((prevState) => {
        //             return {
        //                 error: true,
        //                 errorMessage: 'User is not registered with given email'
        //             }
        //         })
        //         return;
        //     }

        //     const user = usersData.find((userData) => {
        //         return userData.email === email
        //     })

        //     if (user === undefined) {
        //         setErrorWithFindUser((prevState) => {
        //             return {
        //                 error: true,
        //                 errorMessage: 'User is not registered with given email'
        //             }
        //         })
        //         return;
        //     }

        //     if (user.password !== password) {
        //         setErrorWithFindUser((prevState) => {
        //             return {
        //                 error: true,
        //                 errorMessage: 'Password or Email is not correct'
        //             }
        //         })
        //         return;
        //     } else if (errorWithFindUser.error === true) {
        //         setErrorWithFindUser((prevState) => {
        //             return {
        //                 error: false,
        //                 errorMessage: ''
        //             }
        //         })
        //     }

        //     setLogin(true)


        //     // }
        // }, 100)




    };

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={errorState.email.error}
                        helperText={errorState.email.errorMessage}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        inputProps={{
                            'data-testid': "password-input"
                        }}

                        autoComplete="current-password"
                        error={errorState.password.error}
                        helperText={errorState.password.errorMessage}
                    />
                    {login ? <Grid>
                        <Typography variant='h5' component='h1'>
                            user login SuccessFully
                        </Typography>
                    </Grid> : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>

                    {errorWithFindUser.error === true ? <Grid item>
                        <Typography sx={{
                            color: 'red'
                        }}>
                            {errorWithFindUser.errorMessage}
                        </Typography>
                    </Grid> : null}

                    <Grid container>

                        <Grid item xs>
                            <Link to={'/reset-password'}>
                                <Typography variant='body2'>
                                    Reset password?
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={'/sign-up'}>
                                <Typography variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}