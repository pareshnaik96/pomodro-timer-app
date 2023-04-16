import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Components/Login'
import Pomodoro from './Components/Pomodoro';
import 'firebase/compat/auth'


function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/pomodoro' element={<Pomodoro />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
