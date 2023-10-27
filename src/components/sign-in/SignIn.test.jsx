import { act, render, screen, waitFor } from '@testing-library/react'
import SignIn from './SignIn'
import user from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'


describe('Sign In', () => {
    test('render Sign In component', () => {
        renderSignIn()
        const heading = screen.getByRole('heading', {
            name: /sign in/i
        })
        expect(heading).toBeInTheDocument()
    })

    test('rende all elements', () => {
        renderSignIn()
        expect(screen.getByRole('textbox', {
            name: /email address/i
        })).toBeInTheDocument()

        expect(screen.getByTestId(/password-input/i
        )).toBeInTheDocument()

        expect(screen.getByRole('button', {
            name: /sign in/i
        })).toBeInTheDocument()

        expect(screen.getByText(/reset password\?/i)).toBeInTheDocument()

        expect(screen.getByText(/don't have an account\? sign up/i)).toBeInTheDocument()
    })

    test('success code flow', async () => {
        user.setup()
        renderSignIn()
        const email = screen.getByRole('textbox', {
            name: /email address/i
        })

        await user.click(email)
        await user.type(email, 'abhishek@gmail.com')

        expect(email).toHaveValue('abhishek@gmail.com');

        const password = screen.getByTestId(/password-input/i)

        await user.click(password)
        await user.type(password, '12345678')

        expect(password).toHaveValue('12345678')

        const signInButton = screen.getByRole('button', {
            name: /sign in/i
        })

        await user.click(signInButton)

        await waitFor(() => {
            expect(screen.getByRole('heading', {
                name: /user login successfully/i
            })).toBeInTheDocument()
        })



    })

    test('required field error', async () => {
        user.setup()
        renderSignIn()
        const signInButton = screen.getByRole('button', { name: /sign in/i })
        await user.click(signInButton)

        const emailError = screen.getByText(/email is required/i)
        expect(emailError).toBeInTheDocument()

        const passwordError = screen.getByText(/password is required/i)
        expect(passwordError).toBeInTheDocument()
    })
})


describe('input field format', () => {
    test('email input validate', async () => {
        user.setup()
        renderSignIn()
        const email = screen.getByRole('textbox', {
            name: /email address/i
        })

        await user.click(email)
        await user.type(email, 'abhishek')

        const signInButton = screen.getByRole('button', {
            name: /sign in/i
        })

        await user.click(signInButton)

        await waitFor(() => {
            const emailError = screen.getByText(/please enter a valid email address\./i)
            expect(emailError).toBeInTheDocument();
        })
    })

    test('password input validate', async () => {
        user.setup()
        renderSignIn()
        const password = screen.getByTestId(/password-input/i)

        await user.click(password)
        await user.type(password, '123456')

        const signInButton = screen.getByRole('button', {
            name: /sign in/i
        })

        await user.click(signInButton)

        await waitFor(() => {
            const passwordError = screen.getByText(/password length must be greater than 7 and less than 13/i)
            expect(passwordError).toBeInTheDocument();
        })

        await user.click(password)
        await user.type(password, '7890123')
        expect(password).toHaveValue('1234567890123')

        await user.click(signInButton)

        await waitFor(() => {
            const passwordError = screen.getByText(/password length must be greater than 7 and less than 13/i)
            expect(passwordError).toBeInTheDocument();
        })

    })
})

function renderSignIn() {
    return render(<MemoryRouter><SignIn /></MemoryRouter>)
}