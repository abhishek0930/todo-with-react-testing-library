import { Avatar, Checkbox, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'




function Todo({ singleTodo, deleteFunction, updateFunction }) {
  const { todo, completed, id } = singleTodo
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => deleteFunction(id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox
        checked={completed}
        onChange={(event) => updateFunction(id, event.target.checked)}
      />
      <ListItemText
        inputProps={{
          'data-testid': "list-item-text"
        }}
        primary={todo}
      />
    </ListItem>
  )
}

export default Todo