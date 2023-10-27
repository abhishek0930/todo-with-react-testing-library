import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import ResetPassword from './components/reset-password/ResetPassword';
import TodoList from './components/to-do/TodoList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
