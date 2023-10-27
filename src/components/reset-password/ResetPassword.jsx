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

function ResetPassword() {
    const [emailError, setEmailError] = useState({ error: false, errorMessage: '' })
    const [errorWithFindUser, setErrorWithFindUser] = useState({ error: false, errorMessage: '' })
    const [randomPasswordGenerated, setRandomPasswordGenerated] = useState({ generated: false, newPassword: '' })

    function formSubmitHandler(event) {

        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email')
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email === '') {
            setEmailError((prevState) => {
                return { error: true, errorMessage: 'Email is required' }
            })
            return;
        } else if (!mailFormat.test(email)) {
            setEmailError((prevState) => {
                return { error: true, errorMessage: 'Please enter a valid email address.' }
            })
            return;
        } else if (emailError.error === true) {
            setEmailError((prevState) => {
                return { error: false, errorMessage: '' }
            })
        }


        let usersData = JSON.parse(localStorage.getItem('usersData') || "null")
        if (usersData === null) {
            setErrorWithFindUser((pervState) => {
                return {
                    error: true,
                    errorMessage: 'User Not Found'
                }
            })
            return;
        }

        const findExistEmail = usersData.find((user) => {
            return user.email === email
        })


        if (findExistEmail === undefined) {
            setErrorWithFindUser((pervState) => {
                return {
                    error: true,
                    errorMessage: 'User Not Found'
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


        const newPassword = randomPassword()
        setRandomPasswordGenerated({ generated: true, newPassword: newPassword })
        const updatedUser = usersData.map((user) => {
            if (user.email === email) {
                user.password = newPassword
            }
            return user
        })

        localStorage.setItem('usersData', JSON.stringify(updatedUser))

    }

    function randomPassword() {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyz@#$&*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const passwordLength = 12;
        let password = "";
        for (let i = 0; i < passwordLength; i++) {
            const randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        return password
    }

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
                    Reset Password
                </Typography>
                <Box component="form" onSubmit={formSubmitHandler} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={emailError.error}
                        helperText={emailError.errorMessage}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Reset Password
                    </Button>
                    {errorWithFindUser.error === true ? <Grid item>
                        <Typography sx={{
                            color: 'red'
                        }}>
                            {errorWithFindUser.errorMessage}
                        </Typography>
                    </Grid> : null}
                    {
                        randomPasswordGenerated.generated ? (
                            <Grid item>
                                <Typography sx={{
                                }} inputProps={{
                                    'data-testid': "new-password"
                                }}>
                                    {
                                        randomPasswordGenerated.newPassword
                                    }
                                </Typography>
                            </Grid>
                        ) : null
                    }
                    <Grid container>
                        <Grid item>
                            <Link to={'/'}>
                                <Typography variant="body2">
                                    {"Already reset password? Sign In"}
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default ResetPassword