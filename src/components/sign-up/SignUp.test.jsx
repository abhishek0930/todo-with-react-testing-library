import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import SignUp from './SignUp'


describe('Sign Up', () => {
    test('render Sign Up', () => {
        renderSignUp()
        const signUpHeading = screen.getByRole('heading', {
            name: /sign up/i
        })
        expect(signUpHeading).toBeInTheDocument()

        const firstName = screen.getByRole('textbox', {
            name: /first name/i
        })
        expect(firstName).toBeInTheDocument()

        const lastName = screen.getByRole('textbox', {
            name: /last name/i
        })

        expect(lastName).toBeInTheDocument()

        const email = screen.getByRole('textbox', {
            name: /email address/i
        })

        expect(email).toBeInTheDocument()

        const password = screen.getByTestId('password-input')
        expect(password).toBeInTheDocument()

        const signUpButton = screen.getByRole('button', {
            name: /sign up/i
        })

        expect(signUpButton).toBeInTheDocument()

        const signInLink = screen.getByText(/already have an account\? sign in/i)
        expect(signInLink).toBeInTheDocument()

    })

    test('successful code flow', async () => {
        user.setup()
        renderSignUp()

        const firstName = screen.getByRole('textbox', {
            name: /first name/i
        })

        await user.click(firstName)
        await user.type(firstName, 'Abhishek')

        expect(firstName).toHaveValue('Abhishek')

        const lastName = screen.getByRole('textbox', {
            name: /last name/i
        })

        await user.tab()

        await user.type(lastName, 'Shrivastav')

        expect(lastName).toHaveValue('Shrivastav')

        await user.tab()

        const email = screen.getByRole('textbox', {
            name: /email address/i
        })

        await user.type(email, 'abhishek@gmail.com')

        expect(email).toHaveValue('abhishek@gmail.com')

        await user.tab()

        const password = screen.getByTestId('password-input')

        await user.type(password, '12345678')

        expect(password).toHaveValue('12345678')

        const signupButton = screen.getByRole('button', {
            name: /sign up/i
        })


        await user.click(signupButton)

        const successfullyCreatedHeader = screen.getByRole('heading', {
            name: /your account created successfully/i
        })

        expect(successfullyCreatedHeader).toBeInTheDocument()


    })

    test('required field error in signUp', async () => {
        user.setup()
        renderSignUp()
        const signInButton = screen.getByRole('button', { name: /sign up/i })
        await user.click(signInButton)

        const emailError = screen.getByText(/email is required/i)
        expect(emailError).toBeInTheDocument()

        const passwordError = screen.getByText(/password is required/i)
        expect(passwordError).toBeInTheDocument()

        const firstNameError = screen.getByText(/first name is required/i)
        expect(firstNameError).toBeInTheDocument()

        const lastNameError = screen.getByText(/last name is required/i)
        expect(lastNameError).toBeInTheDocument()

        const successfullyCreatedHeader = screen.queryByRole('heading', {
            name: /your account created successfully/i
        })

        expect(successfullyCreatedHeader).toBeNull()

        const emailExistError = screen.queryByText(/use different email/i)
        expect(emailExistError).toBeNull()
    })
})

function renderSignUp() {
    return render(<MemoryRouter><SignUp /></MemoryRouter>)
}