
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/login';
import { RegisterUser } from './components/register-user';
import { Home } from './components/home';
import { Dashboard } from './components/dashboard';
import { Invalid } from './components/invalid';
import { AddTask } from './components/add-task';
import { DeteteTask } from './components/delete-task';
import { EditTask } from './components/edit-task';

function App() {
  return (
    <div className="container-fluid p-0">
      <div style={{ backgroundColor: "rgba(0,0,0,0.4)", height: "100vh" }}>
        <BrowserRouter>
          <header>
            <h2 className='text-white text-center'>Appoinment App</h2>
            <p className='fs-2 fw-bold text-white text-center'> Your Appoinments</p>
          </header>

          <div>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='register' element={<RegisterUser />} />
              <Route path='login' element={< Login />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='invalid' element={<Invalid />} />
              <Route path='add-task' element={<AddTask />} />
              <Route path='delete-task/:id' element={<DeteteTask />} />
              <Route path='edit-task/:id' element={< EditTask />} />
            </Routes>
          </div>
        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;
