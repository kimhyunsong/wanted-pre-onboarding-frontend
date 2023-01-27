import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Todo from './Todo';
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <div>
        <button><Link to="/signin">signin</Link></button>
        <button><Link to="/signup">signup</Link></button>
        <button><Link to="/todo">todo</Link></button>
      </div>
        <Routes>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/todo' element={<Todo />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
