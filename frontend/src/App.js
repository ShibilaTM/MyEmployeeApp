
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './ui-components/Login';
import Signup from './ui-components/Signup';
import User from './elements/getUser/User';
import Add from './elements/addUser/Add';
import Update from './elements/updateUser/Update';
import Main from './ui-components/Main';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/user' element={<Main child={<User/>}/>}></Route>
        <Route path='/add' element={<Main child={<Add/>}/>}></Route>
        <Route path='/update/:id' element={<Main child={<Update/>}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
