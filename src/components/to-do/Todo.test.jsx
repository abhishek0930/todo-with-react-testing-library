import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import Todo from './Todo'

const deleteFunction = jest.mock()
const updateFunction = jest.mock()


describe('Todo', () => {
    test('render todo', () => {
        renderTodo()
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeInTheDocument()
        const deleteButton = screen.getByRole('button', {
            name: /delete/i
        })
        expect(deleteButton).toBeInTheDocument()

        const todoContent = screen.getByText(/do something nice for someone i care about/i)
        expect(todoContent).toBeInTheDocument()
    })

    test('check value of todo', () => {
        renderTodo()
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeChecked()
    })

    test('check button of todo', async () => {
        user.setup()
        renderTodo()
        const checkbox = screen.getByRole('checkbox')
        // await user.click(checkbox)
        
    })
})

function renderTodo() {
    return render(<Todo singleTodo={{
        "id": 1,
        "todo": "Do something nice for someone I care about",
        "completed": true,
        "userId": 26
    }} deleteFunction={deleteFunction} updateFunction={updateFunction} />)
}

