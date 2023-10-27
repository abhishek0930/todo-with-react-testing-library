import { render, screen } from '@testing-library/react'
import ResetPassword from './ResetPassword'
import { MemoryRouter } from 'react-router-dom'
import user from '@testing-library/user-event'

describe('Reset Password', () => {

    test('render reset password', () => {
        renderResetPassword()
        const heading = screen.getByRole('heading', {
            name: /reset password/i
        })
        expect(heading).toBeInTheDocument()

        const emailInput = screen.getByRole('textbox', {
            name: /email address/i
        })

        expect(emailInput).toBeInTheDocument()

        const resetButton = screen.getByRole('button', {
            name: /reset password/i
        })

        expect(resetButton).toBeInTheDocument()

        const goToSignIn = screen.getByText(/already reset password\? sign in/i)
        expect(goToSignIn).toBeInTheDocument()

        const userValidate = screen.queryByText(/user not found/i)
        expect(userValidate).toBeNull()

        const newPassword = screen.queryByTestId('new-password')
        expect(newPassword).toBeNull()

    })

    test('success code flow', async () => {
        user.setup()
        renderResetPassword()
        const emailInput = screen.getByRole('textbox', {
            name: /email address/i
        })

        await user.click(emailInput)
        await user.type(emailInput, 'abhishek@gmail.com')
        expect(emailInput).toHaveValue('abhishek@gmail.com')

        const resetButton = screen.getByRole('button', {
            name: /reset password/i
        })

        await user.click(resetButton)
        
        const userValidate = screen.queryByText(/user not found/i)
        expect(userValidate).toBeInTheDocument()
    })

    test('required field error in reset password', async () => {
        user.setup()
        renderResetPassword()

        const resetButton = screen.getByRole('button', { name: /reset password/i })
        await user.click(resetButton)

        const emailError = screen.getByText(/email is required/i)
        expect(emailError).toBeInTheDocument()

        const userValidate = screen.queryByText(/user not found/i)
        expect(userValidate).toBeNull()

        const newPassword = screen.queryByTestId('new-password')
        expect(newPassword).toBeNull()
    })

})

function renderResetPassword() {
    return render(<MemoryRouter><ResetPassword /></MemoryRouter>)
}