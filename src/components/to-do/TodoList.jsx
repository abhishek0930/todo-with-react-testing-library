import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Todo from './Todo';


export default function TodoList() {
    const [completedTodo, setCompletedTodo] = React.useState(false);
    const [inCompletedTodo, setInCompletedTodo] = React.useState(false);
    const [todos, setTodos] = React.useState([])

    function resetButtonHandler() {
        if (completedTodo === true) {
            setCompletedTodo(false)
        } else if (inCompletedTodo === true) {
            setInCompletedTodo(false)
        }
    }

    React.useEffect(() => {
        if (todos.length === 0) {
            fetch('https://dummyjson.com/todos')
                .then(res => res.json())
                .then(res => { setTodos([...res.todos]) });
        }
    }, [])

    function deleteTodoHandler(id) {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    function updateTodoHandler(id, value) {
        setTodos(todos.map(todo => {
            if (id === todo.id) {
                todo.completed = value
            }
            return todo
        }))
    }


    let filteredTodo = todos.filter((element) => {
        return (inCompletedTodo === true && element.completed === false) || (completedTodo === true && element.completed === true) || (completedTodo === false && inCompletedTodo === false)
    })


    return (
        <Box sx={{ flexGrow: 1, alignItems: 'center' }}>

            <Typography sx={{ mt: 4, mb: 2, textAlign: 'center', fontWeight: 700 }} variant="h4">Todo Lists</Typography>
            <FormGroup row sx={{
                justifyContent: 'center'
            }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={completedTodo}
                            onChange={(event) => setCompletedTodo(event.target.checked)}
                        />
                    }
                    label="Show all completed Todos"
                    disabled={inCompletedTodo === true}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={inCompletedTodo}
                            onChange={(event) => setInCompletedTodo(event.target.checked)}
                        />
                    }
                    label="Show all incompleted Todos"
                    disabled={completedTodo === true}
                />

                <Button size="small" variant='outlined' onClick={resetButtonHandler} disabled={(inCompletedTodo === true || completedTodo === true) ? false : true}>Reset Filter</Button>

            </FormGroup>

            <Grid container spacing={2} justifyContent={'center'}>
                <Grid item xs={12} md={8} mt={5}>
                    <List >
                        {filteredTodo.map((element =>
                            <Todo key={element.id} singleTodo={element} deleteFunction={deleteTodoHandler} updateFunction={updateTodoHandler} />
                        ))}
                    </List>
                    <Todo singleTodo={{
                        "id": 1,
                        "todo": "Do something nice for someone I care about",
                        "completed": true,
                        "userId": 26
                    }}/>
                </Grid>
            </Grid>
        </Box>
    );
}

