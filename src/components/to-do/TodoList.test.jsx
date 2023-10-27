import { screen, render, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import TodoList from './TodoList'

describe('TodoList', () => {
    test('render TodoList', async () => {
        renderTodoList()
        const todoListHeading = screen.getByRole('heading', { name: /todo lists/i })
        expect(todoListHeading).toBeInTheDocument()

        const showAllCompletedCheckList = screen.getByRole('checkbox', {
            name: /show all completed todos/i
        })

        expect(showAllCompletedCheckList).toBeInTheDocument()

        const showAllIncompletedCheckList = screen.getByRole('checkbox', {
            name: /show all incompleted todos/i
        })

        expect(showAllIncompletedCheckList).toBeInTheDocument()

        const resetButton = screen.getByRole('button', {
            name: /reset filter/i
        })

        expect(resetButton).toBeInTheDocument()

        const list = screen.getByRole('list')
        expect(list).toBeInTheDocument()

        await waitFor(
            async () => {
                const listItems = await screen.findAllByRole('listitem')
                expect(listItems).toBeInTheDocument()
            }
            , { timeout: 1000 }
        )
    })
})

function renderTodoList() {
    return render(<TodoList />)
}