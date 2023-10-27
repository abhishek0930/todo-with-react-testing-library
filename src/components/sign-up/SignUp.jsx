import * as React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';

export default function SignUp() {
    const [errorState, setErrorState] = useState({ email: { error: false, errorMessage: '' }, password: { error: false, errorMessage: '' }, firstName: { error: false, errorMessage: '' }, lastName: { error: false, errorMessage: '' } })

    const [errorWithFindUser, setErrorWithFindUser] = useState({ error: false, errorMessage: '' })
    const [accountCreated, setAccountCreated] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')
        const password = data.get('password')
        const firstName = data.get('firstName')
        const lastName = data.get('lastName')

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
        } else if (password.length < 8 || password.length > 12) {
            setErrorState((prevState) => {
                return { ...prevState, password: { error: true, errorMessage: 'Password length must be greater than 7 and less than 13' } }
            })

        } else if (errorState.password.error === true) {
            setErrorState((prevState) => {
                return { ...prevState, password: { error: false, errorMessage: '' } }
            })
        }

        if (firstName === '') {
            setErrorState((prevState) => {
                return { ...prevState, firstName: { error: true, errorMessage: 'First Name is required' } }
            })
        } else if (errorState.firstName.error === true) {
            setErrorState((prevState) => {
                return { ...prevState, firstName: { error: false, errorMessage: '' } }
            })
        }

        if (lastName === '') {
            setErrorState((prevState) => {
                return { ...prevState, lastName: { error: true, errorMessage: 'Last Name is required' } }
            })
        } else if (errorState.lastName.error === true) {
            setErrorState((prevState) => {
                return { ...prevState, lastName: { error: false, errorMessage: '' } }
            })
        }


        console.log(
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                fullName: `${firstName} ${lastName}`
            }
        )

        if (lastName === '' || firstName === '' || email === '' || password === '') {
            return;
        }
        let usersData = JSON.parse(localStorage.getItem('usersData') || "null")
        if (usersData === null) {
            usersData = []
        }

        const findExistEmail = usersData.find((user) => {
            return user.email === email
        })
        console.log(findExistEmail)
        if (findExistEmail !== undefined) {
            setErrorWithFindUser((pervState) => {
                return {
                    error: true,
                    errorMessage: 'use different email'
                }
            })
            return;
        } else if (errorWithFindUser.error === true) {
            setErrorWithFindUser((pervState) => {
                return {
                    error: false,
                    errorMessage: ''
                }
            })
        }


        localStorage.setItem('usersData', JSON.stringify([...usersData, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        }]))

        setAccountCreated(true)

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
                    Sign up
                </Typography>
                {accountCreated === true ? <Typography variant='h5' component='h1'>Your Account Created Successfully</Typography> : null}

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                error={errorState.firstName.error}
                                helperText={errorState.firstName.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                error={errorState.lastName.error}
                                helperText={errorState.lastName.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={errorState.email.error}
                                helperText={errorState.email.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                inputProps={{
                                    'data-testid': "password-input"
                                }}
                                autoComplete="new-password"
                                error={errorState.password.error}
                                helperText={errorState.password.errorMessage}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    {
                        errorWithFindUser.error === true ? <Grid item>
                            <Typography sx={{
                                color: 'red'
                            }}>
                                {errorWithFindUser.errorMessage}
                            </Typography>
                        </Grid> : null}
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to={'/'}>
                                <Typography variant="body2">
                                    Already have an account? Sign in
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}