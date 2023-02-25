
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/LoginPage';
import NavBar from './Components/NavBar';
import Posts from './Components/Posts';


function App() {
  return (
    <div >
      <NavBar/>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/posts' element={<Posts/>}/>
      </Routes>
      
     
    </div>
  );
}

export default App;
